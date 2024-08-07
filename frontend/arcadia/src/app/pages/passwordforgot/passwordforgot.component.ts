import { Component, DestroyRef, inject } from "@angular/core";
import { MailService } from "../../shared/services/mail.service";
import { FormsModule, NgForm } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: "app-passwordforgot",
    standalone: true,
    imports: [FormsModule],
    template: `
        <h3>Mot de passe oublié ?</h3>
        <form (ngSubmit)="onSubmit(form)" #form="ngForm">
            <label for="emailToNewPassword">Votre email de connexion :</label>
            <input
                type="email"
                id="emailtoNewPassword"
                [(ngModel)]="email"
                name="emailToNewPassword"
                #emailToNewPassword="ngModel"
                required
            />
            @if (emailToNewPassword.invalid && emailToNewPassword.touched) {
            <p class="alert">Un email est obligatoire</p>
            }
            <button [disabled]="form.invalid">Envoyer</button>
            @if (form.submitted) {
            <p class="alert">Un email a été envoyé !</p>
            }
        </form>
    `,
    styles: `
    p {
        text-align: center
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 300px;
        margin : auto;   
    }

    form > * {
       margin: 0.5rem
    }
    `,
})
export class PasswordForgotComponent {
    email: string = "";

    private readonly mailService = inject(MailService);
    private readonly destroyRef = inject(DestroyRef);

    onSubmit(form: NgForm) {
        this.mailService
            .sendEmailForNewPassword(this.email)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
        form.reset();
    }
}
