import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AuthService} from '../_services/auth.service';

@Injectable({providedIn: 'root'})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.authenticationService.currentUserValue;
    if (sessionStorage.getItem("token")) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      });
    }

    return next.handle(request);
  }
}
