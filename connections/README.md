# Connections project with real backend

- Task: [Connections project with real backend](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/connections/README.md)
- Deploy: [Connections](https://yumentsel-connections.netlify.app/)
- Done 20.12.2023 / deadline 20.12.23
- Score: 800 / 800

- [x] **Registration - 60 points**

  - [x] page with dedicated url: **5 points**
  - [x] validation for _name_ and _email_ fields with error messages: **5 points**
  - [x] validation for _password_ field with error messages: **5 points**
  - [x] redirection to sign-in page after successful registration: **5 points**
  - [x] [toast messages](./README.md#toast) with appropriate text are displayed if http-request fails or succeed: **10 points**
  - [x] _Submit_ button is disabled if form is invalid. Also, it should be disabled after http error with type `PrimaryDuplicationException` until the user changes the field value: **10 points**
  - [x] _Submit_ button is disabled and `email` field has error message of taken account if user type the same email address that he tried to send before and got an error `PrimaryDuplicationException`: **10 points**
  - [x] _Submit_ button is disabled after clicking while http-request is in progress: **10 points**

- [x] **Login - 70 points**

  - [x] default page for unauthorized user: **10 points**
  - [x] validation for _email_ field with error messages: **5 points**
  - [x] validation for _password_ field with error messages: **5 points**
  - [x] redirection to the main page after successful authentication: **10 points**
  - [x] [toast messages](./README.md#toast) with appropriate text are displayed if http-request fails or succeed: **10 points**
  - [x] _Submit_ button is disabled if form is invalid. Also, it should be disabled after http error with type `NotFoundException` until the user changes `email` or `password` field value: **10 points**
  - [x] _Submit_ button is disabled after clicking while http-request is in progress: **10 points**
  - [x] `token`, `uid` and `email` value is saved in `localStorage` after successful sign in and used again in the following http-requests even after page reloading (it allows user to omit sign in again after page reloading): **10 points**

- [x] **Profile - 40 points**

  - [x] `user id`, `email`, `creation time`, `user name` data of current user is displayed on the page: **30 points**
  - [x] error message with appropriate text are displayed on the page if loading http-request fails (for instance, if internet connection is lost): **10 points**

- [x] **Update profile - 55 points**

  - [x] button _Edit_ makes `name` field editable: **10 points**
  - [x] button _Cancel_ returns initial page state (static appearance): **5 points**
  - [x] clicking the button _Save_ sends 1 http-request to save new data without the ability to click it again (along with _Cancel_ button) until process is end: **20 points**
  - [x] buttons _Cancel_ and _Save_ are visible ony for editable form: **5 points**
  - [x] button _Edit_ is visible only for static page: **5 points**
  - [x] [toast messages](./README.md#toast) with appropriate text are displayed if http-request fails or succeed: **10 points**

- [x] **Logout - 40 points**

  - [x] clicking on `Logout` button the http-request is sent with `DELETE` method: **10 points**
  - [x] user is redirected to Sign-In page after successful logout process: **10 points**
  - [x] all data in `cookies`, `localStorage` is deleted: **10 points**
  - [x] [toast messages](./README.md#toast) with appropriate text are displayed if http-request fails or succeed: **10 points**

- [x] **People and group sections - 175 points**
  - [x] default page for authorized user: **10 points**
  - [x] page is divided on 2 vertical sections with independent content: **5 points**
  - [x] Group section (left)
    - [x] the list of available groups is loaded if user opens this page first time: **5 points**
    - [x] the list item created by current user should contain _Delete_ button: **10 points**
    - [x] the confirmation modal appears after clicking on _Delete_ button on list item with _Cancel_, _Delete_ button inside. If user clicks _Cancel_ the modal disappears. If user clicks _Delete_ the http-request is sent and item is removed from the list after succeeded response: **15 points**
    - [x] clicking on _Update_ button sends corresponding http-request and update group list if succeeded: **10 points**
    - [x] countdown appears for 1 minute after clicking on _Update_ button (except if error occurs): **10 points**
    - [x] _Update_ button is disabled after clicking during updating and until the timer is active: **5 points**
    - [x] clicking on _Create_ button the modal window is opened. There is form with validation and submit button: **10 points**
    - [x] submit button in modal window should be disabled until form is valid: **5 points**
    - [x] clicking on submit button in modal window the appropriate http-request is sent to create new group. Modal window is closed only if http-request succeeded: **15 points**
    - [x] [toast messages](./README.md#toast) with appropriate text are displayed if http-request fails or succeed: **10 points**
    - [x] clicking on list item the user is redirected to group dialog page: **5 points**
  - [x] People list (right)
    - [x] the list of people is loaded if user opens this page first time: **10 points**
    - [x] the list item with which current user already has active conversation has special background: **10 points**
    - [x] clicking on _Update_ button sends corresponding http-request and update people list if succeeded: **10 points**
    - [x] countdown appears for 1 minute after clicking on _Update_ button (except if error occurs): **10 points**
    - [x] _Update_ button is disabled after clicking during updating and until the timer is active: **5 points**
    - [x] clicking on list item the user is redirected to personal conversation page. New conversation (via certain http-request) is created if it has not already created before transition: **15 points**

- [x] **Group dialog - 140 points**
  - [x] the page is protected by a guard only for authorized user: **5 points**
  - [x] the error message is displayed if group with provided id does not exist: **10 points**
  - [x] _Return back_ is a link, not a button: **5 points**
  - [x] the full message history is loaded if user visit this page first time: **10 points**
  - [x] only the last messages (using `since` parameter) are loaded if user opens this group conversation again: **20 points**
  - [x] only the last messages (using `since` parameter) are loaded if user clicks on _Update_ button: **20 points**
  - [x] messages in corresponding area are sorted by time. New messages are appended at the bottom: **5 points**
  - [x] message item contains readable time, user name and text. Own messages are displayed on the right. Other messages are displayed on the left: **10 points**
  - [x] countdown appears for 1 minute after clicking on _Update_ button (except if error occurs): **10 points**
  - [x] _Update_ button is disabled after clicking during updating and until the timer is active: **5 points**
  - [x] group is created by current user should contain _Delete_ button: **10 points**
  - [x] the confirmation modal appears after clicking on _Delete_ button with _Cancel_, _Delete_ button inside. If user clicks _Cancel_ the modal disappears. If user clicks _Delete_ the http-request is sent and the user is redirected to main page after succeeded response: **10 points**
  - [x] form field has `required` validator. _Send new message_ button is disabled until field has text: **5 points**
  - [x] new messages are loaded (using `since` parameter) after successful sending new message: **15 points**

- [x] **People conversation - 140 points**

  - [x] the page is protected by a guard only for authorized user: **5 points**
  - [x] the error message is displayed if conversation with provided id does not exist: **10 points**
  - [x] _Return back_ is a link, not a button: **5 points**
  - [x] the full message history is loaded if user visit this page first time: **10 points**
  - [x] only the last messages (using `since` parameter) are loaded if user opens this group conversation again: **25 points**
  - [x] only the last messages (using `since` parameter) are loaded if user clicks on _Update_ button: **25 points**
  - [x] messages in corresponding area are sorted by time. New messages are appended at the bottom: **5 points**
  - [x] message item contains readable time, user name and text. Own messages are displayed on the right. Other messages are displayed on the left: **10 points**
  - [x] countdown appears for 1 minute after clicking on _Update_ button (except if error occurs): **10 points**
  - [x] _Update_ button is disabled (user cannot click it) after clicking during updating and until the timer is active: **5 points**
  - [x] the confirmation modal appears after clicking on _Delete_ button with _Cancel_, _Delete_ button inside. If user clicks _Cancel_ the modal disappears. If user clicks _Delete_ the http-request is sent and the user is redirected to main page after succeeded response: **10 points**
  - [x] form field has `required` validator. _Send new message_ button is disabled (user cannot click it) until field has text: **5 points**
  - [x] new messages are loaded (using `since` parameter) after successful sending new message: **15 points**

- [x] **404 page - 30 points**

  - [x] error message is displayed about wrong url/page: **30 points**

- [x] **Style theme - 50 points**

  - [x] chosen state is saved in `localStorage` and used/applied after reloading. User can refresh the page and see the same theme: **20 points**
  - [x] light/dark styles are applied to main page: **10 points**
  - [x] light/dark styles are applied to group dialog page: **10 points**
  - [x] light/dark styles are applied to personal conversation page: **10 points**

---

## Url navigation

#### Guest

Pages available only for users before authorization. That pages are not available for users after successful authorization and protected by _Guards_.

_`/signup` (registration)_
Page to create new account.

_`/signin` (login)_
Page where user can enter email and password to enter the platform. **Default page** for non-authorized users.

#### Member

That pages allowed only for authorized users. Should be protected by _Guards_.

_`/` (main page)_
Page with group list and people list.**Default page** for authorized users.

_`/profile` (user profile)_
User's information with the ability to edit it.

_`/group/{:groupID}` (broadcast page)_
where, `:groupID` is unique group identifier;
Page where user can send message to all participants.

_`/conversation/{:conversationID}` (person dialog)_
where, `:conversationID` is unique room identifier with interlocutor;
Page where user can write personal messages directly.

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
