import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Service } from '../../../../shared/models/service.interface';
import { ServiceService } from '../../../services/service/service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-handled',
  standalone: true,
  imports: [MatTableModule, MatIconModule, FormsModule],
  template: `
    <h3>Services</h3>
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
          <img src="{{ service.image }}" alt="" />
        </td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Action</th>
        <td mat-cell *matCellDef>
          <mat-icon>create</mat-icon>
          <mat-icon>delete</mat-icon>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayColums"></tr>
      <tr mat-row *matRowDef="let row; columns: displayColums"></tr>
    </table>
    <form class="form" #form="ngForm" name="serviceform" (ngSubmit)="onSubmit()">
      <input type="text" placeholder="Titre" name="title" [(ngModel)]="newService.title" #title="ngModel"/>
      <textarea
        name="description"
        placeholder="Description"
        cols="30"
        rows="10"
        [(ngModel)]="newService.description"
        #description="ngModel"></textarea>
      <input type="file" value=""/>
      <button class="add-btn"><mat-icon class="add-icon">add_circle_outline</mat-icon></button>
    </form>
  `,
  styleUrl: `../component-handled.component.css`,
})
export class ServiceHandledComponent implements OnInit {
  constructor() {}

  private readonly serviceService = inject(ServiceService);

  displayColums: string[] = ['title', 'description', 'image', 'actions'];

  datasource!: Service[];
  newService: Service = {
    id: '',
    title: '',
    description: '',
    // image: 'toto.jpg',
  };


  ngOnInit() {
    this.serviceService.getServices().then((response) => {
      console.log(response, 'toto')
      this.datasource = response;

    console.log(this.datasource, 'tata')
    });
  }

  onSubmit(): void {
    // console.log(this.newService);
    this.serviceService.addService(this.newService).subscribe();
  }
}
