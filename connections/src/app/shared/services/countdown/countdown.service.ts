import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';
import { updateCountdown } from '../../../redux/actions/groups.action';

@Injectable()
export class CountdownService {
  constructor(private store: Store) {}

  startCountdown(duration: number, countdown: string): void {
    timer(0, 1000)
      .pipe(
        map((tick) => duration - tick),
        takeWhile((t) => t >= 0),
      )

      .subscribe((remainingTime) => {
        this.store.dispatch(updateCountdown({ [countdown]: remainingTime }));
      });
  }
}
