import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Animal } from '../../../../shared/models';
import { AnimalService } from '../../../animals/services/animal.service';
import { EmployeeService } from '../../../animals/services/employee.service';
import { User } from '../../../../shared/models/user.interface';
import { UserService } from '../../../login/service/user.service';
import { EmployeeReport, EmployeeReportCreate } from '../../../../shared/models/employeereport.interface';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-veterinary-animal-report-handled',
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule, FormsModule, ReactiveFormsModule, MatSortModule],
  template: `
      <h3>Rapport employé</h3>
  <section>
      <form #animalchoice=ngForm name="animalchoice" (ngSubmit)="getEmployeeReports(selectedAnimalOption)">
        <label for="animal">Sélectionner un animal : </label>
        <select name="animal" id="animal" [(ngModel)]="selectedAnimalOption">
          <option *ngFor="let animal of animals" [ngValue]="animal.id">
            {{ animal.firstname }} ({{ animal.breed }})
          </option>
        </select>
        <button>Filtrer</button>
      </form>

        @if(animalchoice.submitted && selectedAnimalOption && !employeeReports.length){
        <p>Il n'y a pas de rapport associé à cet animal</p>
      }
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
          @if(role === 'Employé'){
            <mat-icon (click)="editReport(report.id)">create </mat-icon>
            <mat-icon (click)="deleteReport(report.id)" >delete</mat-icon>
          } @else {
            <p>Non autorisé</p>
          }
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayColums"></tr>
        <tr
          mat-row
          *matRowDef="let row; columns: displayColums"
        ></tr>
      </table>
    }}
    @if(role === 'Employé'){
      @if(!addFormIsDisplay){
      <mat-icon class="add-icon" (click)="toggleAddForm()"
        >add_circle_outline</mat-icon
      >
      } 
        @if(addFormIsDisplay){
      <mat-icon class="add-icon" (click)="toggleAddForm()"
        >remove_circle_outline</mat-icon
      >
  }}
  </section>
  <section [ngStyle]="{ display: addFormIsDisplay ? 'block' : 'none' }">
      <form
        class="add-form"
        #form="ngForm"
        name="addform"
        (ngSubmit)="onSubmit(form)"
      >
        <label for="animal">Sélectionner un animal : </label>
        <select name="animal" id="animal" [(ngModel)]="newReport.id_animal" #animal="ngModel" required>
          @for(animal of animals; track animal) {
          <option [ngValue]="animal.id">{{ animal.firstname | titlecase}} ({{ animal.breed }})</option>
          }
        </select>
        @if(animal.invalid && animal.touched){
          <p class="alert">Un animal est requis</p>
        }
        <label for="food">Nourriture donnée :</label>
        <input
          type="text"
          placeholder="Aliments données"
          name="food"
          id="food"
          [(ngModel)]="newReport.food"
          #food="ngModel"
          required
        />
        @if(food.invalid && food.touched){
          <p class="alert">Un type de nourriture est requis</p>
        }
        <label for="grammage">Poids (en g) :</label>
        <input
          type="text"
          placeholder="Grammage donné"
          name="grammage"
          id="grammage"
          [(ngModel)]="newReport.grammage"
          #grammage="ngModel"
          required
        />
        @if(grammage.invalid && grammage.touched){
          <p class="alert">Un grammage est requis</p>
        }
        
        <label for="user">Sélectionner un rapporteur : </label>
        <select name="user" id="user" [(ngModel)]="newReport.id_user" #user="ngModel" required>
          @for(user of users; track user) {
          <option [ngValue]="user.id">{{ user.firstname | titlecase }} {{ user.lastname | titlecase }}</option>
          }
        </select>
        @if(user.invalid && user.touched){
          <p class="alert">Un rapporteur est requis</p>
        }
        <button class="add-btn" [disabled]="form.invalid">Enregistrer nouveau rapport</button>
      </form>
  </section>
  <section [ngStyle]="{ display: updateFormIsDisplay ? 'block' : 'none' }">
      <form
        class="add-form"
        [formGroup]="updateForm"
        (ngSubmit)="updateReport(selectedAnimalOption)">
        <label for="food">Nourriture recommandée :</label>
        <input
          type="text"
          formControlName="food"
          id="food"/>
          @if(updateForm.controls['food'].invalid && updateForm.controls['food'].touched){
              <div class="alert">Une type de nourriture est requis</div>
            }
        <label for="grammage">Poids (en g) :</label>
        <input
          type="text"
          id="grammage"
          formControlName="grammage"/>
          @if(updateForm.controls['grammage'].invalid && updateForm.controls['grammage'].touched){
              <div class="alert">Un grammage est requis</div>
            }
        <label for="animal">Sélectionner un animal : </label>
        <select name="selected-animal" id="animal" formControlName="id_animal">
          @for(animal of animals; track animal) {
          <option [value]="animal.id">{{ animal.firstname }}</option>
          }
        </select>
        @if(updateForm.controls['id_animal'].invalid && updateForm.controls['id_animal'].touched){
              <div class="alert">Un animal est requis</div>
            }
        <label for="selected-user">Sélectionner un rapporteur : </label>
        <select name="user" id="selected-user" formControlName="id_user">
          @for(user of users; track user) {
          <option [value]="user.id">{{ user.firstname | titlecase }} {{ user.lastname | titlecase}}</option>
          }
        </select>
        @if(updateForm.controls['id_user'].invalid && updateForm.controls['id_user'].touched){
              <div class="alert">Un rapporteur est requis</div>
            }
        <button class="add-btn" [disabled]="updateForm.invalid">Modifier rapport</button>
      </form>
      <mat-icon class="add-icon" (click)="closeUpdateForm()"
        >remove_circle_outline</mat-icon
      >
  </section>
  `,
  styleUrl: `../component-handled.component.css`,
})
export class EmployeeReportHandledComponent implements OnInit {

