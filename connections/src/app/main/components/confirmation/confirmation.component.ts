import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { deleteGroup } from '../../../redux/actions/groups.action';
import { Endpoints, SnackBar } from '../../../shared/constants/enums';
import { HttpService } from '../../../shared/services/http/http.service';
import { SnackBarService } from '../../../shared/services/snack-bar/snack-bar.service';
import { ConfirmDialogData } from '../../models/groups.model';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    private httpService: HttpService,
    private store: Store,
    private snackBar: SnackBarService,
  ) {}

  confirm(): void {
    this.deleteGroup(this.data.id);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  deleteGroup(groupId: string): void {
    this.loading = true;
    this.dialogRef.disableClose = true;

    this.httpService
      .delete(`${Endpoints.deleteGroup}${groupId}`)
      .subscribe({
        next: () => {
          this.store.dispatch(deleteGroup({ groupId }));
          this.snackBar.openOK(SnackBar.groupDeletingOK);
          this.dialogRef.close(true);
        },
        error: ({ error }) => {
          this.snackBar.openError(SnackBar.deletingError, error.message);
        },
      })
      .add(() => {
        this.loading = false;
        this.dialogRef.disableClose = false;
      });
  }
}
