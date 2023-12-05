import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { errorMessages } from '../constants/constants';
import { ValidatorTypes } from '../constants/enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getErrorMessage(field: string, formField: AbstractControl<string, string>) {
    if (formField?.errors?.[ValidatorTypes.required]) return errorMessages[field];
    if (formField?.errors?.[ValidatorTypes.email]) return errorMessages[`${field}Valid`];
    if (formField?.errors?.[ValidatorTypes.maxlength]) return errorMessages[`${field}Max`];
    return formField?.errors?.[ValidatorTypes.pattern] ? errorMessages[`${field}Valid`] : '';
  }
}
