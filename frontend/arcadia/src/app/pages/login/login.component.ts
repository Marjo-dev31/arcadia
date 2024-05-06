import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserLogin } from '../../shared/models/user.interface';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from './service/login.service';


@Component({
  selector: 'app-connexion',
  imports: [FormsModule, RouterLink],
  standalone: true,
  template: `
    <main>
      <div>
        <h2>Espace Privé</h2>
        <h3>(Réservé à la direction, aux vétérinaires et aux employés)</h3>
      </div>

      <form class="login-form" name="loginForm" #form="ngForm" (ngSubmit)="onSubmit()">
        <p>Connexion</p>
        <div>
          <label for="email" >Email :</label>
          <input type="email" id="email" name="email" [(ngModel)]="user.email"/>
        </div>
        <div>
          <label for="password">Mot de passe :</label>
          <input type="password" id="password" name="password" [(ngModel)]="user.password"/>
        </div>
        <button>Se connecter</button>
      </form>
      <div class="password-forgot">
        <a href="" id="password-forgot-link">Mot de passe oublié ?</a>
      </div>
      <div>
        <h3>
          Pour toutes questions, rendez-vous
          <a [routerLink]="['/contact']" id="contact-link">ici</a>
        </h3>
      </div>
    </main>
  `,
  styleUrl: `./login.component.css`,
})
export class ConnexionComponent implements OnInit {
  constructor() {}

  private loginService = inject(LoginService)
  private readonly router = inject(Router)

  user: UserLogin = {
    email: '',
    password: '',
  }


  ngOnInit() {}

  onSubmit(): void {
   this.loginService.login(this.user).subscribe(()=> {
    this.router.navigate(['/espacepersonnel'])
   });
   this.user.email='';
   this.user.password='';
  }

}
