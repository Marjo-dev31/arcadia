import { Component, DestroyRef, inject, signal } from "@angular/core";
import { MailService } from "../../shared/services/mail.service";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: "app-contact",
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `
        <main>
            <div>
                <h1 class="title">{{ title }}</h1>
                <h2>Vous avez des questions ? Des suggestions ?</h2>
                <h3>Contactez-nous</h3>
            </div>
            <form
                class="contact-form"
                [formGroup]="contactForm"
                id="contactForm"
                (ngSubmit)="onSubmit()"
            >
                @if(submitted()){
                <p class="alert">Demande de contact envoyé !</p>
                }
                <input
                    type="text"
                    placeholder="Titre"
                    formControlName="title"
                />
                @if(contactForm.controls['title'].invalid &&
                contactForm.controls['title'].touched){
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
                @if(contactForm.controls['text'].invalid &&
                contactForm.controls['text'].touched){
                <p class="alert">Un message est requis</p>
                }
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    formControlName="emailToResponse"
                />
                @if(contactForm.controls['emailToResponse'].invalid &&
                contactForm.controls['emailToResponse'].touched){
                <p class="alert">Une adresse mail est requise</p>
                }
                <button [disabled]="contactForm.invalid">Envoyer</button>
            </form>
        </main>
    `,
    styleUrls: [`./contact.component.css`],
})
export class ContactComponent {
    private readonly fb = inject(FormBuilder);
    private readonly route = inject(ActivatedRoute);
    private readonly mailService = inject(MailService);
    private readonly destroyRef = inject(DestroyRef);

    title: string = this.route.snapshot.data["title"];

    contactForm: FormGroup = this.fb.group({
        title: new FormControl("", [Validators.required]),
        text: new FormControl("", [Validators.required]),
        emailToResponse: new FormControl("", [
            Validators.required,
            Validators.email,
        ]),
    });

    submitted = signal(false);

    onSubmit() {
        this.mailService
            .sendEmail(this.contactForm.value)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
        this.submitted.set(true);
        this.contactForm.reset();
    }
}
