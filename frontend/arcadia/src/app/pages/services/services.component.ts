import { Component, OnInit, inject } from '@angular/core';
import { ServiceService } from './service/service.service';
import { JsonPipe } from '@angular/common';
import { Service } from '../../shared/models/service.interface';

@Component({
  selector: 'app-services',
  imports: [JsonPipe],
  standalone: true,
  template: `
    <main>
      <section>
        <h2>
          Nous vous proposons une multitude de services afin de rendre votre
          séjour plus agréable !
        </h2>
        <div class="schedule">
          <p>Nous vous accueillons du Lundi au Dimanche</p>
          <p>De 9h00 à 19h00</p>
          <p>
            Tous les jours de l'année
            <span id="exception">(sauf cas exceptionnel)</span>
          </p>
        </div>
      </section>
      <section class="services">
        @for (service of services; track service) {
        <div class="service-item" >
          <img
            class="service-img"
            [src]= "'http://localhost:8000/upload/' + service.image_url"
            alt="photo representative du service"
          />
          <div class="service-content" >
            <h3 >{{service.title}}</h3>
            <p>{{service.description}}</p>
          </div>
        </div>}
      </section>
    </main>
  `,
  styles: `
.schedule p {
    font-family: var(--font-family-title);
    font-size: var(--font-size-h3);
    text-align: center;
    margin: 0;
}

.services {
    width: 100%;
    background-color: var(--color-secondary);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-top: 2rem;
    margin-bottom: 8rem;
}

.service-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    min-height: 500px;
    margin-top: 4rem;
    margin-bottom: 4rem;
    background-color: var(--color-primary);
    color: var(--color-background);
    border-radius: 50% 20% / 10% 40%;
    overflow: hidden;
}

.service-img {
    max-width : 100%;
    object-fit: contain; 
}

.service-content p {
    text-align: justify;
    padding: 0 2rem;
}

#exception {
    font-size: var(--font-size-footer);
    font-style: italic;
}
  `
})
export class ServicesComponent implements OnInit {
  services!:Service[]
  private readonly serviceService = inject(ServiceService);
  
  
  ngOnInit() {
    this.serviceService.getServices().then(response => {
      this.services = response
  })
  }
}
