import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteProfileInfo } from '../../../redux/actions/connections.action';
import { RouterPaths, SnackBar } from '../../../shared/constants/enums';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { HttpService } from '../../../shared/services/http/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private store: Store,
  ) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.loading = true;

    this.httpService
      .delete(RouterPaths.logout)
      .subscribe({
        next: () => {
          this.snackBar.open(SnackBar.logoutOK, SnackBar.closeAction, { duration: 2000 });
          this.store.dispatch(deleteProfileInfo());
          this.authService.logout();
          this.router.navigate([RouterPaths.signin]);
        },
        error: (res) => {
          this.snackBar.open(
            SnackBar.logoutError + (res.error.message || SnackBar.errorMessage),
            SnackBar.closeAction,
            { duration: 3500 },
          );
        },
      })
      .add(() => {
        this.loading = false;
      });
  }
}
