import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { SnackBar, Endpoints, RouterPaths } from '../../../shared/constants/enums';
import { HttpService } from '../../../shared/services/http/http.service';
import { SnackBarService } from '../../../shared/services/snack-bar/snack-bar.service';
import { selectGroups } from '../../../redux/selectors/group.selector';
import { CountdownService } from '../../../shared/services/countdown/countdown.service';
import { delay } from '../../../shared/constants/constants';
import { addGroups, deleteGroup } from '../../../redux/actions/groups.action';
import { CreateGroupFormComponent } from '../create-group-form/create-group-form.component';
import { Group, Groups } from '../../models/groups.model';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  loading = false;

  loadingDelete = false;

  groups$!: Observable<Group[]>;

  updateCountdown = 0;

  constructor(
    private httpService: HttpService,
    private snackBar: SnackBarService,
    private dialog: MatDialog,
    private store: Store,
    private countdownService: CountdownService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.groups$ = this.store.select(selectGroups);

    this.groups$.pipe(take(1)).subscribe((groups) => {
      if (!groups.length) this.loadGroups();
    });

    this.countdownService.countdown$.subscribe((remainingTime) => {
      this.updateCountdown = remainingTime;
    });
  }

  loadGroups(click?: boolean): void {
    this.loading = true;
    this.httpService
      .get<Groups>(Endpoints.groupsList)
      .subscribe({
        next: (groups) => {
          this.store.dispatch(addGroups({ groups: groups.Items }));

          if (click) {
            this.countdownService.startCountdown(delay);
          }
        },
        error: ({ error }) => {
          this.snackBar.openError(SnackBar.creatingError, error.message);
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
    this.loadingDelete = true;
    event.stopPropagation();
    this.httpService
      .delete(`${Endpoints.deleteGroup}${groupId}`)
      .subscribe({
        next: () => {
          this.store.dispatch(deleteGroup({ groupId }));
          this.snackBar.openOK(SnackBar.groupRemovingOK);
        },
        error: ({ error }) => {
          this.snackBar.openError(SnackBar.removingError, error.message);
        },
      })
      .add(() => {
        this.loadingDelete = false;
      });
  }
}
