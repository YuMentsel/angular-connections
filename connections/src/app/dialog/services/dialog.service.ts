import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { Person } from '../../main/models/people.model';
import { Group } from '../../main/models/groups.model';
import { addMessages } from '../../redux/actions/groups.action';
import { Endpoints } from '../../shared/constants/enums';
import { HttpService } from '../../shared/services/http/http.service';
import { Message, Response } from '../../shared/models/shared.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    private httpService: HttpService,
    private store: Store,
  ) {}

  loadDialog(dialogId: string, time: string): Observable<Message[]> {
    const since = time ? `&since=${time}` : '';
    return this.httpService
      .get<Response<Message>>(`${Endpoints.readGroup}${dialogId}${since}`)
      .pipe(take(1))
      .pipe(map((result) => result.Items));
  }

  saveToStore(dialogId: string, messages: Message[]): void {
    const time = messages[messages.length - 1]?.createdAt?.S || '';
    this.store.dispatch(addMessages({ messages, key: dialogId, time }));
  }

  loadGroups(): Observable<Group[]> {
    return this.httpService
      .get<Response<Group>>(Endpoints.groupsList)
      .pipe(take(1))
      .pipe(map((result) => result.Items));
  }

  loadUsers(): Observable<Person[]> {
    return this.httpService
      .get<Response<Person>>(Endpoints.users)
      .pipe(take(1))
      .pipe(map((result) => result.Items));
  }
}
