import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ) => {
        const router = inject(Router);
        const accesToken = localStorage.getItem('accessToken')

        if(accesToken){
            return true
        }
        router.navigateByUrl('/connexion')
        return false;
}