import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  post(apiRoute: string, body: AuthBody) {
    return this.http.post(`${this.url + apiRoute}`, body);
  }

  get(apiRoute: string) {
    return this.http.get(`${this.url + apiRoute}`);
  }

  put(apiRoute: string, body: AuthBody) {
    return this.http.put(`${this.url + apiRoute}`, body);
  }

  delete(apiRoute: string) {
    return this.http.delete(`${this.url + apiRoute}`);
  }
}
