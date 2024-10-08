import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { authInterceptor } from './shared/interceptors/auth.interceptor'
import { errorInterceptor } from './shared/interceptors/error.interceptor'
import { LoginService } from './shared/services/login.service'

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimationsAsync(),
        provideHttpClient(
            withInterceptors([authInterceptor, errorInterceptor])
        ),
    ],
}
