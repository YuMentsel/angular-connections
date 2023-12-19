import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, of, take, delay } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Message } from '../../../shared/models/shared.model';
import { Person } from '../../../main/models/people.model';
import {
  selectPeople,
  selectPeopleLoadingTime,
  selectPeopleMessages,
} from '../../../redux/selectors/people.selector';
import { addPeople, deleteFromConversationList } from '../../../redux/actions/people.action';
import { ConfirmationComponent } from '../../../shared/components/confirmation/confirmation.component';
import { Group } from '../../../main/models/groups.model';
import { selectCountdown } from '../../../redux/selectors/group.selector';
import { Confirmation, Endpoints, RouterPaths, SnackBar } from '../../../shared/constants/enums';
import { CountdownService } from '../../../shared/services/countdown/countdown.service';
import { SnackBarService } from '../../../shared/services/snack-bar/snack-bar.service';
import { delay as updatingDelay } from '../../../shared/constants/constants';
import { ConversationService } from '../../services/conversation.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  providers: [CountdownService],
})
export class ConversationComponent implements OnInit, OnDestroy {
  @ViewChild('messagesWrapper') private messagesWrapper!: ElementRef;

  endpoint = Endpoints.appendConversations;

  conversationId!: string;

  loading = false;

  view = false;

  messages$!: Observable<Message[]>;

  conversations$!: Observable<Group[]>;

  users$!: Observable<Person[]>;

  loadingTime$!: Observable<string>;

  loadingTime!: string;

  remainingTime$: Observable<number> = of(0);

  disabled = false;

  subscription!: Subscription;

  timeSubscription!: Subscription;

  conversationsSubscription!: Subscription;

  uid = '';

  constructor(
    protected countdownService: CountdownService,
    private snackBar: SnackBarService,
    private store: Store,
    private route: ActivatedRoute,
    private conversationService: ConversationService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      this.conversationId = params['id'];
    });

    this.loadingTime$ = this.store.select(selectPeopleLoadingTime(this.conversationId));
    this.timeSubscription = this.loadingTime$.subscribe((time) => {
      this.loadingTime = time;
    });

    this.getUsers();
    this.loadMessages(this.loadingTime);

    this.remainingTime$ = this.store.select(selectCountdown(this.conversationId));

    this.messages$ = this.store.select(selectPeopleMessages(this.conversationId));
    this.messages$.pipe(delay(10)).subscribe(() => {
      this.scrollDown();
    });

    this.subscription = this.remainingTime$.subscribe((time) => {
      this.disabled = time > 0;
    });

    const token = localStorage.getItem('token');
    this.uid = token ? JSON.parse(token).uid : '';
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.timeSubscription) this.timeSubscription.unsubscribe();
    if (this.conversationsSubscription) this.conversationsSubscription.unsubscribe();
  }

  getUsers() {
    this.users$ = this.store.select(selectPeople);
    this.users$.pipe(take(1)).subscribe((user) => {
      if (!user.length) this.loadUsers();
    });
  }

  loadUsers(): void {
    this.conversationService.loadUsers().subscribe({
      next: (people) => {
        this.store.dispatch(addPeople({ people }));
      },
      error: ({ error }) => {
        this.snackBar.openError(SnackBar.loadingError, error.message);
      },
    });
  }

  getUserName(id: string, users: Person[] | null) {
    let name = '...';
    const person = users?.find((user) => user.uid.S === id);
    if (person) {
      name = person.uid.S === this.uid ? 'Me' : person.name.S;
    }
    return name;
  }

  loadMessages(time: string, click?: boolean): void {
    this.loading = true;
    this.conversationService
      .loadConversation(this.conversationId, time)
      .subscribe({
        next: (messages) => {
          const sortedMessages = messages.sort((a, b) => +a.createdAt.S - +b.createdAt.S);
          this.conversationService.saveToStore(this.conversationId, sortedMessages);

          if (click) {
            this.countdownService.startCountdown(updatingDelay, this.conversationId);
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

  scrollDown(): void {
    if (this.messagesWrapper) {
      this.messagesWrapper.nativeElement.scrollTop =
        this.messagesWrapper.nativeElement.scrollHeight;
    }
    this.view = true;
  }

  deleteConversation(): void {
    const dialog = this.dialog.open(ConfirmationComponent, {
      data: {
        message: Confirmation.deleteConversationMessage,
        buttonText: {
          yes: Confirmation.delete,
          cancel: Confirmation.cancel,
        },
        id: this.conversationId,
        endpoint: Endpoints.deleteConversation,
        snackBarType: SnackBar.conversationDeletingOK,
      },
    });

    dialog.afterClosed().subscribe((value) => {
      this.store.dispatch(deleteFromConversationList({ conversationId: this.conversationId }));
      if (value) this.router.navigate([RouterPaths.main]);
    });
  }
}
