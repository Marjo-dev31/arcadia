import { Component, OnInit, ViewChild, inject } from '@angular/core';
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
          required
        />
        @if(email.invalid && (email.dirty || email.touched)){
          @if(email.errors?.['required']){
            <div class="alert">Un email est requis</div>
          }}
        <label for="lastname">Nom :</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          [(ngModel)]="newUser.lastname"
          #lastname="ngModel"
          required
        />
        @if(lastname.invalid && (lastname.dirty || lastname.touched)){
          @if(lastname.errors?.['required']){
            <div class="alert">Un nom est requis</div>
          }}
        <label for="firstname">Prénom :</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          [(ngModel)]="newUser.firstname"
          #firstname="ngModel"
          required
        />
        @if(firstname.invalid && (firstname.dirty || firstname.touched)){
          @if(firstname.errors?.['required']){
            <div class="alert">Un prénom est requis</div>
          }}
        <label for="role">Rôle :</label>
        <select name="role" id="role" [(ngModel)]= "selectedRoleOption" #role="ngModel" required>
          <option *ngFor="let role of roles" [ngValue]="role.id" >{{ role.name }}</option>
        </select>
        @if(role.invalid && (role.dirty || firstname.touched)){
          @if(role.errors?.['required']){
            <div class="alert">Un rôle est requis</div>
          }}
        <label for="password">Mot de passe :</label>
        <input
          type="password"
          name="password"
          id="password"
          [(ngModel)]="newUser.password"
          #password="ngModel"
          required
          minlength="8"
        />
        @if(password.invalid && (password.dirty || password.touched)){
          @if(password.errors?.['required']){
            <div class="alert">Un mot de passe est requis</div>
          }
          @else if(password.errors?.['minlength']){
            <div class="alert">Le mot de passe doit contenir au moins 8 caractères</div>
          }
          @else {
            <div class="alert">Une erreur est survenue, vérifiez votre saisie</div>
          }
        }
        <label for="comfirm-password">Confirmer mot de passe :</label>
        <input type="password" name="comfirm-password" id="comfirm-password" required/>

        <div class="btn-section">
          <button type="reset" class="btn">Annuler</button>
          <button class="btn">Valider</button>
        </div>
      </form>
    </div>
    <div  class="alert-form" id="alert" [ngStyle]="{display: 'none'}">Une erreur est survenue, vérifiez votre saisie.</div>
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

  @ViewChild('form') form!: NgForm;

  ngOnInit() {
    this.getRolesWithoutAdmin();
  }

  getRolesWithoutAdmin() {
    this.roleService.getRolesWithoutAdmin().subscribe((response)=>{
      this.roles = response.data.roles
    })
  }

  onSubmit(form: NgForm) {
    const alert = document.getElementById('alert');
      if(this.form.invalid && alert) {
        console.log(this.form.errors)
        alert.style.display = "block"
      } else {
        this.newUser.id_role = this.selectedRoleOption;
        this.userService.addUser(this.newUser).subscribe();
        form.reset()
    }
  }
}
