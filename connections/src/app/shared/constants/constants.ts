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
  message: FormErrorMessages.message,
};

export const validatorPatterns = {
  name: /^[\p{L}\p{M}\s]+$/u,
  nameWithDigits: /^[\p{L}\p{N}\p{M}\s]+$/u,
  password: `(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}$`,
};

export const delay = 60;
