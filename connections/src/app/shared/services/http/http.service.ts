import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url: string;

  constructor(public http: HttpClient) {
    this.url = environment.apiUrl;
  }

  post<T, K>(apiRoute: string, body: K): Observable<T> {
    return this.http.post<T>(`${this.url + apiRoute}`, body);
  }

  get<T>(apiRoute: string): Observable<T> {
    return this.http.get<T>(`${this.url + apiRoute}`);
  }

  put<T>(apiRoute: string, body: T) {
    return this.http.put(`${this.url + apiRoute}`, body);
  }

  delete(apiRoute: string) {
    return this.http.delete(`${this.url + apiRoute}`);
  }
}
