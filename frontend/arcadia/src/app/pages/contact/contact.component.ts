import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <main>
      <div>
        <h2>Vous avez des questions ? Des suggestions ?</h2>
        <h3>Contactez-nous</h3>
      </div>

      <form class="contact-form" action="">
        <input type="text" id="password" name="password" placeholder="Titre" />

        <textarea
          name="message"
          id="message"
          cols="30"
          rows="10"
          placeholder="Votre message..."
        ></textarea>

        <input type="email" id="email" name="email" placeholder="Email" />

        <button>Envoyer</button>
      </form>
    </main>
  `,
  styles: `
  body {
  background-image: url("/images/feuilles\ volantes.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 30%;
}

.contact-form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  align-items: center;
  justify-content: center;
  margin: 20px auto 50px;
  padding: 2rem;
  background-color: rgba(70, 46, 1, 0.2);
  backdrop-filter: blur(2px);
}

.contact-form > * {
  margin: 1rem;
  border: none;
  border-bottom: 2px solid var(--color-font);
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 0 0.5rem;
  background-color: rgba(70, 46, 1, 0);
}

.contact-form input {
    height: 50px;
}

.contact-form button {
  background-color: var(--color-primary);
  color: var(--color-background);
  font-family: var(--font-family-title);
  width: 50%;
  padding: 0.5rem;
  border-radius: 15px;
}

button:hover {
  background-color: var(--color-call-to-action);
  color: var(--color-font);
}

::placeholder {
  font-family: var(--font-family-content);
  color: var(--color-font);
  transform: translateY(100%);
}

  `,
})
export class ContactComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
