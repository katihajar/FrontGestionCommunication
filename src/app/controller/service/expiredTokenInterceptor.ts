import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class ExpiredTokenInterceptor implements HttpInterceptor {

  constructor(private router: Router,private authService:AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (this.router.url === '/login' || this.router.url === '/') {
            // Skip the interceptor if on the login page
          } else {
            // Token is expired or not present, log out the user
            this.authService.LogOUT();
            this.router.navigate(['/expired-token']);
          }
          // redirect to the expired token page
        }
        return throwError(error);
      })
    );
  }

}
