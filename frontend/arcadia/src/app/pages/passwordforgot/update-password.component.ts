import { Component, DestroyRef, OnInit, inject } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { UserLogin } from "../../shared/models/user.interface";
import { UserService } from "../login/service/user.service";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: "app-update-password",
    standalone: true,
    imports: [FormsModule],
    template: `
        <h3>Changer mon mot de passe ?</h3>
        <form #form="ngForm" (ngSubmit)="onSubmit(form)">
            <label for="emailForNewPassword">Email :</label>
            <input
                type="email"
                id="emailForNewPassword"
                name="emailForNewPassword"
                #emailForNewPassword="ngModel"
                [(ngModel)]="user.email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
                required
            />
            @if (emailForNewPassword.invalid && emailForNewPassword.touched) {
            <p class="alert">Un email est obligatoire</p>
            }
            <label for="newPassword">Nouveau mot de passe :</label>
            <input
                type="password"
                id="newPassword"
                name="newPassword"
                #newPassword="ngModel"
                [(ngModel)]="user.password"
                pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                required
            />
            @if (newPassword.invalid && newPassword.touched) { @if
            (newPassword.errors?.['required']) {
            <p class="alert">Un nouveau mot de passe est obligatoire</p>
            } @if (newPassword.errors?.['pattern']) {
            <p class="alert">
                Le mot de passe doit contenir au moins 8 caractères dont une
                majuscule, une minuscule, un chiffre et un caractère spécial
            </p>
            } }
            <button [disabled]="form.invalid">Envoyer</button>
            @if (form.submitted) {
            <p class="alert">Le mot de passe a été changé !</p>
            }
        </form>
    `,
    styles: `
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 300px;
        margin : auto;   
    }

    form > * {
       margin: 0.5rem
    }`,
})
export class UpdatePasswordComponent implements OnInit {
    private readonly router = inject(Router);
    private readonly destroyRef = inject(DestroyRef);
    private readonly userService = inject(UserService);

    user: UserLogin = {
        email: "",
        password: "",
    };

    ngOnInit() {
        this.setToken();
    }

    setToken() {
        const urlSplit = this.router.url.split("/");
        const token = urlSplit[2];
        localStorage.setItem("accessToken", token);
    }

    onSubmit(form: NgForm) {
        this.userService
            .updatePassword(this.user)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
        form.reset();
    }
}
