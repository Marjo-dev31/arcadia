import { CommonModule, formatPercent } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Animal } from '../../../../shared/models';
import { AnimalService } from '../../../animals/services/animal.service';
import { MatSortModule, MatSort, SortDirection } from '@angular/material/sort';
import {
  VeterinaryReport,
  VeterinaryReportCreate,
} from '../../../../shared/models/veterinaryreport.interface';
import { VeterinaryService } from '../../../animals/services/veterinary.service';
import { tap } from 'rxjs';
import { User } from '../../../../shared/models/user.interface';
import { UsersService } from '../../../connection/service/user.service';

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
    ReactiveFormsModule
  ],
  template: `
    <section class="animals-section">
      <h3>Section animaux</h3>
      <form
        ngForm
        name="animalchoice"
        (ngSubmit)="getVeterinaryReports(selectedAnimalOption)"
      >
        <label for="animal">Sélectionner un animal : </label>
        <select name="animal" id="animal" [(ngModel)]="selectedAnimalOption">
          @for(animal of animals; track animal) {
          <option [ngValue]="animal.id">{{ animal.firstname }}</option>
          }
        </select>
        <button>Filtrer</button>
      </form>
      @for(animal of animals; track animal){ 
        @if (selectedAnimalOption === animal.id) {
      <table
        mat-table
        [dataSource]="veterinaryReports"
        matSort
        matSortActive="date"
        matSortDisableClear
        matSortDirection="desc"
      >
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            Date de visite
          </th>
          <td mat-cell *matCellDef="let report">{{ report.date }}</td>
        </ng-container>
        <ng-container matColumnDef="healthcondition">
          <th mat-header-cell *matHeaderCellDef>Etat de santé</th>
          <td mat-cell *matCellDef="let report">{{ report.health }}</td>
        </ng-container>
        <ng-container matColumnDef="food">
          <th mat-header-cell *matHeaderCellDef>Nourriture recommandée</th>
          <td mat-cell *matCellDef="let report">{{ report.food }}</td>
        </ng-container>
        <ng-container matColumnDef="grammage">
          <th mat-header-cell *matHeaderCellDef>Grammage recommandé</th>
          <td mat-cell *matCellDef="let report">{{ report.grammage }}</td>
        </ng-container>
        <ng-container matColumnDef="healthconditiondetails">
          <th mat-header-cell *matHeaderCellDef>Détails de l'état de santé</th>
          <td mat-cell *matCellDef="let report">
            {{ report.details_condition }}
          </td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Action</th>
          <td mat-cell *matCellDef="let report">
            <mat-icon (click)="editReport(report.id)">create</mat-icon>
            <mat-icon (click)="deleteReport(report.id)">delete</mat-icon>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayColums"></tr>
        <tr mat-row *matRowDef="let row; columns: displayColums"></tr>
      </table>
      }}
      <mat-icon class="add-icon" (click)="toggleAddForm()"
        >add_circle_outline</mat-icon
      >
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
          placeholder="Aliments recommandés"
          name="food"
          [(ngModel)]="newReport.food"
          #food="ngModel"
        />
        <input
          type="text"
          placeholder="Grammage recommandé"
          name="grammage"
          [(ngModel)]="newReport.grammage"
          #grammage="ngModel"
        />
        <input
          type="text"
          placeholder="Etat de santé actuel"
          name="health"
          [(ngModel)]="newReport.health"
          #health="ngModel"
        />
        <textarea
          name="details_condition"
          placeholder="Détails de la condition physique(optionnel)"
          name="details_condition"
          cols="30"
          rows="10"
          [(ngModel)]="newReport.details_condition"
          #details_condition="ngModel"
        ></textarea>
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
    <section [ngStyle]="{ display: updateFormIsDisplay ? 'block' : 'none' }">
      <form
        class="add-form"
        [formGroup]="updateForm"
        (ngSubmit)="updateReport(selectedAnimalOption)">
        <input
          type="text"
          formControlName="food"/>
        <input
          type="text"
          formControlName="grammage"/>
        <input
          type="text"
          formControlName="health"/>
        <textarea
          formControlName="details_condition"
          cols="30"
          rows="10"></textarea>
        <label for="animal">Sélectionner un animal : </label>
        <select name="selected-animal" id="animal" formControlName="id_animal">
          @for(animal of animals; track animal) {
          <option [value]="animal.id">{{ animal.firstname }}</option>
          }
        </select>
        <label for="selected-user">Sélectionner un rapporteur : </label>
        <select name="user" id="user" formControlName="id_user">
          @for(user of users; track user) {
          <option [value]="user.id">{{ user.firstname }}</option>
          }
        </select>
        <button class="add-btn">Modifier rapport</button>
        <button>Annuler</button>
      </form>
    </section>
  `,

  styleUrl: `../component-handled.component.css`,
})
export class VeterinaryAnimalReportHandledComponent implements OnInit {

  updateForm!: FormGroup

  constructor(public fb: FormBuilder) {
    this.updateForm = fb.group({
      food: new FormControl(''),
      grammage: new FormControl(''),
      health: new FormControl(''),
      details_condition: new FormControl(''),
      id_user: new FormControl(''),
      id_animal: new FormControl(''),
      id: new FormControl('')
    })
  }

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
  users!: User[];

  addFormIsDisplay: boolean = false;
  updateFormIsDisplay: boolean = false;

  newReport: VeterinaryReportCreate = {
    food: '',
    grammage: 0,
    health: '',
    details_condition: '',
    id_user: '',
    id_animal: '',
  };

  private readonly animalService = inject(AnimalService);
  private readonly veterinaryService = inject(VeterinaryService);
  private readonly userService = inject(UsersService);

  ngOnInit() {
    this.getAnimals();
    this.getUsers();
  }

  getAnimals() {
    this.animalService.getAnimals().then((response) => {
      this.animals = response;
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe((response) => {
    this.users = response.data.users;
    });
  }

  getVeterinaryReports(id: string) {
    this.veterinaryService.getVeterinaryReports(id).subscribe((response) => {
    this.veterinaryReports = response.data.reports;
    });
  }

  deleteReport(id: string) {
    this.veterinaryService.deleteReport(id).pipe(tap(() => {this.getVeterinaryReports(id)})).subscribe();
  }

  toggleAddForm() {
    this.addFormIsDisplay = !this.addFormIsDisplay;
  }

  onSubmit(form: NgForm) {
    this.veterinaryService.addVeterinaryReport(this.newReport).subscribe();
    this.addFormIsDisplay = !this.addFormIsDisplay;
    form.reset();
  }

  editReport(id: string) {
    this.updateFormIsDisplay = true;
    const reportToUpdate = this.veterinaryReports.find((el)=> el.id === id);
    this.updateForm.patchValue({food: reportToUpdate?.food, grammage: reportToUpdate?.grammage, health: reportToUpdate?.health, details_condition: reportToUpdate?.details_condition, id_user: reportToUpdate?.id_user, id_animal: reportToUpdate?.id_animal, id: reportToUpdate?.id});
  }
  
  updateReport(id: string) {
    this.veterinaryService.updateReport(this.updateForm.value).pipe(tap(()=>{this.getVeterinaryReports(id)})).subscribe();
    this.updateFormIsDisplay = ! this.updateFormIsDisplay;
  }

}
