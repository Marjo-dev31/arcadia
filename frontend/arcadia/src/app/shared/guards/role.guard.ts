import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
// import { LoginService } from "../services/login.service";

export const RoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const router = inject(Router);
    // const loginService = inject(LoginService)

    const isAuthorized = (route: ActivatedRouteSnapshot): boolean => {
        // const role = loginService.currentUser().role
        const role = localStorage.getItem('role')
        const expectedRoles = route.data["expectedRoles"];
        if (expectedRoles.indexOf(role) !== -1) {
            return true;
        }
        router.navigateByUrl("espacepersonnel/accesinterdit");
        return false;
    };

    return isAuthorized(route);
};
