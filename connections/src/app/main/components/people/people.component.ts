import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, of, take } from 'rxjs';
import { selectPeople } from '../../../redux/selectors/people.selector';
import { Endpoints, SnackBar, RouterPaths, Countdown } from '../../../shared/constants/enums';
import { CountdownService } from '../../../shared/services/countdown/countdown.service';
import { HttpService } from '../../../shared/services/http/http.service';
import { SnackBarService } from '../../../shared/services/snack-bar/snack-bar.service';
import { addPeople } from '../../../redux/actions/people.action';
import { selectPeopleCountdown } from '../../../redux/selectors/group.selector';
import { Person } from '../../models/people.model';
import { Response } from '../../models/groups.model';
import { delay } from '../../../shared/constants/constants';

@Component({
  selector: 'app-people',
  providers: [CountdownService],
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit, OnDestroy {
  loading = false;

  people$!: Observable<Person[]>;

  remainingTime$: Observable<number> = of(0);

  disabled = false;

  subscription!: Subscription;

  uid = '';

  constructor(
    private httpService: HttpService,
    private snackBar: SnackBarService,
    private store: Store,
    private router: Router,
    private countdownService: CountdownService,
  ) {}

  ngOnInit(): void {
    this.people$ = this.store.select(selectPeople);

    this.people$.pipe(take(1)).subscribe((people) => {
      if (!people.length) this.loadPeople();
    });

    this.remainingTime$ = this.store.select(selectPeopleCountdown);

    this.subscription = this.remainingTime$.subscribe((time) => {
      this.disabled = time > 0;
    });

    const token = localStorage.getItem('token');
    this.uid = token ? JSON.parse(token).uid : '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadPeople(click?: boolean): void {
    this.loading = true;
    this.httpService
      .get<Response<Person>>(Endpoints.users)
      .subscribe({
        next: (people) => {
          this.store.dispatch(addPeople({ people: people.Items }));

          if (click) {
            this.countdownService.startCountdown(delay, Countdown.people);
          }
        },
        error: ({ error }) => {
          this.snackBar.openError(SnackBar.creatingError, error.message);
        },
      })
      .add(() => {
        this.loading = false;
      });
  }

  openConversation(id: string): void {
    this.router.navigate([RouterPaths.conversation, id]);
  }
}
