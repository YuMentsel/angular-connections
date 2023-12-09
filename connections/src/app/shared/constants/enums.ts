export enum RegistrationFormErrorMessages {
  name = 'Please enter a first name',
  nameMax = 'The name is invalid, maximum 40 characters',
  nameValid = 'The name is invalid, allowed only letters or spaces',
  email = 'Please enter a email',
  emailValid = 'The email is invalid',
  emailTaken = 'The email is taken',
  password = 'Please enter a password',
  passwordValid = `Your password isn't strong enough (minimum 8 symbols that include at least 1 capital letter, at least 1 digit and at least 1 special symbol - !@#$%^&*)`,
}

export enum ErrorTypes {
  primaryDuplicationException = 'PrimaryDuplicationException',
  notFoundException = 'NotFoundException',
}

export enum ValidatorTypes {
  required = 'required',
  email = 'email',
  maxlength = 'maxlength',
  taken = 'taken',
  pattern = 'pattern',
}

export enum ValidatorPatterns {
  name = '^[a-zA-Zs ]{1,40}$',
  password = `(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}$`,
}

export enum RouterPaths {
  signup = '/signup',
  signin = '/signin',
  profile = '/profile',
  main = '/',
  registration = '/registration',
  login = '/login',
}

export enum SnackBar {
  registrationOK = 'Registration has been successful!',
  loginOK = 'Login has been successful!',
  nameUpdatingOK = 'Name updated successfully!',
  registrationError = 'Registration failed! ',
  loginError = 'Login failed! ',
  updatingError = 'Updating failed! ',
  loadingError = 'Loading failed! ',
  errorMessage = 'Something went wrong!',
  closeAction = 'Close',
}
