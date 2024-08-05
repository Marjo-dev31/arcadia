import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-update-password',
    standalone: true,
    imports: [FormsModule],
    template: `
    <h3>Changer mon mot de passe ?</h3>
    <form #form="ngForm" (ngSubmit)="onSubmit()">
        <label for="newPassword"  >Nouveau mot de passe :</label>
        <input type="password" id="newPassword" name="newPassword" #newPassword="ngModel" [(ngModel)]="newPasswordToSent" required>
        <button>Envoyer</button>
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
    }`
})

export class UpdatePasswordComponent {

newPasswordToSent! : string

onSubmit(){}

}