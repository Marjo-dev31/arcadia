import { Component, OnInit, inject } from '@angular/core';
import { HabitatsService } from './services/habitat.service';
import { Animal, AnimalOnMongo, Habitat } from '../../shared/models';
import { AnimalsComponent } from '../animals/animals.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AnimalService } from '../animals/services/animal.service';
import { ClickService } from '../animals/services/click.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-habitats',
  standalone: true,
  imports: [MatDialogModule],
  template: `
    <main>
      <h1 class="title">{{title}}</h1>
      <h2>
        Au sein des vastes étendues d'Arcadia, découvrez des habitats conçus
        pour le bien-être de nos animaux.
      </h2>
      <section class="habitats">
        @if(habitats && habitats.length) { 
          @for (habitat of habitats; track habitat) {
        <div class="habitat-item" (click)="toggleDetails(habitat.id)">
          <img
            [src]="'http://13.39.80.204:8000/upload/' + habitat.image_url"
            alt="Photo représentative de l'habitat {{habitat.title}}"
            class="habitat-img"
          />
          <div class="habitat-content">
            <h3 class="habitat-title">{{ habitat.title }}</h3>
            @if (showDetails == habitat.id) {
            <p>{{ habitat.description }}</p>
            <ul>
              @for (animal of animals; track animal) { 
                @if(animal) {
              <li class="animal-item" (click)="openDialog(animal)">
                {{ animal.firstname }}
              </li>
              } @else {
              <p>Il n'y a pas encore d'animaux dans cet habitat</p>
              }}
            </ul>
            }
          </div>
        </div>
        }} @else {
        <h3>Il n'y a pas d'habitat visible</h3>
        }
      </section>
    </main>
  `,
  styleUrl: `./habitat.component.css`,
})
export class HabitatsComponent implements OnInit {
  habitats!: Habitat[];
  animals!: Animal[];

  animalsOnMongoByFirstname!: AnimalOnMongo;

  private readonly habitatService = inject(HabitatsService);
  private readonly animalService = inject(AnimalService);
  private readonly clickService = inject(ClickService);

  showDetails: string | undefined = undefined;
  title: string
  
  constructor(private matdialog: MatDialog, route:ActivatedRoute) {
    this.title = route.snapshot.data['title']
  }

  
  ngOnInit() {
    this.getHabitats();

  }

  getHabitats() {
    this.habitatService.getHabitats().then((response) => {
      this.habitats = response;
    });
  }

  getAnimalsByHabitat(id: string) {
    this.animalService.getAnimalsByHabitat(id).subscribe((response) => {
      this.animals = response.data.animals;
    });
  }

  toggleDetails(id: string) {
    this.showDetails = id;
    this.getAnimalsByHabitat(id);
  }

  openDialog(animal: Animal) {
    const dialogRef = this.matdialog.open(AnimalsComponent, {
      width: '400px',
      data: { animal: animal },
    });
    this.addClick(animal.firstname);
  }

  addClick(firstname: string) {
    this.clickService.addClick(firstname).subscribe();
  }
}
