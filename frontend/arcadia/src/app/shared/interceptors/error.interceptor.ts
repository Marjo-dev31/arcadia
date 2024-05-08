import { HttpErrorResponse, HttpEvent, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router)
    return next(req).pipe(
        catchError((err: HttpErrorResponse): Observable<any> => {
            console.log(err);
            router.navigateByUrl('/erreur')
            throw err
        })
    )
}