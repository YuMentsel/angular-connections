import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, of, take, delay } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Message } from '../../../shared/models/shared.model';
import { Person } from '../../../main/models/people.model';
import { selectPeople } from '../../../redux/selectors/people.selector';
import { addPeople } from '../../../redux/actions/people.action';
import { ConfirmationComponent } from '../../../shared/components/confirmation/confirmation.component';
import { Group } from '../../../main/models/groups.model';
import { addGroups } from '../../../redux/actions/groups.action';
import {
  selectCountdown,
  selectDialogLoadingTime,
  selectGroups,
  selectMessages,
} from '../../../redux/selectors/group.selector';
import { Confirmation, Endpoints, RouterPaths, SnackBar } from '../../../shared/constants/enums';
import { CountdownService } from '../../../shared/services/countdown/countdown.service';
import { SnackBarService } from '../../../shared/services/snack-bar/snack-bar.service';
import { delay as updatingDelay } from '../../../shared/constants/constants';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  providers: [CountdownService],
})
export class DialogComponent implements OnInit, OnDestroy {
  @ViewChild('messagesWrapper') private messagesWrapper!: ElementRef;

  endpoint = Endpoints.appendGroup;

  dialogId!: string;

  loading = false;

  view = false;

  messages$!: Observable<Message[]>;

  groups$!: Observable<Group[]>;

  users$!: Observable<Person[]>;

  loadingTime$!: Observable<string>;

  loadingTime!: string;

  remainingTime$: Observable<number> = of(0);

  disabled = false;

  subscription!: Subscription;

  timeSubscription!: Subscription;

  groupsSubscription!: Subscription;

  uid = '';

  isMyDialog = false;

  constructor(
    protected countdownService: CountdownService,
    private snackBar: SnackBarService,
    private store: Store,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      this.dialogId = params['id'];
    });

    this.loadingTime$ = this.store.select(selectDialogLoadingTime(this.dialogId));
    this.timeSubscription = this.loadingTime$.subscribe((time) => {
      this.loadingTime = time;
    });

    this.loadMessages(this.loadingTime);

    this.remainingTime$ = this.store.select(selectCountdown(this.dialogId));

    this.messages$ = this.store.select(selectMessages(this.dialogId));
    this.messages$.pipe(delay(10)).subscribe(() => {
      this.scrollDown();
    });

    this.subscription = this.remainingTime$.subscribe((time) => {
      this.disabled = time > 0;
    });

    const token = localStorage.getItem('token');
    this.uid = token ? JSON.parse(token).uid : '';

    this.checkDialog();
    this.getUsers();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.timeSubscription) this.timeSubscription.unsubscribe();
    if (this.groupsSubscription) this.groupsSubscription.unsubscribe();
  }

  checkDialog(): void {
    this.groups$ = this.store.select(selectGroups);
    this.groupsSubscription = this.groups$.pipe().subscribe((groups) => {
      if (!groups.length) this.loadGroups();
      this.isMyDialog =
        groups.find((group) => group.id.S === this.dialogId)?.createdBy.S === this.uid;
    });
  }

  loadGroups(): void {
    this.dialogService.loadGroups().subscribe({
      next: (groups) => {
        this.store.dispatch(addGroups({ groups }));
      },
      error: ({ error }) => {
        this.snackBar.openError(SnackBar.loadingError, error.message);
      },
    });
  }

  getUsers() {
    this.users$ = this.store.select(selectPeople);
    this.users$.pipe(take(1)).subscribe((user) => {
      if (!user.length) this.loadUsers();
    });
  }

  getName(id: string, users: Person[] | null) {
    let name = '...';
    const person = users?.find((user) => user.uid.S === id);
    if (person) {
      name = person.uid.S === this.uid ? 'Me' : person.name.S;
    }
    return name;
  }

  loadUsers(): void {
    this.dialogService.loadUsers().subscribe({
      next: (people) => {
        this.store.dispatch(addPeople({ people }));
      },
      error: ({ error }) => {
        this.snackBar.openError(SnackBar.loadingError, error.message);
      },
    });
  }

  loadMessages(time: string, click?: boolean): void {
    this.loading = true;
    this.dialogService
      .loadDialog(this.dialogId, time)
      .subscribe({
        next: (messages) => {
          const sortedMessages = messages.sort((a, b) => +a.createdAt.S - +b.createdAt.S);
          this.dialogService.saveToStore(this.dialogId, sortedMessages);

          if (click) {
            this.countdownService.startCountdown(updatingDelay, this.dialogId);
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

  deleteDialog(): void {
    const dialog = this.dialog.open(ConfirmationComponent, {
      data: {
        message: Confirmation.deleteGroupMessage,
        buttonText: {
          yes: Confirmation.delete,
          cancel: Confirmation.cancel,
        },
        id: this.dialogId,
        endpoint: Endpoints.deleteGroup,
        snackBarType: SnackBar.groupDeletingOK,
      },
    });

    dialog.afterClosed().subscribe((value) => {
      if (value) this.router.navigate([RouterPaths.main]);
    });
  }
}
