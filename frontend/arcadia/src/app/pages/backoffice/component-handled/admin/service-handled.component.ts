import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Service, ServiceCreate } from '../../../../shared/models/service.interface';
import { ServiceService } from '../../../services/service/service.service';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { tap } from 'rxjs';
import { ImageService } from '../../../home/services/image.service';
import { Image, ImageCreate } from '../../../../shared/models/image.interface';


@Component({
  selector: 'app-service-handled',
  standalone: true,
  imports: [MatTableModule, MatIconModule, ReactiveFormsModule, NgStyle, FormsModule],
  template: `
    <h3>Services</h3>
    <section>
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
            <!-- <img src="{{ service.image }}" alt="" /> -->
            <input type="file" class="file-input" (change)="onFileChange($event)">
            <!-- <div> {{filename || "Il n'y a pas encore de photo"}}</div> -->
            <button mat-mini-fab color="primary" class="upload-btn" (click)="addImage()">
              <mat-icon>attach_file</mat-icon>
            </button>
          </td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let service">
            <mat-icon (click)="editService(service.id)">create</mat-icon>
            <mat-icon (click)="deleteService(service.id)" >delete</mat-icon>
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
          <input type="file" value="" />
          <button class="add-btn">Modifier service</button>
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

  file!: File;

  ngOnInit() {
    this.getServices();  
  }

  getServices() {
      this.serviceService.getServices().then((response) => {
      // console.log(response, 'toto')
      this.datasource = response;
      // console.log(this.datasource, 'tata')
    });
  }

  toggleAddForm() {
    this.addFormIsDisplay = !this.addFormIsDisplay;
    // console.log(this.addFormIsDisplay);
  }
  
  onSubmit(): void {
    this.serviceService.addService(this.newService).subscribe();
    console.log(this.newService.title);
  }

  editService(id: string) {
    this.updateFormIsDisplay = true;
    const serviceToUpdate = this.datasource.find((el)=> el.id === id)
    // console.log(serviceToUpdate)
    this.serviceForm.patchValue({id: serviceToUpdate?.id , title : serviceToUpdate?.title, description : serviceToUpdate?.description })
    console.log(this.serviceForm.value)
  }

  updateService() {
    this.serviceService.updateService(this.serviceForm.value).pipe(tap(()=>{this.getServices();})).subscribe();
    // console.log(this.serviceForm.value)
    
  }

  deleteService(id:string) {
    this.serviceService.deleteService(id).pipe(tap(()=>{this.getServices();})).subscribe();
    this.getServices();
  }

  onFileChange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
  }

  addImage() {
    this.imageService.addImage(this.file).subscribe(res => {console.log('titi', res)})
  }


}
