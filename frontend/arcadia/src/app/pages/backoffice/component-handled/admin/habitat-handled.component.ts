import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Habitat, HabitatCreate } from '../../../../shared/models';
import { HabitatsService } from '../../../habitats/services/habitat.service';
import { tap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { ImageService } from '../../../home/services/image.service';



@Component({
  selector: 'app-habitat-handled',
  standalone: true,
  imports: [MatTableModule, MatIconModule, ReactiveFormsModule, NgStyle, FormsModule],
  template: `
  <h3>Habitats</h3>
  <section>
    @if(datasource && datasource.length === 0){
      <p>Il n'y a pas d'habitat</p>
    }
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
      </ng-container>
      <ng-container matColumnDef="image">
        <th mat-header-cell *matHeaderCellDef>Photo</th>
        <td mat-cell *matCellDef="let habitat">
          @if(habitat.image_url) {
          <div class="delete-img">
            <div>{{ habitat.image_url }}</div>
            <mat-icon class="mat-icon-clear" (click)="deleteImage(habitat.image_id)">clear</mat-icon>
          </div>} @else {
            <p>Il n'y a pas encore de photo associé à cet habitat</p>
          }
          <input type="file" class="file-input" (change)="onFileChange($event, habitat.id)" >
        </td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let habitat">
          <mat-icon (click)="editHabitat(habitat.id)">create</mat-icon>
          <mat-icon (click)="deleteHabitat(habitat.id)">delete</mat-icon>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayColums"></tr>
      <tr mat-row *matRowDef="let row; columns: displayColums"></tr>
    </table>
    <mat-icon class="add-icon" (click)="toggleAddForm()" >add_circle_outline</mat-icon>
  </section>
  <section [ngStyle]="{ display: addFormIsDisplay ? 'block' : 'none' }">
        <form
          class="add-form"
          #form="ngForm"
          name="addform"
          (ngSubmit)="onSubmit()"
        >
          <input
            type="text"
            placeholder="Titre"
            name="title"
            [(ngModel)]="newHabitat.title"
            #title="ngModel"
            required
          />
          @if(title.invalid && title.touched){
          <p class="alert">Un titre est requis</p>
        }
          <textarea
            name="description"
            placeholder="Description"
            cols="30"
            rows="10"
            [(ngModel)]="newHabitat.description"
            #description="ngModel"
            required
          ></textarea>
          @if(description.invalid && description.touched){
          <p class="alert">Une description est requise</p>
        }
          <button class="add-btn">Enregistrer nouvel habitat</button>
        </form>
  </section>
  <section [ngStyle]="{ display: updateFormIsDisplay ? 'block' : 'none' }">
        <form
          class="update-form"
          [formGroup]="habitatForm"
          (ngSubmit)="updateHabitat()"
            >
            <input
            type="text"
            formControlName="title"
            />
            @if(habitatForm.controls['title'].invalid && habitatForm.controls['title'].touched){
              <div class="alert">Un titre est requis</div>
            }
          <textarea
            formControlName="description"
            cols="30"
            rows="10"></textarea>
            @if(habitatForm.controls['description'].invalid && habitatForm.controls['description'].touched){
              <div class="alert">Une description est requise</div>
            }
          <button class="add-btn">Modifier habitat</button>
        </form>
  </section>
  `,
  styleUrl: `../component-handled.component.css`,
})
export class HabitatHandledComponent implements OnInit {

  public habitatForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.habitatForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      id: new FormControl('')
    })};

  private readonly habitatService = inject(HabitatsService);
  private readonly imageService = inject(ImageService);


  displayColums: string[] = [
    'title',
    'description',
    'animals',
    'actions',
    'image'
  ];

  datasource!: Habitat[];

  newHabitat: HabitatCreate = {
    title: '',
    description: ''
  };

  addFormIsDisplay: boolean = false;
  updateFormIsDisplay: boolean = false;


  ngOnInit() {
   this.getHabitats();
  }

  getHabitats() {
     this.habitatService.getHandleHabitats().subscribe((response) => {
      this.datasource = response.data.habitats;
    });
  }
  
  editHabitat(id: string){
    this.updateFormIsDisplay = true;
    const habitatToUpdate = this.datasource.find((el)=> el.id === id);
    this.habitatForm.patchValue({id: habitatToUpdate?.id, title: habitatToUpdate?.title, description: habitatToUpdate?.description})
  };

  updateHabitat() {
   this.habitatService.updateHabitat(this.habitatForm.value).pipe(tap(()=>{this.getHabitats()})).subscribe();
   this.habitatForm.reset();
   this.updateFormIsDisplay = !this.updateFormIsDisplay
  }

  toggleAddForm(){
    this.addFormIsDisplay = !this.addFormIsDisplay
  }

  onSubmit() {
    this.habitatService.addHabitat(this.newHabitat).pipe(tap(()=>{this.getHabitats()})).subscribe();
    this.newHabitat.description = '';
    this.newHabitat.title = '';
    this.addFormIsDisplay = !this.addFormIsDisplay
  };


  deleteHabitat(id:string) {
  this.habitatService.deleteHabitat(id).pipe(tap(()=>{this.getHabitats()})).subscribe();
};

  onFileChange(event: any, id:string) {
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append("myImg", file);
    this.imageService.addHabitatImage(formData, id).pipe(tap(()=>{this.getHabitats()})).subscribe()
};

  deleteImage(id: string) {
    this.imageService.deleteImage(id).pipe(tap(()=>{this.getHabitats()})).subscribe()
  }

}
