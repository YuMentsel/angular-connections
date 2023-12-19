export enum FormErrorMessages {
  name = 'Please enter a first name',
  nameMax = 'The name is invalid, maximum 40 characters',
  nameValid = 'The name is invalid, allowed letters or spaces',
  group = 'Please enter a group name',
  groupValid = 'The name is invalid, allowed letters, digits or spaces',
  groupMax = 'The name is invalid, maximum 30 characters',
  email = 'Please enter a email',
  emailValid = 'The email is invalid',
  emailTaken = 'The email is taken',
  password = 'Please enter a password',
  passwordValid = `Password isn't strong enough (min 8 symbols that include at least 1 capital letter, at least 1 digit and at least 1 special symbol - !@#$%^&*)`,
  message = 'Please enter your message',
}

export enum ErrorTypes {
  primaryDuplicationException = 'PrimaryDuplicationException',
  notFoundException = 'NotFoundException',
}

export enum Themes {
  light = 'light-theme',
  dark = 'dark-theme',
}

export enum LinksText {
  main = 'Go to main',
  signin = 'Go to login',
}

export enum ValidatorTypes {
  required = 'required',
  email = 'email',
  maxlength = 'maxlength',
  taken = 'taken',
  pattern = 'pattern',
}

export enum Confirmation {
  deleteGroupMessage = 'Are you sure you want to delete this group?',
  deleteConversationMessage = 'Are you sure you want to delete this conversation?',
  delete = 'Delete',
  cancel = 'Cancel',
}

export enum Countdown {
  groups = 'groups',
  people = 'people',
  dialog = 'dialog',
}

export enum RouterPaths {
  signup = '/signup',
  signin = '/signin',
  profile = '/profile',
  main = '/',
  registration = '/registration',
  login = '/login',
  group = '/group',
  conversation = '/conversation',
}

export enum Endpoints {
  profile = '/profile',
  registration = '/registration',
  login = '/login',
  logout = '/logout',
  groupsList = '/groups/list',
  createGroup = '/groups/create',
  deleteGroup = '/groups/delete?groupID=',
  readGroup = '/groups/read?groupID=',
  appendGroup = '/groups/append',
  users = '/users',
  conversationsList = '/conversations/list',
  conversationsCreate = '/conversations/create',
  readConversation = '/conversations/read?conversationID=',
  appendConversations = '/conversations/append',
  deleteConversation = '/conversations/delete?conversationID=',
}

export enum SnackBar {
  registrationOK = 'Registration has been successful!',
  loginOK = 'Login has been successful!',
  logoutOK = 'Logout has been successful!',
  nameUpdatingOK = 'Name updated successfully!',
  groupCreatingOK = 'Group created successfully!',
  groupDeletingOK = 'Group deleted successfully!',
  conversationDeletingOK = 'Conversations deleted successfully!',
  registrationError = 'Registration failed! ',
  loginError = 'Login failed! ',
  logoutError = 'Logout failed! ',
  updatingError = 'Updating failed! ',
  creatingError = 'Creating failed! ',
  deletingError = 'Deleting failed! ',
  loadingError = 'Loading failed! ',
  errorMessage = 'Something went wrong!',
  sendingError = 'Sending failed! ',
  closeAction = 'Close',
}
