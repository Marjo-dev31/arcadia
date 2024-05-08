import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Service, ServiceCreate } from '../../../../shared/models/service.interface';
import { ServiceService } from '../../../services/service/service.service';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { tap } from 'rxjs';
import { ImageService } from '../../../home/services/image.service';



@Component({
  selector: 'app-service-handled',
  standalone: true,
  imports: [MatTableModule, MatIconModule, ReactiveFormsModule, NgStyle, FormsModule],
  template: `
    <h3>Services</h3>
    <section>
      @if(datasource.length === 0){
        <p>Il n'y a pas de service</p>
      }
      <table mat-table [dataSource]="datasource">
        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef>Titre</th>
          <td mat-cell *matCellDef="let service">{{ service.title }}</td>
        </ng-container>
        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let service">{{ service.description }}</td>
        </ng-container>
        <ng-container matColumnDef="image">
          <th mat-header-cell *matHeaderCellDef>Photo</th>
          <td mat-cell *matCellDef="let service">
          @if( service.image_url){
            <div class="delete-img">
              <div>{{ service.image_url }}</div>
              <mat-icon class="mat-icon-clear" (click)="deleteImage(service.image_id)">clear</mat-icon>
            </div>} @else {
              <p>Il n'y a pas encore de photo associé à cet habitat</p>
            }
            <input type="file" class="file-input" (change)="onFileChange($event, service.id)" >
          </td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let service">
            <mat-icon (click)="editService(service.id)">create</mat-icon>
            <mat-icon (click)="deleteService(service.id)" >delete</mat-icon>
            
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayColums"></tr>
        <tr mat-row *matRowDef="let row; columns: displayColums"></tr>
      </table>
      <mat-icon class="add-icon" (click)="toggleAddForm()"
        >add_circle_outline</mat-icon
      >
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
            [(ngModel)]="newService.title"
            #title="ngModel"
          />
          <textarea
            name="description"
            placeholder="Description"
            cols="30"
            rows="10"
            [(ngModel)]="newService.description"
            #description="ngModel"
          ></textarea>
          
          <button class="add-btn">Enregistrer nouveau service</button>
        </form>
    </section>
    <section [ngStyle]="{ display: updateFormIsDisplay ? 'block' : 'none' }">
        <form
          class="update-form"
          [formGroup]="serviceForm"
          (ngSubmit)="updateService()">
          <input
            type="text"
            formControlName="title"
            />
          <textarea
            formControlName="description"
            cols="30"
            rows="10"></textarea>
          <button class="add-btn">Modifier service</button>
          <button>Annuler</button>
        </form>
    </section>
    
  `,
  styleUrl: `../component-handled.component.css`,
})
export class ServiceHandledComponent implements OnInit {

 public serviceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.serviceForm = this.fb.group({
      title: new FormControl(''),
      description: new FormControl(''),
      id: new FormControl('')
    })}

  private readonly serviceService = inject(ServiceService);
  private readonly imageService = inject(ImageService);


  displayColums: string[] = ['title', 'description', 'actions', 'image'];

  datasource!: Service[];

  addFormIsDisplay: boolean = false;
  updateFormIsDisplay: boolean = false;

  newService: ServiceCreate = {
    title: '',
    description: '',
  };
  

  ngOnInit() {
    this.getServices();  
  }

  getServices() {
      this.serviceService.getServices().then((response) => {
      this.datasource = response;
    });
  };

  toggleAddForm() {
    this.addFormIsDisplay = !this.addFormIsDisplay;
  };
  
  onSubmit(): void {
    this.serviceService.addService(this.newService).pipe(tap(()=>{this.getServices()})).subscribe();
    this.newService.title = '';
    this.newService.description = '';
    this.addFormIsDisplay = !this.addFormIsDisplay;
  };

  editService(id: string) {
    this.updateFormIsDisplay = true;
    const serviceToUpdate = this.datasource.find((el)=> el.id === id);
    this.serviceForm.patchValue({id: serviceToUpdate?.id , title : serviceToUpdate?.title, description : serviceToUpdate?.description });
  };

  updateService() {
    this.serviceService.updateService(this.serviceForm.value).pipe(tap(()=>{this.getServices()})).subscribe();
    this.serviceForm.reset();
    this.updateFormIsDisplay = !this.updateFormIsDisplay;
  };

  deleteService(id:string) {
    this.serviceService.deleteService(id).pipe(tap(()=>{this.getServices()})).subscribe();
  };

  onFileChange(event: any, id:string) {
    const file: File = event.target.files[0]
    const formData = new FormData()
    formData.append("myImg", file)
    this.imageService.addServiceImage(formData, id).pipe(tap(()=>{this.getServices()})).subscribe()
  };

  deleteImage(id: string){
    this.imageService.deleteImage(id).pipe(tap(()=>{this.getServices()})).subscribe()

  }
}
