import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription, of, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  SnackBar,
  Endpoints,
  RouterPaths,
  Confirmation,
  Countdown,
} from '../../../shared/constants/enums';
import { HttpService } from '../../../shared/services/http/http.service';
import { SnackBarService } from '../../../shared/services/snack-bar/snack-bar.service';
import { selectGroupCountdown, selectGroups } from '../../../redux/selectors/group.selector';
import { CountdownService } from '../../../shared/services/countdown/countdown.service';
import { delay } from '../../../shared/constants/constants';
import { addGroups } from '../../../redux/actions/groups.action';
import { CreateGroupFormComponent } from '../create-group-form/create-group-form.component';
import { Group, Response } from '../../models/groups.model';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-groups',
  providers: [CountdownService],
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit, OnDestroy {
  loading = false;

  groups$!: Observable<Group[]>;

  remainingTime$: Observable<number> = of(0);

  disabled = false;

  subscription!: Subscription;

  uid = '';

  constructor(
    protected countdownService: CountdownService,
    private httpService: HttpService,
    private snackBar: SnackBarService,
    private dialog: MatDialog,
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.groups$ = this.store.select(selectGroups);

    this.groups$.pipe(take(1)).subscribe((groups) => {
      if (!groups.length) this.loadGroups();
    });

    this.remainingTime$ = this.store.select(selectGroupCountdown);

    this.subscription = this.remainingTime$.subscribe((time) => {
      this.disabled = time > 0;
    });

    const token = localStorage.getItem('token');
    this.uid = token ? JSON.parse(token).uid : '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadGroups(click?: boolean): void {
    this.loading = true;
    this.httpService
      .get<Response<Group>>(Endpoints.groupsList)
      .subscribe({
        next: (groups) => {
          this.store.dispatch(addGroups({ groups: groups.Items }));

          if (click) {
            this.countdownService.startCountdown(delay, Countdown.groups);
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

  openGroupDialog(id: string): void {
    this.router.navigate([RouterPaths.group, id]);
  }

  openModal(): void {
    this.dialog.open(CreateGroupFormComponent);
  }

  deleteGroup(event: Event, groupId: string): void {
    event.stopPropagation();

    this.dialog.open(ConfirmationComponent, {
      data: {
        message: Confirmation.deleteGroupMessage,
        buttonText: {
          yes: Confirmation.delete,
          cancel: Confirmation.cancel,
        },
        id: groupId,
      },
    });
  }
}
