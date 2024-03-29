import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connexion',
  standalone: true,
  template: `
    <main>
      <div>
        <h2>Espace Privé</h2>
        <h3>(Réservé à la direction, aux vétérinaires et aux employés)</h3>
      </div>

      <form class="signin-form" action="">
        <p>Connexion</p>
        <div>
          <label for="email">Email :</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label for="password">Mot de passe :</label>
          <input type="password" id="password" name="password" />
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
  styles: `
    header {
    background-image: url('/images/accueil.jpg');
}

.signin-form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    align-items: center;
    align-content: center;
    margin: auto;
    border: 0.3rem solid var(--color-font);
    border-radius: 20px ;
    padding: 2rem;
    
}

.signin-form > * {
    padding: 0.5rem;
}

.signin-form p {
    margin: 0;
    text-decoration: underline;
    font-weight: bold;
}

.signin-form input {
    width: 100%;
    border-radius: 5px;
}

.signin-form button {
    margin-top: 1rem;
    border-radius: 15px;
    background-color: var(--color-primary);
    color: var(--color-background);
    font-family: var(--font-family-title);
    padding: 0.5rem 1rem;
    transform: translateX(50%);
}

button:hover {
    background-color: var(--color-call-to-action);
    color: var(--color-font);
  }

.password-forgot {
    display: flex;
    justify-content: center;
    font-size: var(--font-size-footer);
    transform: translateX(5%);
}

#password-forgot-link,
#contact-link {
    
    color: var(--color-font);
    padding: 0.5rem;
    text-shadow: none;
}

h3 {
    margin-bottom: 3rem;
}
    `,
})
export class ConnexionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
