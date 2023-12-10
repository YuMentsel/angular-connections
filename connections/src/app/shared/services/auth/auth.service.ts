import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { errorMessages } from '../../constants/constants';
import { ValidatorTypes } from '../../constants/enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'token';

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private clearAllCookies(): void {
    document.cookie.split(';').forEach((cookie) => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });
  }

  logout(): void {
    this.removeToken();
    sessionStorage.clear();
    this.clearAllCookies();
  }

  getErrorMessage(field: string, formField: AbstractControl<string, string>) {
    if (formField?.errors?.[ValidatorTypes.required]) return errorMessages[field];
    if (formField?.errors?.[ValidatorTypes.email]) return errorMessages[`${field}Valid`];
    if (formField?.errors?.[ValidatorTypes.maxlength]) return errorMessages[`${field}Max`];
    if (formField?.errors?.[ValidatorTypes.taken]) return errorMessages[`${field}Taken`];
    return formField?.errors?.[ValidatorTypes.pattern] ? errorMessages[`${field}Valid`] : '';
  }
}
