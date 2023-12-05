export enum RegistrationFormErrorMessages {
  firstName = 'Please enter a first name',
  firstNameMax = 'The name is invalid, maximum 40 characters',
  firstNameValid = 'The name is invalid, allowed only letters or spaces',
  email = 'Please enter a email',
  emailValid = 'The email is invalid',
  password = 'Please enter a password',
  passwordValid = `Your password isn't strong enough (minimum 8 symbols that include at least 1 capital letter, at least 1 digit and at least 1 special symbol - !@#$%^&*)`,
}

export enum ValidatorTypes {
  required = 'required',
  email = 'email',
  maxlength = 'maxlength',
  pattern = 'pattern',
}

export enum ValidatorPatterns {
  firstName = '^[a-zA-Zs ]{1,40}$',
  password = `(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}$`,
}

export enum RouterPaths {
  signup = '/signup',
  signin = '/signin',
}
