import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-passwordforgot',
    template: `
    <h3>Mot de passe oublié ?</h3>
    <p>Le mot de passe a été choisi par José, retournez le voir !!!</p>
    `,
    styles: `
    p {
        text-align: center
    }
    `
})

export class PasswordForgotComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}