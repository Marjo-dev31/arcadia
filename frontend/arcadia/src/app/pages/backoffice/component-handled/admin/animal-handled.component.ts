import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Animal } from '../../../../shared/models';
import { AnimalService } from '../../../animals/services/animal.service';
import { ImageService } from '../../../home/services/image.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-animal-handled',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  template: `
    <h3>Animaux</h3>
    <table mat-table [dataSource]="datasource">
      <ng-container matColumnDef="firstname">
        <th mat-header-cell *matHeaderCellDef>Prénom</th>
        <td mat-cell *matCellDef="let animal">{{ animal.firstname }}</td>
      </ng-container>
      <ng-container matColumnDef="race">
        <th mat-header-cell *matHeaderCellDef>Race</th>
        <td mat-cell *matCellDef="let animal">{{ animal.name }}</td>
      </ng-container>
      <ng-container matColumnDef="habitat">
        <th mat-header-cell *matHeaderCellDef>Habitat</th>
        <td mat-cell *matCellDef="let animal">{{ animal.title }}</td>
      </ng-container>
      <ng-container matColumnDef="condition">
        <th mat-header-cell *matHeaderCellDef>Etat de santé</th>
        <td mat-cell *matCellDef="let animal">{{ animal.condition }}</td>
      </ng-container>
      <ng-container matColumnDef="image">
        <th mat-header-cell *matHeaderCellDef>Photo</th>
        <td mat-cell *matCellDef="let animal">
          @if(animal.image_url) {
          <div class="delete-img">
            <div>{{ animal.image_url }}</div>
            <!-- <mat-icon
              class="mat-icon-clear"
              (click)="deleteImage(habitat.image_id)"
              >clear</mat-icon
            > -->
          </div>
          } @else {
          <p>Il n'y a pas encore de photo associé à cet habitat {{animal.id}}</p>
          }
          <input
            type="file"
            class="file-input"
            (change)="onFileChange($event, animal.id)"
          />
        </td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Action</th>
        <td mat-cell *matCellDef>
          <mat-icon>create</mat-icon>
          <mat-icon>delete</mat-icon>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayColums"></tr>
      <tr mat-row *matRowDef="let row; columns: displayColums"></tr>
    </table>
    <mat-icon class="add-icon">add_circle_outline</mat-icon>
  `,
  styleUrl: `../component-handled.component.css`,
})
export class AnimalHandledComponent implements OnInit {
  constructor() {}

  displayColums: string[] = [
    'firstname',
    'race',
    'habitat',
    'condition',
    'image',
    'actions',
  ];

  datasource!: Animal[];
  private readonly animalService = inject(AnimalService);
  private readonly imageService = inject(ImageService);

  ngOnInit() {
    this.animalService.getAnimals().then((response) => {
      this.datasource = response;
    });
  }

  getAnimals() {
    this.animalService.getAnimals();

  }

  onFileChange(event: any, id: string) {
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append("myImg", file);
    this.imageService.addAnimalImage(formData, id).pipe(tap(()=>{this.getAnimals()})).subscribe()
  }

}
