import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of, take, delay } from 'rxjs';
import { Store } from '@ngrx/store';
import { Message } from '../../models/dialog.model';
import {
  selectDialogCountdown,
  selectDialogLoadingTime,
  selectMessages,
} from '../../../redux/selectors/group.selector';
import { SnackBar } from '../../../shared/constants/enums';
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

  dialogId!: string;

  loading = false;

  messages$!: Observable<Message[]>;

  loadingTime$!: Observable<string>;

  loadingTime!: string;

  remainingTime$: Observable<number> = of(0);

  disabled = false;

  subscription!: Subscription;

  timeSubscription!: Subscription;

  uid = '';

  constructor(
    protected countdownService: CountdownService,
    private snackBar: SnackBarService,
    private store: Store,
    private route: ActivatedRoute,
    private dialogService: DialogService,
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

    this.remainingTime$ = this.store.select(selectDialogCountdown(this.dialogId));

    this.messages$ = this.store.select(selectMessages(this.dialogId));
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
    this.subscription.unsubscribe();
    this.timeSubscription.unsubscribe();
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
            this.loadingTime$ = this.store.select(selectDialogLoadingTime(this.dialogId));
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
  }

  deleteDialog(): void {}
}
