import { KeyString } from '../models/shared.model';
import { RegistrationFormErrorMessages } from './enums';

export const errorMessages: KeyString = {
  name: RegistrationFormErrorMessages.name,
  nameMax: RegistrationFormErrorMessages.nameMax,
  nameValid: RegistrationFormErrorMessages.nameValid,
  email: RegistrationFormErrorMessages.email,
  emailValid: RegistrationFormErrorMessages.emailValid,
  emailTaken: RegistrationFormErrorMessages.emailTaken,
  password: RegistrationFormErrorMessages.password,
  passwordValid: RegistrationFormErrorMessages.passwordValid,
};
