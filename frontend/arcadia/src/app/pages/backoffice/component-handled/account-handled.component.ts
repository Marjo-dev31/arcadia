import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../shared/models/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-handled',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <h3>Création de compte</h3>
    <div>
      <form
        class="account-creation-form"
        #form="ngForm"
        name="accountcreationform"
        (ngSubmit)="onSubmit()"
      >
        <label for="email">Email/Identifiant :</label>
        <input
          type="email"
          name="email"
          id="email"
          [(ngModel)]="user.email"
          #email="ngModel"
        />
        <label for="lastname">Nom :</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          [(ngModel)]="user.lastname"
          #lastname="ngModel"
        />
        <label for="firstname">Prénom :</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          [(ngModel)]="user.firstname"
          #firstname="ngModel"
        />

        <label for="role">Rôle :</label>
        <select name="role" id="role" [(ngModel)]= "selectedRoleOption">
          <option *ngFor="let role of roles" [ngValue]="role.id">{{ role.name }}</option>
        </select>

        <label for="password">Mot de passe :</label>
        <input
          type="password"
          name="password"
          id="password"
          [(ngModel)]="user.password"
          #password="ngModel"
        />
        <label for="comfirm-password">Confirmer mot de passe :</label>
        <input type="password" name="comfirm-password" id="comfirm-password" />

        <div class="btn-section">
          <button class="btn">Annuler</button>
          <button class="btn">Valider</button>
        </div>
      </form>
    </div>
  `,
  styleUrl: `./component-handled.component.css`,
})
export class AccountHandledComponent implements OnInit {
  constructor() {}

  selectedRoleOption!: string;

  user: User = {
    email: '',
    lastname: '',
    firstname: '',
    password: '',
    role: '',
  };

  roles = [
    { 
        id: 1, 
        name: 'veterinaire' }, 
    {
        id: 2,
        name: 'employé'
    }
];

  ngOnInit() {}

  onSubmit() {
    this.user.role = this.selectedRoleOption
    console.log(this.user);
    console.log(this.roles)
  }
}
