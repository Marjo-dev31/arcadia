import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User, UserCreate } from '../../../../shared/models/user.interface';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../../connection/service/role.service';
import { Role } from '../../../../shared/models/role.interface';
import { UserService } from '../../../connection/service/user.service';

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
        (ngSubmit)="onSubmit(form)"
      >
        <label for="email">Email/Identifiant :</label>
        <input
          type="email"
          name="email"
          id="email"
          [(ngModel)]="newUser.email"
          #email="ngModel"
        />
        <label for="lastname">Nom :</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          [(ngModel)]="newUser.lastname"
          #lastname="ngModel"
        />
        <label for="firstname">Prénom :</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          [(ngModel)]="newUser.firstname"
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
          [(ngModel)]="newUser.password"
          #password="ngModel"
        />
        <label for="comfirm-password">Confirmer mot de passe :</label>
        <input type="password" name="comfirm-password" id="comfirm-password" />

        <div class="btn-section">
          <button type="reset" class="btn">Annuler</button>
          <button class="btn">Valider</button>
        </div>
      </form>
    </div>
  `,
  styleUrl: `../component-handled.component.css`,
})
export class AccountHandledComponent implements OnInit {
  constructor() {}

  private roleService = inject(RoleService);
  private userService = inject(UserService);

  selectedRoleOption!: string;
  roles: Role[] = []

  newUser: UserCreate = {
    email: '',
    lastname: '',
    firstname: '',
    password: '',
    id_role: '',
  };



  ngOnInit() {
    this.getRolesWithoutAdmin();
  }

  getRolesWithoutAdmin() {
    this.roleService.getRolesWithoutAdmin().subscribe((response)=>{
      this.roles = response.data.roles
    })
  }

  onSubmit(form: NgForm) {
    this.newUser.id_role = this.selectedRoleOption;
    console.log(this.newUser)
    this.userService.addUser(this.newUser).subscribe();
    form.reset()
  }
}
