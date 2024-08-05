import { Component, inject} from '@angular/core';
import { MailService } from '../contact/services/mail.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
    selector: 'app-passwordforgot',
    standalone: true,
    imports: [FormsModule],
    template: `
    <h3>Mot de passe oublié ?</h3>
    <form (ngSubmit)="onSubmit(form)" #form="ngForm">
        <label for="emailToNewPassword">Votre email de connexion :</label>
        <input type="email" id="emailtoNewPassword" [(ngModel)]="email" name="emailToNewPassword" #emailToNewPassword="ngModel" required>
        @if (emailToNewPassword.invalid && emailToNewPassword.touched) {
            <p class="alert">Un email est obligatoire</p>
        }
        <button [disabled]="form.invalid">Envoyer</button>
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
    `
})

export class PasswordForgotComponent {
    constructor() { }

    email: string = ''

    private readonly mailService = inject(MailService)

    onSubmit(form: NgForm) {
        this.mailService.sendEmailToNewPassword(this.email).subscribe();
        form.reset()
    }

}