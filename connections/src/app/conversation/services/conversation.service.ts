import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take, map } from 'rxjs';
import { addPeopleMessages } from '../../redux/actions/people.action';
import { Person } from '../../main/models/people.model';
import { Endpoints } from '../../shared/constants/enums';
import { HttpService } from '../../shared/services/http/http.service';
import { Message, Response } from '../../shared/models/shared.model';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  constructor(
    private httpService: HttpService,
    private store: Store,
  ) {}

  loadConversation(id: string, time: string): Observable<Message[]> {
    const since = time ? `&since=${time}` : '';
    return this.httpService
      .get<Response<Message>>(`${Endpoints.readConversation}${id}${since}`)
      .pipe(take(1))
      .pipe(map((result) => result.Items));
  }

  saveToStore(id: string, messages: Message[]): void {
    const time = messages[messages.length - 1]?.createdAt?.S;
    this.store.dispatch(addPeopleMessages({ messages, key: id, time }));
  }

  loadUsers(): Observable<Person[]> {
    return this.httpService
      .get<Response<Person>>(Endpoints.users)
      .pipe(take(1))
      .pipe(map((result) => result.Items));
  }
}
