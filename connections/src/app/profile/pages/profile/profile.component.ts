import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, take } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { RouterPaths, SnackBar, ValidatorPatterns } from '../../../shared/constants/enums';
import { ProfileInfo, ProfileNameBody } from '../../../shared/models/shared.model';
import { HttpService } from '../../../shared/services/http/http.service';
import { addProfileInfo, updateProfileInfo } from '../../../redux/actions/connections.action';
import { selectProfileInfo } from '../../../redux/selectors/connections.selector';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileInfo$!: Observable<ProfileInfo | null>;

  form!: FormGroup;

  isEditing = false;

  isUpdating = false;

  constructor(
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private store: Store,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.profileInfo$ = this.store.select(selectProfileInfo);

    this.profileInfo$.pipe(take(1)).subscribe((profileInfo) => {
      if (profileInfo === null) {
        this.httpService
          .get<ProfileInfo>(RouterPaths.profile)
          .pipe(take(1))
          .subscribe({
            next: (info) => {
              this.store.dispatch(addProfileInfo({ info }));
            },
            error: (res) => {
              this.snackBar.open(
                SnackBar.loadingError + (res.error.message || SnackBar.errorMessage),
                SnackBar.closeAction,
                {
                  duration: 3500,
                },
              );
            },
          });
      }
      this.initForm(profileInfo);
    });
  }

  initForm(profileInfo: ProfileInfo | null): void {
    this.form = this.formBuilder.group({
      name: [
        profileInfo?.name || '',
        [Validators.required, Validators.maxLength(40), Validators.pattern(ValidatorPatterns.name)],
      ],
    });
  }

  editName(name: string): void {
    this.form.get('name')?.setValue(name);
    this.isEditing = true;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.initForm(this.form.value);
  }

  saveChanges(): void {
    this.isUpdating = true;

    this.httpService
      .put<ProfileNameBody>(RouterPaths.profile, { name: this.form.value.name })
      .subscribe({
        next: () => {
          this.isEditing = false;
          this.store.dispatch(updateProfileInfo({ name: { S: this.form.value.name } }));

          this.snackBar.open(SnackBar.nameUpdatingOK, SnackBar.closeAction, {
            duration: 3500,
          });
        },
        error: (res) => {
          this.snackBar.open(
            SnackBar.updatingError + (res.error.message || SnackBar.errorMessage),
            SnackBar.closeAction,
            {
              duration: 3500,
            },
          );
        },
      })
      .add(() => {
        this.isUpdating = false;
      });
  }

  getErrorMessage(field: string): string {
    const formField = this.form.get(field);
    return formField ? this.authService.getErrorMessage(field, formField) : '';
  }
}
