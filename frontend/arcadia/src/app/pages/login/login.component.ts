import { Component, DestroyRef, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { UserLogin } from '../../shared/models/user.interface'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { LoginService } from './service/login.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
    selector: 'app-connexion',
    imports: [FormsModule, RouterLink],
    standalone: true,
    template: `
        <main>
            <h1 class="title">{{ title }}</h1>
            <div>
                <h2>Espace Privé</h2>
                <h3>
                    (Réservé à la direction, aux vétérinaires et aux employés)
                </h3>
            </div>

            <form
                class="login-form"
                name="loginForm"
                id="loginForm"
                #form="ngForm"
                (ngSubmit)="onSubmit()"
            >
                <p>Connexion</p>
                @if(responseMessage === 'User doesn t exists'){
                <p class="alert">Utilisateur inconnu</p>
                } @if(responseMessage === 'Email and password does not match!'){
                <p class="alert">Email ou mot de passe incorrect</p>
                }
                <div>
                    <label for="email-login">Email :</label>
                    <input
                        type="email"
                        id="email-login"
                        name="email"
                        [(ngModel)]="user.email"
                        #email="ngModel"
                        email
                        required
                    />
                </div>
                @if(email.invalid && email.touched){
                <p class="alert">Un Email est requis</p>
                }
                <div>
                    <label for="password-login">Mot de passe :</label>
                    <input
                        type="password"
                        id="password-login"
                        name="password"
                        [(ngModel)]="user.password"
                        #password="ngModel"
                        required
                        minlength="8"
                    />
                </div>
                @if(password.invalid && password.touched){
                <p class="alert">Mot de passe invalide</p>
                }
                <button [disabled]="form.invalid">Se connecter</button>
                <div class="password-forgot">
                    <a [routerLink]="['/mdpoublie']" id="password-forgot-link"
                        >Mot de passe oublié ?</a
                    >
                </div>
            </form>

            <div>
                <h3>
                    Pour toutes questions, rendez-vous
                    <a [routerLink]="['/contact']" id="contact-link">ici</a>
                </h3>
            </div>
        </main>
    `,
    styleUrls: [`./login.component.css`],
})
export class LoginComponent {
    title: string
    constructor(route: ActivatedRoute) {
        this.title = route.snapshot.data['title']
    }

    private readonly loginService = inject(LoginService)
    private readonly router = inject(Router)
    private readonly destroyRef = inject(DestroyRef)

    user: UserLogin = {
        email: '',
        password: '',
    }

    responseMessage!: string

    onSubmit(): void {
        this.loginService
            .login(this.user)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => {
                if (response.data) {
                    localStorage.setItem(
                        'accessToken',
                        response.data.accessToken
                    )
                    localStorage.setItem('role', response.data.user.name)
                    localStorage.setItem(
                        'firstname',
                        response.data.user.firstname
                    )
                    this.router.navigate(['/espacepersonnel'])
                } else {
                    this.responseMessage = response.message
                }
            })
        this.user.email = ''
        this.user.password = ''
    }
}
