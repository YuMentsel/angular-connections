import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, timer } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';
import { updateCountdown } from '../../../redux/actions/groups.action';

@Injectable({
  providedIn: 'any',
})
export class CountdownService {
  private static instances: CountdownService[] = [];

  subscription!: Subscription;

  constructor(private store: Store) {}

  unsubscribeTimer() {
    const index = CountdownService.instances.indexOf(this);
    if (index !== -1) {
      CountdownService.instances.splice(index, 1);
      if (this.subscription) this.subscription.unsubscribe();
    }
  }

  static removeAllInstances() {
    CountdownService.instances.forEach((instance) => instance.unsubscribeTimer());
  }

  startCountdown(duration: number, countdown: string): void {
    const instance = new CountdownService(this.store);
    CountdownService.instances.push(instance);
    instance.start(duration, countdown);
  }

  start(duration: number, countdown: string): void {
    CountdownService.instances.push(this);
    this.subscription = timer(0, 1000)
      .pipe(
        map((tick) => duration - tick),
        takeWhile((t) => t >= 0),
      )

      .subscribe((remainingTime) => {
        this.store.dispatch(updateCountdown({ [countdown]: remainingTime }));
      });
  }
}
