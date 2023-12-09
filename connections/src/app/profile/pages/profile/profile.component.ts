import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, take } from 'rxjs';
import { RouterPaths, SnackBar } from '../../../shared/constants/enums';
import { ProfileInfo } from '../../../shared/models/shared.model';
import { HttpService } from '../../../shared/services/http/http.service';
import { addProfileInfo } from '../../../redux/actions/connections.action';
import { selectProfileInfo } from '../../../redux/selectors/connections.selector';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileInfo$!: Observable<ProfileInfo | null>;

  constructor(
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.profileInfo$ = this.store.select(selectProfileInfo);

    this.profileInfo$.pipe(take(1)).subscribe((profileInfo) => {
      if (profileInfo === null) {
        this.httpService
          .get<ProfileInfo>(RouterPaths.profile)
          .pipe(take(1))
          .subscribe({
            next: (info) => {
              this.store.dispatch(addProfileInfo({ info }));
            },
            error: (res) => {
              this.snackBar.open(
                SnackBar.loadingError + (res.error.message || SnackBar.errorMessage),
                SnackBar.closeAction,
                {
                  duration: 3500,
                },
              );
            },
          });
      }
    });
  }
}
