import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ConversationService } from '../../../conversation/services/conversation.service';
import { Endpoints, SnackBar } from '../../constants/enums';
import { AuthService } from '../../services/auth/auth.service';
import { HttpService } from '../../services/http/http.service';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';
import { DialogService } from '../../../dialog/services/dialog.service';
import { MessageBody } from '../../models/shared.model';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-dialog-form',
  standalone: true,
  imports: [SharedModule, DatePipe],
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss'],
})
export class DialogFormComponent implements OnInit {
  @Input() info!: { dialogId: string; loadingTime: string; endpoint: string };

  form!: FormGroup;

  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private dialogService: DialogService,
    private conversationService: ConversationService,
    private snackBar: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
  }

  sendMessage(): void {
    this.loading = true;

    const key = this.info.endpoint === Endpoints.appendGroup ? 'groupID' : 'conversationID';

    const { message } = this.form.value;
    this.httpService
      .post<void, MessageBody>(this.info.endpoint, { [key]: this.info.dialogId, message })
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

  loadDialog() {
    return this.dialogService.loadDialog(this.info.dialogId, this.info.loadingTime);
  }

  loadConversation() {
    return this.conversationService.loadConversation(this.info.dialogId, this.info.loadingTime);
  }

  loadMessages(): void {
    this.loading = true;

    const isDialog = this.info.endpoint === Endpoints.appendGroup;
    const load = isDialog ? this.loadDialog() : this.loadConversation();

    load
      .subscribe({
        next: (messages) => {
          const sortedMessages = messages.sort((a, b) => +a.createdAt.S - +b.createdAt.S);
          if (isDialog) {
            this.dialogService.saveToStore(this.info.dialogId, sortedMessages);
          } else {
            this.conversationService.saveToStore(this.info.dialogId, sortedMessages);
          }
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
