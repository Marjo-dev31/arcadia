import { Component, OnInit, inject } from '@angular/core';
import { HabitatsService } from './services/habitat.service';
import { AnimalService } from './services/animal.service';
import { Habitats } from '../../shared/models';

@Component({
  selector: 'app-habitats',
  standalone: true,
  template: `
    <main>
      <h2>
        Au sein des vastes étendues d'Arcadia, découvrez des habitats conçus
        pour le bien-être de nos animaux.
      </h2>
      <section class="habitats">
        @for (habitat of habitats; track habitat) {
        <div class="habitat-item" (click)="toggleDetails(habitat.id)">
          <img [src]="habitat.image" alt="" class="habitat-img" />
          <div class="habitat-content">
            <h3>{{habitat.title }}</h3>
            @if (showDetails == habitat.id) {
            <p>{{ habitat.description}}</p>
            <ul>
              @for (animal of habitat.animals; track animal) {
              <li>{{ animal.firstname }}</li>
              }
            </ul>
            }
          </div>
        </div>
        }
        <!-- @for (animal of animals; track animal) {
        <div class="id-card-animal">
          <img src="assets/images/tigre.jpg" alt="" />

          <div class="id-card-animal-content">
            <p>{{ animal.name }}</p>
            <p>{{ animal.race }}</p>
            <div>
              <p>{{ animal.condition }}</p>
              @if(animal.rapport) {
              <p>{{ animal.rapport }}</p>
              }
            </div>
          </div>
        </div>
        } -->
      </section>
    </main>
  `,
  styleUrl: `./habitat.component.css`,
})
export class HabitatsComponent implements OnInit {
  habitats!: Habitats [];
  private readonly habitatService = inject(HabitatsService);

  // animals: any;
  // private readonly animalsService = inject(AnimalService);

  showDetails :number | undefined = undefined

 

  ngOnInit() {
    this.habitatService.getHabitats().then((response) => {
      this.habitats = response;

    });

    // this.animalsService.getAnimals().then((response) => {
    //   this.animals = response;
    // });
  }
  toggleDetails(id: number) {
    console.log(id)
   this.showDetails = id
  }
}
