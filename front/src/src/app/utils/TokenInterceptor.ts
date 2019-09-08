import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {KeyCloakService} from './key-cloak-service';
import {Observable} from 'rxjs';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: KeyCloakService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
          Authorization: `${this.auth.getToken()}`
      },  withCredentials: true
    });


    return next.handle(request);
  }
}
