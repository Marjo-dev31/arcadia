import { Component, Inject, OnInit, inject } from '@angular/core';
import { Animal } from '../../shared/models';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
} from '@angular/material/dialog';


@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [MatDialogClose],
  template: `
    <main class="id-card-animal">
      <div mat-dialog-content >
          @if(animal.id === this.data.animal.id) {
        <div>
          <img [src]="'http://localhost:8000/upload/' + animal.image_url" alt="Photo d'un {{animal.breed}}" />

          <div class="id-card-animal-content">
            <p>Son prénom: {{ animal.firstname }}</p>
            <p>Sa race: {{ animal.breed }}</p>
            <div>
              <p>Son état de santé actuel: {{ animal.veterinary_report }}</p>
            </div>
          </div>
        </div>
        }
      </div>
      <div mat-dialog-actions class="mat-dialog-actions">
        <button mat-dialog-close>Fermer</button>
      </div>
    </main>
  `,
  styleUrl: `./animals.component.css`,
})
export class AnimalsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { animal: Animal }) {}


  animal: Animal = this.data.animal


  ngOnInit() {

  }

}