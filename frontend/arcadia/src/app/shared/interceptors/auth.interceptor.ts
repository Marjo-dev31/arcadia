import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next)=> {

// intercept all httprequest, create headers with add bearer token, modifiedReq = req+ new headers 

    const accessToken = localStorage.getItem('accessToken') ?? '';
    req = req.clone({
        setHeaders: {
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
        }
    })
    return next(req)
}
