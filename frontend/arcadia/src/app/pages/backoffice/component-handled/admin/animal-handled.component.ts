import { Component, NgModule, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Animal, AnimalCreate } from '../../../../shared/models';
import { AnimalService } from '../../../animals/services/animal.service';
import { ImageService } from '../../../home/services/image.service';
import { tap } from 'rxjs';
import { NgStyle } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-animal-handled',
  standalone: true,
  imports: [MatTableModule, MatIconModule, NgStyle, FormsModule, ReactiveFormsModule],
  template: `
    <h3>Animaux</h3>
    <section>
    <table mat-table [dataSource]="datasource">
      <ng-container matColumnDef="firstname">
        <th mat-header-cell *matHeaderCellDef>Prénom</th>
        <td mat-cell *matCellDef="let animal">{{ animal.firstname }}</td>
      </ng-container>
      <ng-container matColumnDef="race">
        <th mat-header-cell *matHeaderCellDef>Race</th>
        <td mat-cell *matCellDef="let animal">{{ animal.breed }}</td>
      </ng-container>
      <ng-container matColumnDef="habitat">
        <th mat-header-cell *matHeaderCellDef>Habitat</th>
        <td mat-cell *matCellDef="let animal">{{ animal.habitat }}</td>
      </ng-container>
      <ng-container matColumnDef="condition">
        <th mat-header-cell *matHeaderCellDef>Etat de santé</th>
        <td mat-cell *matCellDef="let animal">{{ animal.condition }}</td>
      </ng-container>
      <ng-container matColumnDef="image">
        <th mat-header-cell *matHeaderCellDef>Photo</th>
        <td mat-cell *matCellDef="let animal">
          @if(animal.image_url) {
          <div class="delete-img">
            <div>{{ animal.image_url }}</div>
            <mat-icon
              class="mat-icon-clear"
              (click)="deleteImage(animal.image_id)"
              >clear</mat-icon
            >
          </div>
          } @else {
          <p>Il n'y a pas encore de photo associé à cet habitat</p>
          }
          <input
            type="file"
            class="file-input"
            (change)="onFileChange($event, animal.id)"
          />
        </td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Action</th>
        <td mat-cell *matCellDef="let animal">
          <mat-icon (click)="editAnimal(animal.id)">create</mat-icon>
          <mat-icon (click)="deleteAnimal(animal.id)">delete</mat-icon>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayColums"></tr>
      <tr mat-row *matRowDef="let row; columns: displayColums"></tr>
    </table>
    <mat-icon class="add-icon" (click)="toggleAddForm()">add_circle_outline</mat-icon>
  </section>
  <section [ngStyle]="{ display: addFormIsDisplay ? 'block' : 'none' }">
        <form
          class="add-form"
          #form="ngForm"
          name="addform"
          (ngSubmit)="onSubmit(selectedBreed.value, selectedHabitat.value)"
        >
          <input
            type="text"
            placeholder="Prénom"
            name="firstname"
            [(ngModel)]="newAnimal.firstname"
            #title="ngModel"
          />
          <select name="selected-breed" #selectedBreed>
            <option value="">--Choissisez une race</option>
            @for(animal of datasource; track animal) {
            <option [value]="animal.id_breed">{{ animal.breed }}</option>
          }
          </select>
          <select name="selected-habitat" #selectedHabitat>
            <option value="">--Choissisez un habitat</option>
            @for(animal of datasource; track animal) {
            <option [value]="animal.id_habitat">{{ animal.habitat }}</option>
          }
          </select>

          
          <button class="add-btn">Enregistrer nouvel animal</button>
        </form>
  </section>
  <section [ngStyle]="{ display: updateFormIsDisplay ? 'block' : 'none' }">
        <form
          class="update-form"
          [formGroup]="updateForm"
          (ngSubmit)="updateAnimal()"
            >
            <input
            type="text"
            formControlName="firstname"
            />
            <select name="selected-breed" #selectedBreed formControlName="breed">
            @for(animal of datasource; track animal) {
            <option [value]="animal.id_breed">{{ animal.breed }}</option>
          }
          </select>
          <select name="selected-habitat" #selectedHabitat formControlName="habitat">
            @for(animal of datasource; track animal) {
            <option [value]="animal.id_habitat">{{ animal.habitat }}</option>
          }
          </select>
          <button class="add-btn">Modifier habitat</button>
        </form>
  </section>
  `,
  styleUrl: `../component-handled.component.css`,
})
export class AnimalHandledComponent implements OnInit {

  public updateForm: FormGroup

  constructor(public fb: FormBuilder) {
    this.updateForm = this.fb.group({
      firstname: new FormControl(''),
      habitat: new FormControl(''),
      breed: new FormControl(''),
      id: new FormControl('')
    })
  };

  displayColums: string[] = [
    'firstname',
    'race',
    'habitat',
    'condition',
    'image',
    'actions',
  ];

  private readonly animalService = inject(AnimalService);
  private readonly imageService = inject(ImageService);

  datasource!: Animal[];

  newAnimal: AnimalCreate = {
    firstname: '',
    habitat: '',
    breed: ''
  }

  addFormIsDisplay: boolean = false;
  updateFormIsDisplay: boolean = false;

  ngOnInit() {
    this.getAnimals()
  }

  getAnimals() {
    this.animalService.getAnimals().then((response) => {
      this.datasource = response;
    });
  }

  onFileChange(event: any, id: string) {
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append("myImg", file);
    this.imageService.addAnimalImage(formData, id).pipe(tap(()=>{this.getAnimals()})).subscribe()
  }

  deleteImage(id: string) {
    this.imageService.deleteImage(id).pipe(tap(()=>{this.getAnimals()})).subscribe()
  }

  deleteAnimal(id: string) {
    this.animalService.deleteAnimal(id).pipe(tap(()=>{this.getAnimals()})).subscribe()
  }

  toggleAddForm() {
    this.addFormIsDisplay = !this.addFormIsDisplay
  }

  onSubmit(selectedBreed: string, selectedHabitat: string) {
    this.newAnimal.breed = selectedBreed;
    this.newAnimal.habitat = selectedHabitat;
    this.animalService.addAnimal(this.newAnimal).pipe(tap(()=>{this.getAnimals()})).subscribe()
  }

  editAnimal(id: string) {
    this.updateFormIsDisplay= true;
    const animalToUpdate = this.datasource.find((el)=> el.id === id);
    this.updateForm.patchValue({firstname: animalToUpdate?.firstname, habitat: animalToUpdate?.id_habitat, breed: animalToUpdate?.id_breed, id: animalToUpdate?.id })
}

  updateAnimal() {
    this.animalService.updateAnimal(this.updateForm.value).pipe(tap(()=>{this.getAnimals()})).subscribe()
    this.updateForm.reset();
    this.updateFormIsDisplay = !this.updateFormIsDisplay
  }
}
