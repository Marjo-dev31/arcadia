import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'

export const AuthGuard: CanActivateFn = () => {
    const router = inject(Router)
    const accesToken = localStorage.getItem('accessToken')

    if (accesToken) {
        return true
    }
    router.navigateByUrl('/connexion')
    return false
}
