import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Animal } from '../../../../shared/models';
import { AnimalService } from '../../../animals/services/animal.service';
import { MatSortModule, MatSort, SortDirection } from '@angular/material/sort';

@Component({
  selector: 'app-veterinarian-animal-report-handled',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatSortModule,
    MatSort,
  ],
  template: `
    <section class="animals-section">
      <h3>Section animaux</h3>
      <form ngForm name="animalchoice" (ngSubmit)="onSubmit()">
        <label for="animal">Sélectionner un animal : </label>
        <select name="animal" id="animal" [(ngModel)]="selectedAnimalOption">
          <option *ngFor="let animal of animals" [ngValue]="animal.id">
            {{ animal.firstname }}
          </option>
        </select>
      </form>
      <!-- @for(report of reports; track report) { -->
        
        @if (selectedAnimalOption === 1) {
        <table mat-table [dataSource]="reports"  matSort matSortActive="date" matSortDisableClear matSortDirection="desc" >
         <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Date de visite</th>
          <td mat-cell *matCellDef="let report">{{ report.date }}</td>
        </ng-container>
        <ng-container matColumnDef="healthcondition">
          <th mat-header-cell *matHeaderCellDef>Etat de santé</th>
          <td mat-cell *matCellDef="let report">{{report.condition}}</td>
        </ng-container>
        <ng-container matColumnDef="food">
          <th mat-header-cell *matHeaderCellDef>Nourriture recommandée</th>
          <td mat-cell *matCellDef="let report">{{report.food}}</td>
        </ng-container>
        <ng-container matColumnDef="grammage">
          <th mat-header-cell *matHeaderCellDef>Grammage recommandé</th>
          <td mat-cell *matCellDef="let report">{{report.grammage}}</td>
        </ng-container>
        <ng-container matColumnDef="healthconditiondetails">
          <th mat-header-cell *matHeaderCellDef>Détails de l'état de santé</th>
          <td mat-cell *matCellDef="let report">{{report.conditiondetails}}</td>
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
    }
      <mat-icon class="add-icon">add_circle_outline</mat-icon>
   
    </section>
  `,
  styleUrl: `../component-handled.component.css`,
})
export class VeterinarianAnimalReportHandledComponent implements OnInit {
  constructor() {}

  displayColums: string[] = [
    'date',
    'healthcondition',
    'food',
    'grammage',
    'healthconditiondetails',
    'actions',
  ];

  animals!: Animal[];
  private readonly animalService = inject(AnimalService);

  selectedAnimalOption!: number;


  reports = [
    {
      animalid: 1,
      date: '12/12/2012',
      condition: 'bon',
      food: 'herbe',
      grammage: '1000',
      conditiondetails: '',
    },
    {
      animalid: 2,
      date: '04/05/2023',
      condition: 'mauvais',
      food: 'carcasse',
      grammage: '2000',
      conditiondetails: 'faible',
    },
  ];

  ngOnInit() {
    this.animalService.getAnimals().then((response) => {
      this.animals = response;
    });
  }
  onSubmit() {
    console.log(this.selectedAnimalOption, this.reports);
  }

  sortData(){


  }
}
