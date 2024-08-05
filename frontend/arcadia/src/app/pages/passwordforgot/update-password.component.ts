import { Component, OnInit, inject } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { UserLogin } from "../../shared/models/user.interface";
import { UserService } from "../login/service/user.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-update-password',
    standalone: true,
    imports: [FormsModule],
    template: `
    <h3>Changer mon mot de passe ?</h3>
    <form #form="ngForm" (ngSubmit)="onSubmit(form)">
        <label for="emailForNewPassword">Email :</label>
        <input type="email" id="emailForNewPassword" name="emailForNewPassword" #emailForNewPassword="ngModel" [(ngModel)]="user.email" required>
        <label for="newPassword"  >Nouveau mot de passe :</label>
        <input type="password" id="newPassword" name="newPassword" #newPassword="ngModel" [(ngModel)]="user.password" required>
        <button [disabled]="form.invalid">Envoyer</button>
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

export class UpdatePasswordComponent implements OnInit{
    private route = inject(ActivatedRoute);
    private router = inject(Router)

user: UserLogin = {
    email: '',
    password: ''
}

private readonly userService = inject(UserService);

ngOnInit() {
    this.setToken()
}

setToken() {
    const urlSplit = this.router.url.split('/');
    const token = urlSplit[2]
    localStorage.setItem('accessToken', token)
}

onSubmit(form: NgForm){
    this.userService.updatePassword(this.user).subscribe();
    form.reset()
}

}