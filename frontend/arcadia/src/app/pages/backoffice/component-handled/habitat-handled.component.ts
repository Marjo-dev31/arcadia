import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Habitat } from '../../../shared/models';
import { HabitatsService } from '../../habitats/services/habitat.service';

@Component({
  selector: 'app-service-handled',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  template: `
    <h3>Habitats</h3>
    <table mat-table [dataSource]="datasource">
      <ng-container matColumnDef="title">
        <th mat-header-cell *matHeaderCellDef>Titre</th>
        <td mat-cell *matCellDef="let habitat">{{ habitat.title }}</td>
      </ng-container>
      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef>Description</th>
        <td mat-cell *matCellDef="let habitat">{{ habitat.description }}</td>
      </ng-container>

      <ng-container matColumnDef="animals">
        <th mat-header-cell *matHeaderCellDef>Animaux</th>
        <td mat-cell *matCellDef="let habitat">
          @for(animal of habitat.animals; track animal) {
          {{ animal.firstname }}, }
        </td>
        <ng-container matColumnDef="image">
          <th mat-header-cell *matHeaderCellDef>Photo</th>
          <td mat-cell *matCellDef="let habitat">
            <img src="{{ habitat.image }}" alt="" />
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
export class HabitatHandledComponent implements OnInit {
  constructor() {}

  displayColums: string[] = [
    'title',
    'description',
    'animals',
    'image',
    'actions',
  ];

  datasource!: Habitat[];
  private readonly habitatService = inject(HabitatsService);

  ngOnInit() {
    this.habitatService.getHabitats().then((response) => {
      this.datasource = response;
    });
  }
}
