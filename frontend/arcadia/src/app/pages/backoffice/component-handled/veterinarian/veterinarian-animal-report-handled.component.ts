import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Animal } from '../../../../shared/models';
import { AnimalService } from '../../../animals/services/animal.service';

@Component({
  selector: 'app-veterinarian-animal-report-handled',
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule, FormsModule],
  template: `
    <section>
      <form ngForm name="animalchoose">
        <label for="animal">Sélectionner un animal : </label>
        <select name="animal" id="animal" [(ngModel)]="selectedAnimalOption">
          <option *ngFor="let animal of animals" [ngValue]="animal.id">
            {{ animal.firstname }}
          </option>
        </select>
      </form>
      @for(animal of animals; track animal) { 
        @if (selectedAnimalOption === animal.id) {
      <table mat-table [dataSource]="datasource">
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Date de visite</th>
          <td mat-cell *matCellDef></td>
        </ng-container>
        <ng-container matColumnDef="healthcondition">
          <th mat-header-cell *matHeaderCellDef>Etat de santé</th>
          <td mat-cell *matCellDef></td>
        </ng-container>
        <ng-container matColumnDef="food">
          <th mat-header-cell *matHeaderCellDef>Nourriture recommandée</th>
          <td mat-cell *matCellDef></td>
        </ng-container>
        <ng-container matColumnDef="grammage">
          <th mat-header-cell *matHeaderCellDef>Grammage</th>
          <td mat-cell *matCellDef></td>
        </ng-container>
        <ng-container matColumnDef="healthconditiondetails">
          <th mat-header-cell *matHeaderCellDef>Détails de l'état de santé</th>
          <td mat-cell *matCellDef></td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Action</th>
          <td mat-cell *matCellDef>
            <mat-icon>create</mat-icon>
            <mat-icon>delete</mat-icon>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayColumsAnimalsReport"></tr>
        <tr
          mat-row
          *matRowDef="let row; columns: displayColumsAnimalsReport"
        ></tr>
      </table>
      <mat-icon class="add-icon">add_circle_outline</mat-icon>
      }}
    </section>
  `,
  styleUrl: `../component-handled.component.css`,
})
export class VeterinarianAnimalReportHandledComponent implements OnInit {
  constructor() {}

  displayColumsAnimalsReport: string[] = [
    'date',
    'healthcondition',
    'food',
    'grammage',
    'healthconditiondetails',
    'actions',
  ];

  animals!: Animal[];
  private readonly animalService = inject(AnimalService);

  datasource!: [];
  selectedAnimalOption!: number;

  ngOnInit() {
    this.animalService.getAnimals().then((response) => {
      this.animals = response;
    });
  }
}
