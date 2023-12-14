import { KeyString } from '../models/shared.model';
import { RegistrationFormErrorMessages } from './enums';

export const errorMessages: KeyString = {
  name: RegistrationFormErrorMessages.name,
  nameMax: RegistrationFormErrorMessages.nameMax,
  nameValid: RegistrationFormErrorMessages.nameValid,
  group: RegistrationFormErrorMessages.group,
  groupValid: RegistrationFormErrorMessages.groupValid,
  groupMax: RegistrationFormErrorMessages.groupMax,
  email: RegistrationFormErrorMessages.email,
  emailValid: RegistrationFormErrorMessages.emailValid,
  emailTaken: RegistrationFormErrorMessages.emailTaken,
  password: RegistrationFormErrorMessages.password,
  passwordValid: RegistrationFormErrorMessages.passwordValid,
};

export const delay = 60;
