import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthBody, LoginResponse } from '../../../shared/models/shared.model';
import {
  Endpoints,
  ErrorTypes,
  RouterPaths,
  SnackBar,
  ValidatorPatterns,
} from '../../../shared/constants/enums';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { HttpService } from '../../../shared/services/http/http.service';
import { SnackBarService } from '../../../shared/services/snack-bar/snack-bar.service';

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
    private snackBar: SnackBarService,
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(ValidatorPatterns.password)]],
    });
  }

  submitForm() {
    this.loading = true;

    this.httpService
      .post<LoginResponse, AuthBody>(Endpoints.login, this.form.value)
      .subscribe({
        next: (res) => {
          this.authService.setToken(
            JSON.stringify({ email: this.form.get('email')?.value, ...res }),
          );
          this.snackBar.openOK(SnackBar.loginOK);
          this.router.navigate([RouterPaths.main]);
        },
        error: ({ error }) => {
          if (error.type === ErrorTypes.notFoundException) {
            this.userNotFound = true;
          }
          this.snackBar.openError(SnackBar.loginError, error.message);
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
