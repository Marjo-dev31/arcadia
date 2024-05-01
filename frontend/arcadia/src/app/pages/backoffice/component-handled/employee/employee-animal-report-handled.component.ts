import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Animal } from '../../../../shared/models';
import { AnimalService } from '../../../animals/services/animal.service';

@Component({
  selector: 'app-veterinary-animal-report-handled',
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule, FormsModule],
  template: `
      <h3>Rapport employé</h3>
      <form ngForm name="animalchoice" (ngSubmit)="getEmployeeReports(selectedAnimalOption)">
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
        <ng-container matColumnDef="food">
          <th mat-header-cell *matHeaderCellDef>Nourriture donnée</th>
          <td mat-cell *matCellDef></td>
        </ng-container>
        <ng-container matColumnDef="grammage">
          <th mat-header-cell *matHeaderCellDef>Grammage donnée</th>
          <td mat-cell *matCellDef></td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Action</th>
          <td mat-cell *matCellDef>
            <mat-icon>create</mat-icon>
            <mat-icon>delete</mat-icon>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayColums"></tr>
        <tr
          mat-row
          *matRowDef="let row; columns: displayColums"
        ></tr>
      </table>
      <mat-icon class="add-icon">add_circle_outline</mat-icon>
      }}
  `,
  styleUrl: `../component-handled.component.css`,
})
export class EmployeeReportHandledComponent implements OnInit {
  constructor() {}

  displayColums: string[] = [
    'date',
    'food',
    'grammage',
    'actions',
  ];

  animals!: Animal[];
  private readonly animalService = inject(AnimalService);

  selectedAnimalOption!: string;
  datasource!: [];

  ngOnInit() {
    this.getAnimals()
  }

  getAnimals(){
    this.animalService.getAnimals().then((response)=>{
      this.animals = response
    })
  }

  getEmployeeReports(id: string) {
    
  }
}
