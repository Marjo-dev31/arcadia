import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ServiceService } from './service/service.service';
import { JsonPipe, TitleCasePipe } from '@angular/common';
import { Service } from '../../shared/models/service.interface';
import { Opening } from '../../shared/models/opening.interface';
import { OpeningService } from './service/opening.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-services',
  imports: [JsonPipe, TitleCasePipe],
  standalone: true,
  template: `
    <main>
      <section>
        <h1 class="title">{{title}}</h1>
        <h2>
          Nous vous proposons une multitude de services afin de rendre votre
          séjour plus agréable !
        </h2>
        <div class="schedule">
          <p>Nous vous accueillons</p>
          @if(openToPublic && openToPublic.length){
          <p> du {{ openToPublic[0].openingDay }} au {{ openToPublic[0].closingDay }}</p>
          <p>De {{ openToPublic[0].openingTime }} à {{ openToPublic[0].closingTime }}</p>
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
              [src]= "this.url + service.image_url"
              alt="photo representative du service {{service.title}}"
            />
            <div class="service-content" >
              <h3 >{{service.title | titlecase}}</h3>
              <p>{{service.description}}</p>
            </div>
          </div>
        }  
      } @else {
        <h3 class="no-services">Il n'y a pas de service disponible</h3>
      }
      </section>
    </main>
  `,
  styleUrls: [`./services.component.css`]
})
export class ServicesComponent implements OnInit {
  
  title: string;
  services!: Service[];
  openToPublic!: Opening [];
  url = `${environment.serverUrl}/upload/`;


  constructor(route: ActivatedRoute){
    this.title = route.snapshot.data['title']
  }
  
  private readonly serviceService = inject(ServiceService);
  private readonly openingService = inject(OpeningService);
  private readonly destroyRef = inject(DestroyRef);

  
  
  ngOnInit() {
    this.getServices()
    this.getOpeningToPublic()
  }
 
  getServices() {
    this.serviceService.getServices().then(response => {
      this.services = response
      }
     )}

  getOpeningToPublic(){
    this.openingService.getOpeningToPublic().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((response)=>{
      this.openToPublic = response
    })
  };

 }