import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { deleteGroup } from '../../../redux/actions/groups.action';
import { SnackBar } from '../../constants/enums';
import { HttpService } from '../../services/http/http.service';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';
import { ConfirmData } from '../../../main/models/groups.model';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmData,
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
      .delete(`${this.data.endpoint}${groupId}`)
      .subscribe({
        next: () => {
          this.store.dispatch(deleteGroup({ groupId }));
          this.snackBar.openOK(this.data.snackBarType);
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
