import { Component, OnInit, inject } from '@angular/core';
import { HabitatsService } from './services/habitat.service';
import { AnimalService } from './services/animal.service';

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
        <div class="habitat-item">
          <img src={{habitat.image}} alt="" class="habitat-img" />
          <div class="habitat-content">
            <h3>{{ habitat.title }}</h3>
            <div>
              <p>{{ habitat.description }}</p>
              <ul>
                @for (animal of animals; track animal) {
                <li>{{ animal.name }}</li>
                }
              </ul>
            </div>
          </div>
        </div>
        } @for (animal of animals; track animal) {
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
        }
      </section>
    </main>
  `,
  styles: `
  /* style habitat card */

.habitats {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  margin: auto;
}

.habitat-item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(70, 46, 1, 0.2);
  margin: 4rem 0;
}

.habitat-img {
  max-width: 325px;
  height: auto;
  object-fit: cover;
  object-position: right;
}

.habitat-content {
  display: flex;
  flex-direction: column;
  text-align: justify;
  max-width: 325px;
  overflow: hidden;
}

.habitat-content > * {
  margin: 0;
  padding: 0.5rem;
}

/* style ID card animal */

.id-card-animal {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background-color: var(--color-primary);
    color: var(--color-background);
    width: 100%;
    margin-bottom: 4rem;
    padding: 2rem;
}

.id-card-animal>* {
  max-width: 400px;
}

.id-card-animal img {
    clip-path: circle();
    overflow: hidden;
    
}

.id-card-animal-content>* {
    text-align: center;
}

/* responsive */

@media screen and (max-width:700px ){
    .habitat-item {
        width: 325px;
    }
}
  `,
})
export class HabitatsComponent implements OnInit {
  habitats: any;
  private readonly habitatService = inject(HabitatsService);

  animals: any;
  private readonly animalsService = inject(AnimalService);

  ngOnInit() {
    this.habitatService.getHabitats().then((response) => {
      this.habitats = response;
    });

    this.animalsService.getAnimals().then((response) => {
      this.animals = response;
    });
  }
}
