import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Service, ServiceCreate } from '../../../../shared/models/service.interface';
import { ServiceService } from '../../../services/service/service.service';
import { FormsModule } from '@angular/forms';
import { NgStyle } from "@angular/common";

@Component({
  selector: 'app-service-handled',
  standalone: true,
  imports: [MatTableModule, MatIconModule, FormsModule, NgStyle],
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
    <mat-icon class="add-icon" (click)="toggleAddForm()">add_circle_outline</mat-icon>

    <section [ngStyle]="{'display': isToggle ? 'block' : 'none' }">
    <form  class="add-form" #form="ngForm" name="serviceform" (ngSubmit)="onSubmit()" >
      <input type="text" placeholder="Titre" name="title" [(ngModel)]="newService.title" #title="ngModel"/>
      <textarea
        name="description"
        placeholder="Description"
        cols="30"
        rows="10"
        [(ngModel)]="newService.description"
        #description="ngModel"></textarea>
      <input type="file" value=""/>
      <button class="add-btn"></button>
    </form>
  </section>
  <section>
    <form class="update-form"></form>
  </section>
  `,
  styleUrl: `../component-handled.component.css`,
})
export class ServiceHandledComponent implements OnInit {
  constructor() {}

  private readonly serviceService = inject(ServiceService);

  displayColums: string[] = ['title', 'description', 'image', 'actions'];

  datasource!: Service[];

  isToggle:boolean = false;

  newService: ServiceCreate = {
    title: '',
    description: '',
  };



  ngOnInit() {
    this.serviceService.getServices().then((response) => {
      // console.log(response, 'toto')
      this.datasource = response;

    // console.log(this.datasource, 'tata')
    });
  }

  toggleAddForm() {
    this.isToggle = !this.isToggle
    console.log(this.isToggle)
  }

  onSubmit(): void {
    this.serviceService.addService(this.newService).subscribe();
    // console.log(this.newService);

  }
}
