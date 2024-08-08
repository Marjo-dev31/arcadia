import { Component, DestroyRef, inject } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { UserCreate, Role } from "../../../../../shared/models";
import { AsyncPipe, CommonModule } from "@angular/common";
import { RoleService } from "../../../../../shared/services/role.service";
import { UserService } from "../../../../../shared/services/user.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Observable } from "rxjs";

@Component({
    selector: "app-account-handled",
    standalone: true,
    imports: [FormsModule, CommonModule, AsyncPipe],
    template: `
        <h3>Création de compte</h3>
        <div>
            <form
                class="account-creation-form"
                #form="ngForm"
                name="accountcreationform"
                (ngSubmit)="onSubmit(form)"
            >
                <label for="email-addaccount-form">Email/Identifiant :</label>
                <input
                    type="email"
                    name="email"
                    id="email-addaccount-form"
                    [(ngModel)]="newUser.email"
                    #email="ngModel"
                    email
                    required
                />
                @if(email.invalid && email.touched){
                <div class="alert">Un email est requis</div>
                }
                <label for="lastname-addaccount-form">Nom :</label>
                <input
                    type="text"
                    name="lastname"
                    id="lastname-addaccount-form"
                    [(ngModel)]="newUser.lastname"
                    #lastname="ngModel"
                    required
                />
                @if(lastname.invalid && lastname.touched){
                <p class="alert">Un nom est requis</p>
                }
                <label for="firstname-addaccount-form">Prénom :</label>
                <input
                    type="text"
                    name="firstname"
                    id="firstname-addaccount-form"
                    [(ngModel)]="newUser.firstname"
                    #firstname="ngModel"
                    required
                />
                @if(firstname.invalid && firstname.touched) {
                <p class="alert">Un prénom est requis</p>
                }
                <label for="role-addaccount-form">Rôle :</label>
                <select
                    name="role"
                    id="role-addaccount-form"
                    [(ngModel)]="newUser.id_role"
                    #role="ngModel"
                    required
                >
                @for(role of roles$ | async ; track role) {
                    <option [ngValue]="role.id">
                        {{ role.name }}
                    </option>
                }
                </select>
                @if(role.invalid && role.touched){
                <p class="alert">Un rôle est requis</p>
                }
                <label for="password-addaccount-form">Mot de passe :</label>
                <input
                    type="password"
                    name="password"
                    id="password-addaccount-form"
                    [(ngModel)]="newUser.password"
                    #password="ngModel"
                    required
                    pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                />
                @if(password.invalid && (password.dirty || password.touched)){
                @if(password.errors?.['required']){
                <p class="alert">Un mot de passe est requis</p>
                } @if(password.errors?.['pattern']){
                <p class="alert">
                    Le mot de passe doit contenir au moins 8 caractères dont une
                    majuscule, une minuscule, un chiffre et un caractère spécial
                </p>
                } }
                <label for="confirm-password-addaccount-form"
                    >Confirmer mot de passe :</label
                >
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirm-password-addaccount-form"
                    ngModel
                    #confirmPassword="ngModel"
                    required
                    pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                />
                @if(confirmPassword.touched){
                @if(confirmPassword.errors?.['required']){
                <p class="alert">
                    Une confirmation du mot de passe est requise
                </p>
                } @if(password.value !== confirmPassword.value) {
                <p class="alert">
                    Le mot de passe ne correspond pas à la confirmation de mot
                    de passe.
                </p>
                } }
                <div class="btn-section">
                    <button type="reset" class="btn">Annuler</button>
                    <button class="btn" [disabled]="form.invalid">
                        Valider
                    </button>
                </div>
            </form>
        </div>
        <p class="alert" id="alert-account-created">Le compte a été créé</p>
        <p class="alert" id="alert-account-already-exist">
            Un compte existe déjà avec cet email
        </p>
    `,
    styleUrl: `../../component-handled.component.css`,
})
export class AccountHandledComponent {
    private readonly roleService = inject(RoleService);
    private readonly userService = inject(UserService);
    private readonly destroyRef = inject(DestroyRef);

    roles$: Observable<Role[]> = this.roleService.getRolesWithoutAdmin();

    newUser: UserCreate = {
        email: "",
        lastname: "",
        firstname: "",
        password: "",
        id_role: "",
    };

    onSubmit(form: NgForm) {
        const alertOk = document.getElementById("alert-account-created");
        const alertNotOk = document.getElementById(
            "alert-account-already-exist"
        );
        if (alertOk && alertNotOk && form.submitted) {
            this.userService
                .addUser(this.newUser)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((response) => {
                    response.data
                        ? ((alertOk.style.display = "block"), form.reset())
                        : (alertNotOk.style.display = "block");
                });
        }
    }
}
