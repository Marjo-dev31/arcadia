import { Component, OnInit, inject } from '@angular/core';
import { ServiceService } from './service/service.service';
import { JsonPipe } from '@angular/common';
import { Service } from '../../shared/models/service.interface';
import { Opening } from '../../shared/models/opening.interface';
import { OpeningService } from './service/opening.service';

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
          <p>Nous vous accueillons</p>
          @if(openToPublic){
          <p> du {{ openToPublic.openingDay }} au {{ openToPublic.closingDay }}</p>
          <p>De {{ openToPublic.openingTime }} à {{ openToPublic.closingTime }}</p>
          }<p>
            Tous les jours de l'année
            <span id="exception">(sauf cas exceptionnel)</span>
          </p>
        </div>
      </section>
      <section class="services">
        @if(services && services.length) {
        @for (service of services; track service) {
        <div class="service-item" >
          <img
            class="service-img"
            [src]= "'http://13.39.80.204:8000/upload/' + service.image_url"
            alt="photo representative du service"
          />
          <div class="service-content" >
            <h3 >{{service.title}}</h3>
            <p>{{service.description}}</p>
          </div>
        </div>
      }} @else {
        <h3>Il n'y a pas de service disponible</h3>
      }
      </section>
    </main>
  `,
  styleUrl: `./service.component.css`
})
export class ServicesComponent implements OnInit {
  services!: Service[]
  private readonly serviceService = inject(ServiceService);
  private readonly openingService = inject(OpeningService)

  openToPublic!: Opening
  
  
  ngOnInit() {
    this.getOpeningToPublic()
    this.getServices()
  }
 
  getServices() {
    this.serviceService.getServices().then(response => {
      this.services = response }
     )}

  getOpeningToPublic(){
    this.openingService.getOpeningToPublic().subscribe((response)=>{
      this.openToPublic = response[0]
    })
  };

 }