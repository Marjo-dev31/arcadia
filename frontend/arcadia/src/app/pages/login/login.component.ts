import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserConnect } from '../../shared/models/user.interface';

@Component({
  selector: 'app-connexion',
  imports: [FormsModule],
  standalone: true,
  template: `
    <main>
      <div>
        <h2>Espace Privé</h2>
        <h3>(Réservé à la direction, aux vétérinaires et aux employés)</h3>
      </div>

      <form class="signin-form" name="form-conection" #form="ngForm" (ngSubmit)="onSubmit()">
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
          <a href="" id="contact-link">ici</a>
        </h3>
      </div>
    </main>
  `,
  styleUrl: `./login.component.css`,
})
export class ConnexionComponent implements OnInit {
  constructor() {}

  user: UserConnect = {
    email: '',
    password: '',
    role: ''
  }



  ngOnInit() {}

  onSubmit(): void {
    console.log(this.user)

  }
}
