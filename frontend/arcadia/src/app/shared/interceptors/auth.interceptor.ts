import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    // intercept all httprequest, create headers with add bearer token, authReq = req+ new headers
    const accessToken = localStorage.getItem("accessToken");
    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return next(authReq);
};
