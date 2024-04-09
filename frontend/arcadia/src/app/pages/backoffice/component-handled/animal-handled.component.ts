import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Animal } from '../../../shared/models';
import { AnimalService } from '../../animals/services/animal.service';


@Component({
  selector: 'app-service-handled',
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
        <td mat-cell *matCellDef="let habitat">{{ habitat.race }}</td>
      </ng-container>

      <ng-container matColumnDef="condition">
        <th mat-header-cell *matHeaderCellDef>Etat de santé</th>
        <td mat-cell *matCellDef="let animal">{{animal.condition}}</td>
        <ng-container matColumnDef="image">
          <th mat-header-cell *matHeaderCellDef>Photo</th>
          <td mat-cell *matCellDef="let animal">
            <img src="{{ animal.image }}" alt="" />
          </td>
        </ng-container>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Action</th>
        <td mat-cell *matCellDef>
          <mat-icon>edit</mat-icon>
          <mat-icon>delete</mat-icon>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayColums"></tr>
      <tr mat-row *matRowDef="let row; columns: displayColums"></tr>
    </table>
    <button class="add-btn">+</button>
  `,
  styles: `
    img {
        width: 100px
    }
    .add-btn {
    width: 50px;
    text-align: center;
    clip-path: circle();
    font-size: var(--font-size-big-title-h1);
    color: var(--color-background);
    background-color: var(--color-primary);
    display: flex;
    justify-content: center;
    margin: auto;
  }
    `,
})
export class AnimalHandledComponent implements OnInit {
  constructor() {}

  displayColums: string[] = [
    'firstname',
    'race',
    'condition',
    'image',
    'actions',
  ];

  datasource!: Animal[];
  private readonly animalService = inject(AnimalService);

  ngOnInit() {
    this.animalService.getAnimals().then((response) => {
      this.datasource = response;
    });
  }
}
