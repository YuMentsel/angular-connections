import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectNameByID } from '../../redux/selectors/people.selector';

@Pipe({
  name: 'nameById',
  standalone: true,
})
export class NameByIdPipe implements PipeTransform {
  constructor(private store: Store) {}
  transform(id: string): Observable<string> {
    return this.store.select(selectNameByID(id));
  }
}
