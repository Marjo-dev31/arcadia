import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Animal } from '../../../../shared/models';
import { AnimalService } from '../../../animals/services/animal.service';
import { MatSortModule, MatSort, SortDirection } from '@angular/material/sort';
import { VeterinaryReport } from '../../../../shared/models/veterinaryreport.interface';
import { VeterinaryService } from '../../../animals/services/veterinary.service';

@Component({
  selector: 'app-veterinary-animal-report-handled',
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
        @for(animal of animals; track animal) {
          <option [ngValue]="animal.id">{{ animal.firstname }}</option>}
        </select>
      </form>
    </section>
      
    <section>
      @for(veterinaryreport of veterinaryReports; track veterinaryreport) {

      }
        <!-- @if (selectedAnimalOption === ) {
        <table mat-table [dataSource]="animals"  matSort matSortActive="date" matSortDisableClear matSortDirection="desc" >
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
   
    </section> -->
  `,
  styleUrl: `../component-handled.component.css`,
})

export class VeterinaryAnimalReportHandledComponent implements OnInit {
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
  veterinaryReports!: VeterinaryReport[];
  selectedAnimalOption!: string;


  private readonly animalService = inject(AnimalService);
  private readonly veterinaryService = inject(VeterinaryService)

  ngOnInit() {
    this.getAnimals()
  }

  getAnimals(){
    this.animalService.getAnimals().then((response)=> {
      this.animals = response
    })
  }

  getVeterinaryReports(){
    this.veterinaryService.getVeterinaryReports().subscribe()
  }

  onSubmit() {
  
  }

  sortData(){


  }
}
