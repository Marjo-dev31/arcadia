import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Animal } from '../../../../shared/models';
import { AnimalService } from '../../../animals/services/animal.service';
import { MatSortModule, MatSort } from '@angular/material/sort';
import {
  VeterinaryReport,
  VeterinaryReportCreate,
} from '../../../../shared/models/veterinaryreport.interface';
import { VeterinaryService } from '../../../animals/services/veterinary.service';
import { tap } from 'rxjs';
import { User } from '../../../../shared/models/user.interface';
import { UserService } from '../../../login/service/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    ReactiveFormsModule,
  ],
  template: `
    <section class="animals-section">
      <h3>Section animaux</h3>
      <form
        #animalchoice=ngForm
        name="animalchoice"
        (ngSubmit)="getVeterinaryReports(selectedAnimalOption)"
      >
        <label for="animal-veterinary">Sélectionner un animal : </label>
        <select name="animal" id="animal-veterinary" [(ngModel)]="selectedAnimalOption">
          @for(animal of animals; track animal) {
          <option [ngValue]="animal.id">{{ animal.firstname }}</option>
          }
        </select>
        <button>Filtrer</button>
      </form>
      @if(animalchoice.submitted && selectedAnimalOption && !veterinaryReports.length){
      <p>Il n'y pas encore de rapport associé à cet animal !</p>
      }
      @for(animal of animals; track animal){ 
        @if (selectedAnimalOption === animal.id) {
      <table
        mat-table
        [dataSource]="dataSource"
        matSort
        matSortActive="date"
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
            @if(role === 'Vétérinaire'){
            <mat-icon (click)="editReport(report.id)">create</mat-icon>
            <mat-icon (click)="deleteReport(report.id)">delete</mat-icon>
            } @else {
            <p>Non autorisé</p>
            }
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayColums"></tr>
        <tr mat-row *matRowDef="let row; columns: displayColums"></tr>
      </table>
      }} 
      @if(role === 'Vétérinaire'){ 
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
      <label for="animal-add-veterinary">Sélectionner un animal : </label>
        <select
          name="animal"
          id="anima-add-veterinary"
          [(ngModel)]="newReport.id_animal"
          #animal="ngModel"
          required
        >
          @for(animal of animals; track animal) {
          <option [ngValue]="animal.id">{{ animal.firstname }}</option>
          }
        </select>
        @if(animal.invalid && animal.touched){
        <p class="alert">Un animal est requis</p>
        }
        <label for="food-add-veterinary">Nourriture recommandée :</label>
        <input
          type="text"
          placeholder="Aliments recommandés"
          name="food"
          id="food-add-veterinary"
          [(ngModel)]="newReport.food"
          #food="ngModel"
          required
        />
        @if(food.invalid && food.touched){
        <p class="alert">Un type de nourriture est requis</p>
        }
        <label for="grammage-add-veterinary">Poids (en g) :</label>
        <input
          type="text"
          placeholder="Grammage recommandé"
          name="grammage"
          id="grammage-add-veterinary"
          [(ngModel)]="newReport.grammage"
          #grammage="ngModel"
          required
        />
        @if(grammage.invalid && grammage.touched){
        <p class="alert">Un grammage est requis</p>
        }
        <label for="health-add-veterinary">Etat de santé général :</label>
        <input
          type="text"
          placeholder="Etat de santé actuel"
          name="health"
          id="health-add-veterinary"
          [(ngModel)]="newReport.health"
          #health="ngModel"
          required
        />
        @if(health.invalid && health.touched){
        <p class="alert">Un état de santé est requis</p>
        }
        <label for="details-add-veterinary">Détails de santé :</label>
        <textarea
          name="details_condition"
          id="details-add-veterinary"
          placeholder="Détails de la condition physique"
          cols="30"
          rows="10"
          [(ngModel)]="newReport.details_condition"
          #details_condition="ngModel"
        ></textarea>
        
        <label for="user-add-veterinary">Sélectionner un rapporteur : </label>
        <select
          name="user"
          id="user-add-veterinary"
          [(ngModel)]="newReport.id_user"
          #user="ngModel"
        >
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
        (ngSubmit)="updateReport(selectedAnimalOption)"
      >
        <label for="animal-update-veterinary">Sélectionner un animal : </label>
        <select name="selected-animal" id="animal-update-veterinary" formControlName="id_animal">
            @for(animal of animals; track animal) {
            <option [value]="animal.id">{{ animal.firstname }}</option>
            }
        </select>
        @if(updateForm.controls['id_animal'].invalid && updateForm.controls['id_animal'].touched){
          <div class="alert">Un animal est requis</div>
          }
        <label for="food-update-veterinary">Nourriture recommandée :</label>
        <input type="text" formControlName="food" id="food-update-veterinary" />
        @if(updateForm.controls['food'].invalid &&
        updateForm.controls['food'].touched){
        <div class="alert">Un type de nourriture est requis</div>
        }
        <label for="grammage-update-veterinary">Poids (en g) :</label>
        <input type="text" formControlName="grammage" id="grammage-update-veterinary" />
        @if(updateForm.controls['grammage'].invalid &&
        updateForm.controls['grammage'].touched){
        <div class="alert">Un grammage est requis</div>
        }
        <label for="health-update-veterinary">Etat de santé général :</label>
        <input type="text" formControlName="health" id="health-update-veterinary" />
        @if(updateForm.controls['health'].invalid &&
        updateForm.controls['health'].touched){
        <div class="alert">Un état de santé est requis</div>
        }
        <label for="details-update-veterinary">Détails de santé :</label>
        <textarea
          formControlName="details_condition"
          id="details-update-veterinary"
          cols="30"
          rows="10"
        ></textarea>
        <label for="selected-user-update-veterinary">Sélectionner un rapporteur : </label>
        <select name="selected-user" id="user-update-veterinary" formControlName="id_user">
          @for(user of users; track user) {
          <option [value]="user.id">{{ user.firstname | titlecase}} {{ user.lastname | titlecase }}</option>
          }
        </select>
        @if(updateForm.controls['id_user'].invalid &&
        updateForm.controls['id_user'].touched){
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
export class VeterinaryAnimalReportHandledComponent implements OnInit {
  updateForm!: FormGroup;

  constructor(public fb: FormBuilder) {
    this.updateForm = fb.group({
      food: new FormControl('', [Validators.required]),
      grammage: new FormControl('', [Validators.required]),
      health: new FormControl('', [Validators.required]),
      details_condition: new FormControl(''),
      id_user: new FormControl('', [Validators.required]),
      id_animal: new FormControl('', [Validators.required]),
      id: new FormControl('')
    });
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
  veterinaryReports: VeterinaryReport[] = [];
  users!: User[];

  selectedAnimalOption!: string;

  dataSource = new MatTableDataSource(this.veterinaryReports);

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

  role: string = localStorage.getItem('role') || '';

  responsemessage: string = '';

  private readonly animalService = inject(AnimalService);
  private readonly veterinaryService = inject(VeterinaryService);
  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);


  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.getAnimals();
    this.getUsers();
  }

  ngAfterOnInit() {
    this.dataSource.sort = this.sort;
  }

  getAnimals() {
    this.animalService.getAnimals().then((response) => {
      this.animals = response;
    });
  }

  getUsers() {
    this.userService.getUsers().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((response) => {
      this.users = response;
    });
  }

  getVeterinaryReports(id: string) {
    this.veterinaryService.getVeterinaryReports(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((response) => {
        this.veterinaryReports = response;
        this.dataSource = new MatTableDataSource(this.veterinaryReports);
        this.dataSource.sort = this.sort;
    });
  }

  deleteReport(id: string) {
    this.veterinaryService
      .deleteReport(id)
      .pipe(
        tap(() => {
          this.getVeterinaryReports(id);
        }), takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  toggleAddForm() {
    this.addFormIsDisplay = !this.addFormIsDisplay;
  }

  onSubmit(form: NgForm) {
    this.veterinaryService.addVeterinaryReport(this.newReport).pipe(tap(() => {this.getVeterinaryReports(this.selectedAnimalOption)}),takeUntilDestroyed(this.destroyRef)).subscribe();
    form.reset();
  }

  editReport(id: string) {
    this.updateFormIsDisplay = true;
    const reportToUpdate = this.veterinaryReports.find((el) => el.id === id);
    this.updateForm.patchValue({
      food: reportToUpdate?.food,
      grammage: reportToUpdate?.grammage,
      health: reportToUpdate?.health,
      details_condition: reportToUpdate?.details_condition,
      id_user: reportToUpdate?.id_user,
      id_animal: reportToUpdate?.id_animal,
      id: reportToUpdate?.id,
    });
  }

  updateReport(id: string) {
    this.veterinaryService.updateReport(this.updateForm.value).pipe(
        tap(() => {
          this.getVeterinaryReports(id);
        }), takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
    this.updateFormIsDisplay = !this.updateFormIsDisplay;
  }

  closeUpdateForm() {
    this.updateFormIsDisplay = !this.updateFormIsDisplay;
  }
}
