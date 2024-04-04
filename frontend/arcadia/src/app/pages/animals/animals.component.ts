import { Component, OnInit, inject } from '@angular/core';
import { AnimalService } from './services/animal.service';
import { Animals } from '../../shared/models';
import { MatDialogClose } from '@angular/material/dialog';



@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [MatDialogClose],
  template: `
    <main>
      <p>Hello</p>
      <div mat-dialog-content>
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
    </div>
    <div mat-dialog-actions>
      <button mat-dialog-close>Fermer</button>
    </div>
    </main>
  `,
  styleUrl: `./animals.component.css`,
})
export class AnimalsComponent implements OnInit {
  constructor() {}

  animals!: Animals[];
  // private readonly animalsService = inject(AnimalService);

  ngOnInit() {
    // this.animalsService.getAnimals().then((response) => {
    //   this.animals = response;
    // });
  }
}
