import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthBody } from '../../models/shared.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url: string;

  constructor(public http: HttpClient) {
    this.url = environment.apiUrl;
  }

  post<T>(apiRoute: string, body: AuthBody): Observable<T> {
    return this.http.post<T>(`${this.url + apiRoute}`, body);
  }

  get<T>(apiRoute: string): Observable<T> {
    return this.http.get<T>(`${this.url}/${apiRoute}`);
  }

  put(apiRoute: string, body: AuthBody) {
    return this.http.put(`${this.url + apiRoute}`, body);
  }

  delete(apiRoute: string) {
    return this.http.delete(`${this.url + apiRoute}`);
  }
}
