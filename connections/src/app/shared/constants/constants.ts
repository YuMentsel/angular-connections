import { KeyString } from '../models/shared.model';
import { FormErrorMessages } from './enums';

export const errorMessages: KeyString = {
  name: FormErrorMessages.name,
  nameMax: FormErrorMessages.nameMax,
  nameValid: FormErrorMessages.nameValid,
  group: FormErrorMessages.group,
  groupValid: FormErrorMessages.groupValid,
  groupMax: FormErrorMessages.groupMax,
  email: FormErrorMessages.email,
  emailValid: FormErrorMessages.emailValid,
  emailTaken: FormErrorMessages.emailTaken,
  password: FormErrorMessages.password,
  passwordValid: FormErrorMessages.passwordValid,
};

export const delay = 60;
