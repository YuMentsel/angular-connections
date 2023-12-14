import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  private countdownSubject = new BehaviorSubject<number>(0);

  countdown$: Observable<number> = this.countdownSubject.asObservable();

  startCountdown(duration: number): void {
    timer(0, 1000)
      .pipe(
        map((tick) => duration - tick),
        takeWhile((t) => t >= 0),
      )

      .subscribe((remainingTime) => {
        this.countdownSubject.next(remainingTime);
      });
  }
}
