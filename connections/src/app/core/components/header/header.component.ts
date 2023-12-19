import { Component, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CountdownService } from '../../../shared/services/countdown/countdown.service';
import { clearStore } from '../../../redux/actions/profile.action';
import { Endpoints, RouterPaths, SnackBar, Themes } from '../../../shared/constants/enums';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { HttpService } from '../../../shared/services/http/http.service';
import { SnackBarService } from '../../../shared/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loading = false;

  isDarkTheme = false;

  private renderer: Renderer2;

  constructor(
    private router: Router,
    private authService: AuthService,
    private httpService: HttpService,
    private snackBar: SnackBarService,
    private store: Store,
    rendererFactory: RendererFactory2,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.isDarkTheme = false;
      this.toggleTheme();
    }
  }

  checkTheme(): void {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.toggleTheme();
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.loading = true;

    this.httpService
      .delete(Endpoints.logout)
      .subscribe({
        next: () => {
          this.snackBar.openOK(SnackBar.logoutOK);

          CountdownService.removeAllInstances();
          this.store.dispatch(clearStore());
          this.checkTheme();
          this.authService.logout();
          this.router.navigate([RouterPaths.signin]);
        },
        error: ({ error }) => {
          this.snackBar.openError(SnackBar.logoutError, error.message);
        },
      })
      .add(() => {
        this.loading = false;
      });
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const themeClass = this.isDarkTheme ? Themes.dark : Themes.light;

    if (this.isDarkTheme) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.removeItem('theme');
    }

    this.renderer.removeClass(document.body, this.isDarkTheme ? Themes.light : Themes.dark);
    this.renderer.addClass(document.body, themeClass);
  }
}
