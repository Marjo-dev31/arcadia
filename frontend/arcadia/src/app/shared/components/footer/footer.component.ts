import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OpeningService } from '../../../pages/services/service/opening.service';
import { Opening } from '../../models/opening.interface';


@Component({
  selector: 'app-footer',
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
          @if(openToPublic && openToPublic.length){
          <p>De {{ openToPublic[0].openingTime }} à {{ openToPublic[0].closingTime }}</p>
          <p>Du {{ openToPublic[0].openingDay }} au {{ openToPublic[0].closingDay }}</p>
        }
        </div>
        <div><a [routerLink]="['/contact']">Nous contacter</a></div>
      </div>
      <div id="copyright">copyright2024</div>
    </footer>
  `,
  styles: `
      footer {
    background-color: var(--color-primary);
    color: var(--color-background);
    font-size: var(--font-size-footer);
  }
  
  footer p {
    margin: 0;
    text-align: center;
  }
  
  .contact {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    align-items: center;
    justify-items: center;
    padding: 1.5rem 1rem;
  }
  
  #copyright {
    text-align: center;
  }
    `,
})
export class FooterComponent implements OnInit {
  constructor() {}

  private readonly openingService = inject(OpeningService)

  openToPublic!: Opening []

  ngOnInit() {
    this.getOpeningToPublic()
  }

  getOpeningToPublic(){
    this.openingService.getOpeningToPublic().subscribe((response)=>{
      this.openToPublic = response
    })
  };

}
