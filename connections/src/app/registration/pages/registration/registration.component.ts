import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthBody } from '../../../shared/models/shared.model';
import { HttpService } from '../../../shared/services/http/http.service';
import {
  Endpoints,
  ErrorTypes,
  RouterPaths,
  SnackBar,
  ValidatorPatterns,
} from '../../../shared/constants/enums';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { SnackBarService } from '../../../shared/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  form: FormGroup;

  loading = false;

  takenEmails: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private httpService: HttpService,
    private snackBar: SnackBarService,
  ) {
    this.form = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.maxLength(40), Validators.pattern(ValidatorPatterns.name)],
      ],
      email: ['', [Validators.required, Validators.email, this.emailValidator.bind(this)]],
      password: ['', [Validators.required, Validators.pattern(ValidatorPatterns.password)]],
    });
  }

  submitForm() {
    this.loading = true;

    this.httpService
      .post<void, AuthBody>(Endpoints.registration, this.form.value)
      .subscribe({
        next: () => {
          this.snackBar.openOK(SnackBar.registrationOK);
          this.router.navigate([RouterPaths.signin]);
        },
        error: ({ error }) => {
          if (error.type === ErrorTypes.primaryDuplicationException) {
            const email = this.form.get('email');
            if (email) {
              email.setErrors({ taken: true });
              this.takenEmails.push(email.value);
            }
          }
          this.snackBar.openError(SnackBar.registrationError, error.message);
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

  emailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    return this.takenEmails.includes(control.value) ? { taken: true } : null;
  }
}
