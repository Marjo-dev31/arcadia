import { Component, Inject, OnInit, inject } from '@angular/core';
import { AnimalService } from './services/animal.service';
import { Animal } from '../../shared/models';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [MatDialogClose],
  template: `
    <main class="id-card-animal">
      <div mat-dialog-content >
        @for (animal of animalsList; track animal) { @if(animal.id ===
        this.data.id){
        <div>
          <img src="assets/images/tigre.jpg" alt="" />

          <div class="id-card-animal-content">
            <p>{{ animal.firstname }}</p>
            <p>{{ animal.breed }}</p>
            <div>
              <p>{{ animal.veterinary_report }}</p>
            </div>
          </div>
        </div>
        } }
      </div>
      <div mat-dialog-actions class="mat-dialog-actions">
        <button mat-dialog-close>Fermer</button>
      </div>
    </main>
  `,
  styleUrl: `./animals.component.css`,
})
export class AnimalsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string }) {}

  animalsList!: Animal[];
  // private readonly animalsService = inject(AnimalService);

  ngOnInit() {
    // this.animalsService.getAnimals().then((response) => {
    //   this.animals = response;
    // });
  }
}
