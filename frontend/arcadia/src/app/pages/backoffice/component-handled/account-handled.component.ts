import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-handled',
  standalone: true,
  imports: [],
  template: `
    <h3>Création de compte</h3>
    <div>
      <form class="account-creation-form" action="">
        
          <label for="email">Email/Identifiant :</label>
          <input type="email" />
          <label for="lastname">Nom :</label>
          <input type="text" />
          <label for="firstname">Prénom :</label>
          <input type="text" />

          <label for="role">Rôle :</label>
          <select name="roles" id="role">
            <option value="">Vétérinaire</option>
            <option value="">Employé</option>
          </select>

          <label for="password">Mot de passe :</label>
          <input type="password" />
          <label for="comfirm-password">Confirmer mot de passe :</label>
          <input type="password" />
        
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

  ngOnInit() {}
}
