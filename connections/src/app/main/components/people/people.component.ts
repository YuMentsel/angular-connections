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
import { selectPeopleCountdown } from '../../../redux/selectors/group.selector';
import { Conversation, CompanionID, ConversationID, Person } from '../../models/people.model';
import { Response } from '../../models/groups.model';
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

  people$!: Observable<Person[]>;

  conversationsList$!: Observable<Conversation[] | null>;

  remainingTime$: Observable<number> = of(0);

  disabled = false;

  subscription!: Subscription;

  listSubscription: Subscription | undefined;

  conversationListSubscription: Subscription | undefined;

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
      if (!people.length) this.loadPeople();
    });

    this.selectConversationsList();

    this.remainingTime$ = this.store.select(selectPeopleCountdown);

    this.subscription = this.remainingTime$.subscribe((time) => {
      this.disabled = time > 0;
    });

    const token = localStorage.getItem('token');
    this.uid = token ? JSON.parse(token).uid : '';
  }

  selectConversationsList(): void {
    this.conversationsList$ = this.store.select(selectConversationsList);

    this.listSubscription = this.conversationsList$.pipe(take(1)).subscribe((list) => {
      if (!list) this.loadConversationsList();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.listSubscription) this.listSubscription.unsubscribe();
    if (this.conversationListSubscription) this.conversationListSubscription.unsubscribe();
  }

  loadPeople(click?: boolean): void {
    this.loading = true;
    this.httpService
      .get<Response<Person>>(Endpoints.users)
      .subscribe({
        next: (people) => {
          this.store.dispatch(addPeople({ people: people.Items }));

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
    this.conversationListSubscription = this.httpService
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
          this.router.navigate([RouterPaths.conversation, companionID]);
        },
        error: ({ error }) => {
          this.snackBar.openError(SnackBar.creatingError, error.message);
        },
      });
  }

  openConversation(companionID: string): void {
    this.conversationsList$.pipe(take(1)).subscribe((conversations) => {
      const active = conversations?.some(
        (conversation) => conversation?.companionID.S === companionID,
      );

      if (active !== undefined) {
        if (active) {
          this.router.navigate([RouterPaths.conversation, companionID]);
        } else {
          this.createConversation(companionID);
        }
      }
    });
  }
}
