import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule} from '@angular/material/table';
import { Service } from '../../../shared/models/service.interface';
import { ServiceService } from '../../services/service/service.service';

@Component({
    selector: 'app-service-handled',
    standalone: true,
    imports: [MatTableModule, MatIconModule],
    template: `
    <h3>Services</h3>
    <table mat-table [dataSource]="datasource">
        <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef>Titre</th>
            <td mat-cell *matCellDef="let service">{{service.title}}</td>
        </ng-container>
        <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef>Description</th>
            <td mat-cell *matCellDef="let service">{{service.description}}</td>
        </ng-container>
        <ng-container matColumnDef="image">
            <th mat-header-cell *matHeaderCellDef>Photo</th>
            <td mat-cell *matCellDef="let service"><img src="{{service.image}}" alt=""></td>
        </ng-container>
        <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Action</th>
            <td mat-cell *matCellDef>
                <mat-icon>create</mat-icon>
                <mat-icon>delete</mat-icon>
            </td>
        </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayColums"></tr>
    <tr mat-row *matRowDef="let row; columns: displayColums;"></tr>
    </table>
    <mat-icon class="add-icon">add_circle_outline</mat-icon>
    `,
    styleUrl: `./component-handled.component.css`,
})

export class ServiceHandledComponent implements OnInit {
    constructor() {}

displayColums: string[] = ['title', 'description', 'image', 'actions'];

datasource! :Service[];
private readonly serviceService = inject(ServiceService);

    ngOnInit() { 
        this.serviceService.getServices().then(response => {
            this.datasource = response
        })
    }

}