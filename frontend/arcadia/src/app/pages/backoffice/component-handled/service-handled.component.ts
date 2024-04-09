import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

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
                <mat-icon>edit square</mat-icon>
                <mat-icon>delete</mat-icon>
            </td>
        </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayColums"></tr>
    <tr mat-row *matRowDef="let row; columns: displayColums;"></tr>
    </table>
    <button class="add-btn">+</button>
    `,
    styles: `
    img {
        width: 100px
    }
    .add-btn {
    width: 50px;
    text-align: center;
    clip-path: circle();
    font-size: var(--font-size-big-title-h1);
    color: var(--color-background);
    background-color: var(--color-primary);
    display: flex;
    justify-content: center;
    margin: auto;
  }
    `
})

export class ServiceHandledComponent implements OnInit {
    constructor() { }
displayColums: string[] = ['title', 'description', 'image', 'actions'];
datasource = [
    {
      title: "Visite guidée avec Manu",
      description:
        "Manu vous propose ses services afin de vous faire découvrir plus en détails l'habitat de votre choix. Il vous expliquera la vie ausein de celui-ci et décryptera pour vous la faune et la flore. Pensez à vous positionner dès votre arrivée au parc, les places sont limitées. Service gratuit",
      image: "assets/images/tour-guide-6816049_1280.jpg",
    },
    {
      title: "Petit Train",
      description: "Faites le tour du zoo à bord du petit train touristique",
      image: "assets/images/panneau.jpg",
    },
  ]
    ngOnInit() { }

}