import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, of, take } from 'rxjs';
import { selectConversationsList, selectPeople } from '../../../redux/selectors/people.selector';
import { Endpoints, SnackBar, RouterPaths, Countdown } from '../../../shared/constants/enums';
import { CountdownService } from '../../../shared/services/countdown/countdown.service';
import { HttpService } from '../../../shared/services/http/http.service';
import { SnackBarService } from '../../../shared/services/snack-bar/snack-bar.service';
import {
  addConversation,
  addConversationsList,
  addPeople,
} from '../../../redux/actions/people.action';
import { selectCountdown } from '../../../redux/selectors/group.selector';
import { Conversation, CompanionID, ConversationID, Person } from '../../models/people.model';
import { Response } from '../../../shared/models/shared.model';
import { delay } from '../../../shared/constants/constants';
import { MyConversation } from '../../models/my-conversation.model';

@Component({
  selector: 'app-people',
  providers: [CountdownService],
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit, OnDestroy {
  loading = false;

  people$!: Observable<Person[] | null>;

  conversationsList$!: Observable<Conversation[] | null>;

  remainingTime$: Observable<number> = of(0);

  disabled = false;

  subscription!: Subscription;

  uid = '';

  constructor(
    private httpService: HttpService,
    private snackBar: SnackBarService,
    private store: Store,
    private router: Router,
    private countdownService: CountdownService,
  ) {}

  ngOnInit(): void {
    this.people$ = this.store.select(selectPeople);

    this.people$.pipe(take(1)).subscribe((people) => {
      if (!people) this.loadPeople();
    });

    this.selectConversationsList();

    this.remainingTime$ = this.store.select(selectCountdown(Countdown.people));

    this.subscription = this.remainingTime$.subscribe((time) => {
      this.disabled = time > 0;
    });

    const token = localStorage.getItem('token');
    this.uid = token ? JSON.parse(token).uid : '';
  }

  selectConversationsList(): void {
    this.conversationsList$ = this.store.select(selectConversationsList);

    this.conversationsList$.pipe(take(1)).subscribe((list) => {
      if (!list) this.loadConversationsList();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadPeople(click?: boolean): void {
    this.loading = true;
    this.httpService
      .get<Response<Person>>(Endpoints.users)
      .subscribe({
        next: (people) => {
          const filteredPeople = people.Items.filter((person) => person.uid.S !== this.uid);
          this.store.dispatch(addPeople({ people: filteredPeople }));

          if (click) {
            this.countdownService.startCountdown(delay, Countdown.people);
          }
        },
        error: ({ error }) => {
          this.snackBar.openError(SnackBar.loadingError, error.message);
        },
      })
      .add(() => {
        this.loading = false;
      });
  }

  loadConversationsList(): void {
    this.loading = true;
    this.httpService
      .get<Response<Conversation>>(Endpoints.conversationsList)
      .subscribe({
        next: (list) => {
          this.store.dispatch(addConversationsList({ conversationsList: list.Items }));
        },
        error: ({ error }) => {
          this.snackBar.openError(SnackBar.loadingError, error.message);
        },
      })
      .add(() => {
        this.loading = false;
      });
  }

  createConversation(companionID: string): void {
    this.httpService
      .post<ConversationID, CompanionID>(Endpoints.conversationsCreate, {
        companion: companionID,
      })
      .subscribe({
        next: (id) => {
          this.store.dispatch(
            addConversation({
              conversation: new MyConversation(id.conversationID, companionID),
            }),
          );
          this.router.navigate([RouterPaths.conversation, id.conversationID]);
        },
        error: ({ error }) => {
          this.snackBar.openError(SnackBar.creatingError, error.message);
        },
      });
  }

  openConversation(event: Event, companionID: string): void {
    event.stopPropagation();

    this.conversationsList$.pipe(take(1)).subscribe((conversations) => {
      const activeConversation = conversations?.find(
        (conversation) => conversation?.companionID.S === companionID,
      );

      if (activeConversation) {
        this.router.navigate([RouterPaths.conversation, activeConversation.id.S]);
      } else {
        this.createConversation(companionID);
      }
    });
  }
}
