import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    public authService: AuthService,
    public router: Router,
    private snackBar: MatSnackBar
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    if (!request.url.includes('/login') && !request.url.includes('/register')) {
      request = request.clone({
        setHeaders: {
          authorization: `${localStorage.getItem('os_auth')}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        authorization: `${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((resp: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(resp.token);
          localStorage.setItem('os_auth', resp.token);
          return next.handle(this.addToken(request, resp.token));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          if (error instanceof HttpErrorResponse && error.status === 403) {
            localStorage.removeItem('os_auth');
            localStorage.removeItem('os_auth_refresh');
            this.router.navigateByUrl('/login');
            this.snackBar.open(error.error.message, null, {
              duration: 3000,
              panelClass: 'snack-error',
            });
          } else {
            return throwError(error);
          }
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }
}
