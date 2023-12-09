import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouterPaths } from '../constants/enums';
import { TokenHeaders } from '../models/shared.model';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.endsWith(RouterPaths.login) || request.url.endsWith(RouterPaths.registration)) {
      return next.handle(request);
    }

    const tokenInfo = localStorage.getItem('token');
    if (!tokenInfo) return next.handle(request);

    const { email, uid, token }: TokenHeaders = JSON.parse(tokenInfo);

    const modifiedRequest = request.clone({
      setHeaders: {
        'rs-uid': uid,
        'rs-email': email,
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(modifiedRequest);
  }
}
