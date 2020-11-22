import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LocalStorageUtils } from '../utils/localstorage';
import { ACESSO_NEGADO, CONTA_LOGIN } from '../shared/routes';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.localStorageUtils.limparDadosLocaisUsuario();
            this.router.navigate([CONTA_LOGIN], { queryParams: { returnUrl: this.router.url } });
          }

          if (error.status === 403) {
            this.router.navigate([ACESSO_NEGADO]);
          }
        }

        return throwError(error);
      })
    );
  }

}
