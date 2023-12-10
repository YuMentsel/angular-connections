import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginResponse } from '../../../shared/models/shared.model';
import {
  ErrorTypes,
  RouterPaths,
  SnackBar,
  ValidatorPatterns,
} from '../../../shared/constants/enums';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { HttpService } from '../../../shared/services/http/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;

  loading = false;

  userNotFound = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(ValidatorPatterns.password)]],
    });
  }

  submitForm() {
    this.loading = true;

    this.httpService
      .post<LoginResponse>(RouterPaths.login, this.form.value)
      .subscribe({
        next: (res) => {
          this.authService.setToken(
            JSON.stringify({ email: this.form.get('email')?.value, ...res }),
          );
          this.snackBar.open(SnackBar.loginOK, SnackBar.closeAction, { duration: 2000 });
          this.router.navigate([RouterPaths.main]);
        },
        error: (res) => {
          if (res.error.type === ErrorTypes.notFoundException) {
            this.userNotFound = true;
          }
          this.snackBar.open(
            SnackBar.loginError + (res.error.message || SnackBar.errorMessage),
            SnackBar.closeAction,
            {
              duration: 3500,
            },
          );
        },
      })
      .add(() => {
        this.loading = false;
      });
  }

  onFieldChange(): void {
    this.userNotFound = false;
  }

  getErrorMessage(field: string): string {
    const formField = this.form.get(field);
    return formField ? this.authService.getErrorMessage(field, formField) : '';
  }
}
