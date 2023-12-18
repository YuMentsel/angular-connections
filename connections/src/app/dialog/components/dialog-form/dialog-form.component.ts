import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Endpoints, SnackBar } from '../../../shared/constants/enums';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { HttpService } from '../../../shared/services/http/http.service';
import { SnackBarService } from '../../../shared/services/snack-bar/snack-bar.service';
import { MessageBody } from '../../models/dialog.model';

import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss'],
})
export class DialogFormComponent implements OnInit {
  @Input() info!: { dialogId: string; loadingTime: string };

  form!: FormGroup;

  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private dialogService: DialogService,
    private snackBar: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
  }

  sendMessage(): void {
    this.loading = true;
    const { message } = this.form.value;
    this.httpService
      .post<void, MessageBody>(Endpoints.appendGroup, { groupID: this.info.dialogId, message })
      .subscribe({
        next: () => {
          this.loadMessages();
          this.form.reset();
        },
        error: ({ error }) => {
          this.snackBar.openError(SnackBar.creatingError, error.message);
        },
      })
      .add(() => {
        this.loading = false;
      });
  }

  loadMessages(): void {
    this.loading = true;
    this.dialogService
      .loadDialog(this.info.dialogId, this.info.loadingTime)
      .subscribe({
        next: (messages) => {
          const sortedMessages = messages.sort((a, b) => +a.createdAt.S - +b.createdAt.S);
          this.dialogService.saveToStore(this.info.dialogId, sortedMessages);
        },
        error: ({ error }) => {
          this.snackBar.openError(SnackBar.sendingError, error.message);
        },
      })
      .add(() => {
        this.loading = false;
      });
  }

  getErrorMessage(field: string): string {
    const formField = this.form.get(field);
    return formField ? this.authService.getErrorMessage(field, formField) : '';
  }
}
