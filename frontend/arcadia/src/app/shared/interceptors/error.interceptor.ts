import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { LoginService } from '../../pages/login/service/login.service';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  
  return next(req).pipe(
    catchError((err: HttpErrorResponse): Observable<any> => {
      const loginService = inject(LoginService)
      router.navigateByUrl('/erreur');
      loginService.logout()
      throw err;
    })
  );
};
