import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterPaths, ValidatorPatterns } from '../../../shared/constants/enums';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.form = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern(ValidatorPatterns.firstName),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(ValidatorPatterns.password)]],
    });
  }

  submitForm() {
    this.router.navigate([RouterPaths.signin]);
  }

  getErrorMessage(field: string): string {
    const formField = this.form.get(field);
    return formField ? this.authService.getErrorMessage(field, formField) : '';
  }
}
