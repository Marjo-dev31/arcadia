import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Form, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Animal } from '../../../../shared/models';
import { AnimalService } from '../../../animals/services/animal.service';
import { EmployeeService } from '../../../animals/services/employee.service';
import { User } from '../../../../shared/models/user.interface';
import { UsersService } from '../../../connection/service/user.service';
import { EmployeeReport, EmployeeReportCreate } from '../../../../shared/models/employeereport.interface';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-veterinary-animal-report-handled',
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule, FormsModule, ReactiveFormsModule, MatSortModule],
  template: `
      <h3>Rapport employé</h3>
      <section>
      <form ngForm name="animalchoice" (ngSubmit)="getEmployeeReports(selectedAnimalOption)">
        <label for="animal">Sélectionner un animal : </label>
        <select name="animal" id="animal" [(ngModel)]="selectedAnimalOption">
          <option *ngFor="let animal of animals" [ngValue]="animal.id">
            {{ animal.firstname }}
          </option>
        </select>
        <button>Filtrer</button>
      </form>
      @for(animal of animals; track animal) { 
        @if (selectedAnimalOption === animal.id) {
      <table mat-table [dataSource]="datasource" matSort matSortActive="date">
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Date de visite</th>
          <td mat-cell *matCellDef="let report">{{ report.date }}</td>
        </ng-container>
        <ng-container matColumnDef="food">
          <th mat-header-cell *matHeaderCellDef>Nourriture donnée</th>
          <td mat-cell *matCellDef="let report">{{ report.food }}</td>
        </ng-container>
        <ng-container matColumnDef="grammage">
          <th mat-header-cell *matHeaderCellDef>Grammage donnée</th>
          <td mat-cell *matCellDef="let report">{{ report.grammage}}</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Action</th>
          <td mat-cell *matCellDef="let report">
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
    }}
    <mat-icon class="add-icon" (click)="toggleAddForm()">add_circle_outline</mat-icon>
  </section>
  <section [ngStyle]="{ display: addFormIsDisplay ? 'block' : 'none' }">
      <form
        class="add-form"
        #form="ngForm"
        name="addform"
        (ngSubmit)="onSubmit(form)"
      >
        <input
          type="text"
          placeholder="Aliments données"
          name="food"
          [(ngModel)]="newReport.food"
          #food="ngModel"
        />
        <input
          type="text"
          placeholder="Grammage donné"
          name="grammage"
          [(ngModel)]="newReport.grammage"
          #grammage="ngModel"
        />
        <label for="animal">Sélectionner un animal : </label>
        <select name="animal" id="animal" [(ngModel)]="newReport.id_animal">
          @for(animal of animals; track animal) {
          <option [ngValue]="animal.id">{{ animal.firstname }}</option>
          }
        </select>
        <label for="user">Sélectionner un rapporteur : </label>
        <select name="user" id="user" [(ngModel)]="newReport.id_user">
          @for(user of users; track user) {
          <option [ngValue]="user.id">{{ user.firstname }}</option>
          }
        </select>
        <button class="add-btn">Enregistrer nouveau rapport</button>
      </form>
    </section>
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
  users!: User[];
  employeeReports: EmployeeReport[] = []
  
  selectedAnimalOption!: string;

  datasource = new MatTableDataSource(this.employeeReports);

  private readonly animalService = inject(AnimalService);
  private readonly employeeService = inject(EmployeeService)
  private readonly userService = inject(UsersService)


  addFormIsDisplay: boolean = false;

  newReport: EmployeeReportCreate = {
    food: '',
    grammage: 0,
    id_user: '',
    id_animal: ''
  }

  @ViewChild(MatSort) sort!:MatSort;

  ngOnInit() {
    this.getAnimals()
    this.getUsers()
  }

  ngAfterOnInit(){
    this.datasource.sort = this.sort;
   }

  getAnimals(){
    this.animalService.getAnimals().then((response)=>{
    this.animals = response
    })
  };

  getUsers() {
    this.userService.getUsers().subscribe((response) => {
    this.users = response.data.users;
    });
  };

  getEmployeeReports(id: string) {
    this.employeeService.getEmployeeReports(id).subscribe((response)=> {
    this.employeeReports = response.data.reports;
    this.datasource = new MatTableDataSource(this.employeeReports);
    this.datasource.sort = this.sort
    })
  };

  toggleAddForm() {
      this.addFormIsDisplay = !this.addFormIsDisplay;
    };

  onSubmit(form: Form){
    this.employeeService.addEmployeeReport(this.newReport).subscribe();
    };
}
