import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';



@Component({
  selector: 'app-veterinarian-animal-report-handled',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  template: `
    <section>
    <table mat-table [dataSource]="datasource">
      <ng-container matColumnDef="healthcondition">
        <th mat-header-cell *matHeaderCellDef>Etat de santé</th>
        <td mat-cell *matCellDef></td>
      </ng-container>
      <ng-container matColumnDef="food">
        <th mat-header-cell *matHeaderCellDef>Nourriture recommandée</th>
        <td mat-cell *matCellDef></td>
      </ng-container>
      <ng-container matColumnDef="grammage">
        <th mat-header-cell *matHeaderCellDef>Grammage</th>
        <td mat-cell *matCellDef></td>
      </ng-container>
      <ng-container matColumnDef="healthconditiondetails">
        <th mat-header-cell *matHeaderCellDef>Détails de l'état de santé</th>
        <td mat-cell *matCellDef></td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Action</th>
        <td mat-cell *matCellDef>
          <mat-icon>create</mat-icon>
          <mat-icon>delete</mat-icon>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayColumsAnimalsReport"></tr>
      <tr mat-row *matRowDef="let row; columns: displayColumsAnimalsReport"></tr>
    </table>
    <mat-icon class="add-icon">add_circle_outline</mat-icon>
  </section>
  `,
  styleUrl: `../component-handled.component.css`,
})
export class VeterinarianAnimalReportHandledComponent implements OnInit {
  constructor() {}

  displayColumsAnimalsReport: string[] = [
    'healthcondition',
    'food',
    'grammage',
    'healthconditiondetails',
    'actions'
  ];

  report!: string[]


  datasource!: [];
  // private readonly habitatService = inject(HabitatsService);

  ngOnInit() {
    // this.habitatService.getHabitats().then((response) => {
      // this.datasource = response;
    // });
  }
}
