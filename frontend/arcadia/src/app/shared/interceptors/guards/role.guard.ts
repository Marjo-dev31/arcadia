import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const RoleGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ) => {

        const router = inject(Router)
      
    const isAuthorized = (route: ActivatedRouteSnapshot): boolean => {
        const role = localStorage.getItem('role')
        const expectedRoles = route.data['expectedRoles'];
            if(expectedRoles.indexOf(role) !== -1){
                return true
            }
            router.navigateByUrl('/connexion')
            return false;
    }
    
    return isAuthorized(route)
}