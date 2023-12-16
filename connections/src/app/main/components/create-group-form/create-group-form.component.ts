import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addGroup } from '../../../redux/actions/groups.action';
import { Endpoints, SnackBar, ValidatorPatterns } from '../../../shared/constants/enums';
import { HttpService } from '../../../shared/services/http/http.service';
import { SnackBarService } from '../../../shared/services/snack-bar/snack-bar.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Group, GroupId, GroupName } from '../../models/groups.model';
import { NewGroup } from '../../models/new-group.model';

@Component({
  selector: 'app-create-group-form',
  templateUrl: './create-group-form.component.html',
  styleUrls: ['./create-group-form.component.scss'],
})
export class CreateGroupFormComponent implements OnInit {
  form!: FormGroup;

  loading = false;

  constructor(
    private dialogRef: MatDialogRef<CreateGroupFormComponent>,
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private store: Store,
    private snackBar: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      group: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(ValidatorPatterns.nameWithDigits),
        ],
      ],
    });
  }

  createGroup(): void {
    this.loading = true;
    const { group } = this.form.value;
    this.httpService
      .post<GroupId, GroupName>(Endpoints.createGroup, { name: group })
      .subscribe({
        next: ({ groupID }) => {
          const newGroup: Group = new NewGroup(group, groupID);
          this.store.dispatch(addGroup({ newGroup }));
          this.snackBar.openOK(SnackBar.groupCreatingOK);
          this.dialogRef.close();
        },
        error: ({ error }) => {
          this.snackBar.openError(SnackBar.creatingError, error.message);
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
