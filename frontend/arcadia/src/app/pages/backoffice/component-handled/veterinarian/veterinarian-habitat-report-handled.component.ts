import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { HabitatsService } from '../../../habitats/services/habitat.service';
import { Habitat } from '../../../../shared/models';


@Component({
  selector: 'app-veterinarian-habitat-report-handled',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  template: `
  <section>
    <table mat-table [dataSource]="datasource">
      <ng-container matColumnDef="habitat">
        <th mat-header-cell *matHeaderCellDef>Habitat</th>
        <td mat-cell *matCellDef="let habitat"> {{habitat.title}}</td>
      </ng-container>
      <ng-container matColumnDef="comment">
        <th mat-header-cell *matHeaderCellDef>Commentaire</th>
        <td mat-cell *matCellDef></td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Action</th>
        <td mat-cell *matCellDef>
          <mat-icon>create</mat-icon>
          <mat-icon>delete</mat-icon>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayColumsHabitatsComment"></tr>
      <tr mat-row *matRowDef="let row; columns: displayColumsHabitatsComment"></tr>
    </table>
    <mat-icon class="add-icon">add_circle_outline</mat-icon>
  </section>
  `,
  styleUrl: `../component-handled.component.css`,
})
export class VeterinarianHabitatReportHandledComponent implements OnInit {
  constructor() {}

  displayColumsHabitatsComment: string[] = [
  'habitat',
  'comment',
  'actions'
]

  report!: string[]


  datasource!: Habitat[];
  private readonly habitatService = inject(HabitatsService);

  ngOnInit() {
    this.habitatService.getHabitats().then((response) => {
      this.datasource = response;
    });
  }
}
