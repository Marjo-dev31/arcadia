import { Component, OnInit, inject } from '@angular/core';
import { MailService } from './services/mail.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <main>
      <div>
        <h2>Vous avez des questions ? Des suggestions ?</h2>
        <h3>Contactez-nous</h3>
      </div>

      <form class="contact-form" [formGroup]="contactForm" (ngSubmit)="onSubmit()" >
        <input type="text" placeholder="Titre"  formControlName="title"/>
        @if(contactForm.controls['title'].invalid && contactForm.controls['title'].touched){
          <p class="alert">Un titre est requis</p>
        }
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="10"
          placeholder="Votre message..."
          formControlName="text"
        ></textarea>
        @if(contactForm.controls['text'].invalid && contactForm.controls['text'].touched){
          <p class="alert">Un message est requis</p>
        }
        <input type="email" id="email" name="email" placeholder="Email" formControlName="emailToResponse"/>
        @if(contactForm.controls['emailToResponse'].invalid && contactForm.controls['emailToResponse'].touched){
          <p class="alert">Une adresse mail est requise</p>
        }
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

.contact-form input,
.contact-form textarea {
  margin: 1rem;
  border: none;
  border-bottom: 2px solid var(--color-font);
  width: 100%;
  padding: 0 0.5rem;
  background-color: rgba(70, 46, 1, 0);
}

.contact-form input {
    height: 50px;
}

::placeholder {
  font-family: var(--font-family-content);
  color: var(--color-font);
  transform: translateY(100%);
}

  `,
})
export class ContactComponent implements OnInit {

  public contactForm: FormGroup

  constructor(public fb:FormBuilder) {
    this.contactForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      emailToResponse: new FormControl('', [Validators.required])
    })
  }

  private readonly mailService = inject(MailService)



  ngOnInit() {}

onSubmit(){
  this.mailService.sendEmail(this.contactForm.value).subscribe();
}

}
