import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserCreate } from '../../../../shared/models/user.interface';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../../login/service/role.service';
import { Role } from '../../../../shared/models/role.interface';
import { UserService } from '../../../login/service/user.service';

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
          email
          required
        />
        @if(email.invalid && email.touched){
            <div class="alert">Un email est requis</div>
          }
        <label for="lastname">Nom :</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          [(ngModel)]="newUser.lastname"
          #lastname="ngModel"
          required
        />
        @if(lastname.invalid && lastname.touched){
            <p class="alert">Un nom est requis</p>
          }
        <label for="firstname">Prénom :</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          [(ngModel)]="newUser.firstname"
          #firstname="ngModel"
          required
        />
        @if(firstname.invalid && firstname.touched) {
            <p class="alert">Un prénom est requis</p>
          }
        <label for="role">Rôle :</label>
        <select name="role" id="role" [(ngModel)]= "newUser.id_role" #role="ngModel" required>
          <option *ngFor="let role of roles" [ngValue]="role.id" >{{ role.name }}</option>
        </select>
        @if(role.invalid && firstname.touched){

            <p class="alert">Un rôle est requis</p>
          }
        <label for="password">Mot de passe :</label>
        <input
          type="password"
          name="password"
          id="password"
          [(ngModel)]="newUser.password"
          #password="ngModel"
          required
          pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        />
        @if(password.invalid && (password.dirty || password.touched)){
          @if(password.errors?.['required']){
            <p class="alert">Un mot de passe est requis</p>
          }
          @if(password.errors?.['pattern']){
            <p class="alert">Le mot de passe doit contenir au moins 8 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial</p>
          }
        }
        <label for="confirmPassword">Confirmer mot de passe :</label>
        <input type="password" name="confirmPassword" id="confirm-password" ngModel #confirmPassword="ngModel" required pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"/>
        @if(confirmPassword.touched){
          @if(confirmPassword.errors?.['required']){
            <p class="alert">Une confirmation du mot de passe est requise</p>
          }
          @if(password.value !== confirmPassword.value) {
            <p class="alert">Le mot de passe ne correspond pas à la confirmation de mot de passe.</p>
          }
        }
        <div class="btn-section">
          <button type="reset" class="btn" >Annuler</button>
          <button class="btn" [disabled]="form.invalid">Valider</button>
        </div>
      </form>
    </div>
    <div class="alert" id="alert">Le compte a été créé</div>
  `,
  styleUrl: `../component-handled.component.css`,
})
export class AccountHandledComponent implements OnInit {
  constructor() {}

  private roleService = inject(RoleService);
  private userService = inject(UserService);

  roles: Role[] = []

  newUser: UserCreate = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    id_role: '',
  };


  ngOnInit() {
    this.getRolesWithoutAdmin();
  }

  getRolesWithoutAdmin() {
    this.roleService.getRolesWithoutAdmin().subscribe((response)=>{
      this.roles = response
    })
  }

  onSubmit(form: NgForm) {
    const alert = document.getElementById('alert');
    if(alert && form.submitted){
        alert.style.display = "block";
        this.userService.addUser(this.newUser).subscribe();
        form.reset()
    }}

}
