import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '../../../shared/services/http/http.service';
import {
  ErrorTypes,
  RouterPaths,
  SnackBar,
  ValidatorPatterns,
} from '../../../shared/constants/enums';
import { AuthService } from '../../../shared/services/auth/auth.service';

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
    private snackBar: MatSnackBar,
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
      .post(RouterPaths.registration, this.form.value)
      .subscribe({
        next: () => {
          this.snackBar.open(SnackBar.registrationOK, SnackBar.closeAction, { duration: 2000 });
          this.router.navigate([RouterPaths.signin]);
        },
        error: (res) => {
          if (res.error.type === ErrorTypes.primaryDuplicationException) {
            const email = this.form.get('email');
            if (email) {
              email.setErrors({ taken: true });
              this.takenEmails.push(email.value);
            }
          }
          this.snackBar.open(SnackBar.registrationError + res.error.message, SnackBar.closeAction, {
            duration: 3500,
          });
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
