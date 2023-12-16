import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Endpoints, SnackBar, ValidatorPatterns } from '../../../shared/constants/enums';
import { ProfileInfo, ProfileNameBody } from '../../../shared/models/shared.model';
import { HttpService } from '../../../shared/services/http/http.service';
import { addProfileInfo, updateProfileInfo } from '../../../redux/actions/profile.action';
import { selectProfileInfo } from '../../../redux/selectors/profile.selector';
import { SnackBarService } from '../../../shared/services/snack-bar/snack-bar.service';

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
    private snackBar: SnackBarService,
    private store: Store,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.profileInfo$ = this.store.select(selectProfileInfo);

    this.profileInfo$.pipe(take(1)).subscribe((profileInfo) => {
      if (profileInfo === null) {
        this.httpService
          .get<ProfileInfo>(Endpoints.profile)
          .pipe(take(1))
          .subscribe({
            next: (info) => {
              this.store.dispatch(addProfileInfo({ info }));
            },
            error: ({ error }) => {
              this.snackBar.openError(SnackBar.loadingError, error.message);
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

  cancelEditing(event: Event): void {
    this.isEditing = false;
    this.initForm(this.form.value);
    event.preventDefault();
  }

  saveChanges(): void {
    this.isUpdating = true;

    this.httpService
      .put<ProfileNameBody>(Endpoints.profile, { name: this.form.value.name })
      .subscribe({
        next: () => {
          this.isEditing = false;
          this.store.dispatch(updateProfileInfo({ name: { S: this.form.value.name } }));

          this.snackBar.openOK(SnackBar.nameUpdatingOK);
        },
        error: ({ error }) => {
          this.snackBar.openError(SnackBar.updatingError, error.message);
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
