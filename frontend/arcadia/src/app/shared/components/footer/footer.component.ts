import { Component, OnInit, inject, effect, DestroyRef } from "@angular/core";
import { RouterLink } from "@angular/router";
import { OpeningService } from "../../services/opening.service";
import { Opening } from "../../models";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: "app-footer",
    imports: [RouterLink],
    standalone: true,
    template: `
        <footer>
            <div class="contact">
                <div>
                    <p>Où nous trouver :</p>
                    <p>Arcadia Parc Zoologique</p>
                    <p>32 route de la fôret de Brocéliande</p>
                    <p>56001 Brocéliande Ville</p>
                </div>
                <div>
                    <p>Nos horaires et jours d'ouvertures :</p>
                    @if(openToPublic){
                    <p>
                        De {{ openToPublic.openingTime }} à
                        {{ openToPublic.closingTime }}
                    </p>
                    <p>
                        Du {{ openToPublic.openingDay }} au
                        {{ openToPublic.closingDay }}
                    </p>
                    }
                </div>
                <div class="footer-links">
                    <a [routerLink]="['/contact']">Nous contacter</a>
                    <a [routerLink]="['/politiquedeconfidentialite']"
                        >Notre politique de confidentialité</a
                    >
                </div>
            </div>
            <div id="copyright">by MB2024</div>
        </footer>
    `,
    styles: `
  footer {
    background: linear-gradient(
      180deg,
      var(--color-primary) 30%,
      var(--color-font)
      );
    color: var(--color-background);
    font-size: var(--font-size-footer);
  }
  
  footer p {
    margin: 0;
    text-align: center;
  }
  
  .contact {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12.5rem, 1fr));
    gap: 1rem;
    align-items: center;
    justify-items: center;
    padding: 1.5rem 1rem;
  }
  
  .footer-links {
    display: flex;
    flex-direction: column;
    align-items: center
  }

  #copyright {
    text-align: center;
  }
    `,
})
export class FooterComponent implements OnInit {
    constructor() {
        effect(() => {
            this.openToPublic = this.openingService.schedule();
        });
    }

    public readonly openingService = inject(OpeningService);
    private readonly destroyRef = inject(DestroyRef);

    openToPublic!: Opening;

    ngOnInit() {
        this.getOpeningToPublic();
    }

    getOpeningToPublic() {
        this.openingService
            .getOpeningToPublic()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => {
                this.openToPublic = response[0];
            });
    }
}
