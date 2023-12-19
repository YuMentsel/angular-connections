import { Component, OnInit } from '@angular/core';
import { LinksText, RouterPaths } from '../../../shared/constants/enums';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  linkText!: string;

  link!: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.link = this.authService.isAuthenticated() ? RouterPaths.main : RouterPaths.signin;
    this.linkText = this.authService.isAuthenticated() ? LinksText.main : LinksText.signin;
  }
}
