import { KeyString } from '../models/shared.model';
import { RegistrationFormErrorMessages } from './enums';

export const errorMessages: KeyString = {
  firstName: RegistrationFormErrorMessages.firstName,
  firstNameMax: RegistrationFormErrorMessages.firstNameMax,
  firstNameValid: RegistrationFormErrorMessages.firstNameValid,
  email: RegistrationFormErrorMessages.email,
  emailValid: RegistrationFormErrorMessages.emailValid,
  password: RegistrationFormErrorMessages.password,
  passwordValid: RegistrationFormErrorMessages.passwordValid,
};
