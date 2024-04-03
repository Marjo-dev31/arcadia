import { Component, OnInit, inject } from '@angular/core';
import { AnimalService } from './services/animal.service';
import { Animals } from '../../shared/models';

@Component({
  selector: 'app-animals',
  standalone: true,
  template: `
    <main>
      @for (animal of animals; track animal) {
      <div class="id-card-animal">
        <img src="assets/images/tigre.jpg" alt="" />

        <div class="id-card-animal-content">
          <p>{{ animal.firstname }}</p>
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
    </main>
  `,
  styleUrl: `./animals.component.css`,
})
export class AnimalsComponent implements OnInit {
  constructor() {}

  animals!: Animals[];
  private readonly animalsService = inject(AnimalService);

  ngOnInit() {
    this.animalsService.getAnimals().then((response) => {
      this.animals = response;
    });
  }
}
