import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Injector, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { LoginService } from '../../pages/login/service/login.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const logginService = inject(LoginService)
  return next(req).pipe(
    catchError((err: HttpErrorResponse): Observable<any> => {
      router.navigateByUrl('/erreur');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('role');
      logginService.isLoggin = false;
      throw err;
    })
  );
};