  updateForm!: FormGroup

  constructor(public fb: FormBuilder) {
    this.updateForm = fb.group({
      food: new FormControl('', [Validators.required]),
      grammage: new FormControl('', [Validators.required]),
      id_user: new FormControl('', [Validators.required]),
      id_animal: new FormControl('', [Validators.required]),
      id: new FormControl('')
    })
  }

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
  private readonly employeeService = inject(EmployeeService);
  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef)


  addFormIsDisplay: boolean = false;
  updateFormIsDisplay: boolean = false;
  role: string = localStorage.getItem('role') || '';
  responsemessage: string = ''

  newReport: EmployeeReportCreate = {
    food: '',
    grammage: 0,
    id_user: '',
    id_animal: '',
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
    this.userService.getUsers().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((response) => {
    this.users = response;
    });
  };

  getEmployeeReports(id: string) {
    this.employeeService.getEmployeeReports(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((response)=> {
    this.employeeReports = response
    this.datasource = new MatTableDataSource(this.employeeReports);
    this.datasource.sort = this.sort;
    })
  };

  toggleAddForm() {
      this.addFormIsDisplay = !this.addFormIsDisplay;
    };

  onSubmit(form: NgForm){
    this.employeeService.addEmployeeReport(this.newReport).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    this.addFormIsDisplay = !this.addFormIsDisplay;
    form.reset();
    };

  editReport(id: string) {
    this.updateFormIsDisplay = true;
    const reportToUpdate = this.employeeReports.find((el)=> el.id === id);
    this.updateForm.patchValue({
      food: reportToUpdate?.food, 
      grammage: reportToUpdate?.grammage, 
      id_user: reportToUpdate?.id_user, 
      id_animal: reportToUpdate?.id_animal, 
      id: reportToUpdate?.id});
    }

  updateReport(id: string) {
    this.employeeService.updateReport(this.updateForm.value).pipe(tap(()=>{this.getEmployeeReports(id)}), takeUntilDestroyed(this.destroyRef)).subscribe();
    this.updateFormIsDisplay = !this.updateFormIsDisplay;
    }

  deleteReport(id: string) {
    this.employeeService.deleteEmployeeReport(id).pipe(tap(() => {this.getEmployeeReports(id)}), takeUntilDestroyed(this.destroyRef)).subscribe()
  }

  closeUpdateForm(){
    this.updateFormIsDisplay = !this.updateFormIsDisplay
  }
  }
