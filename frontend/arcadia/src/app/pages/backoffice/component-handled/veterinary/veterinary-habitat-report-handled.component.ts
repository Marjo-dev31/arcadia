import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { HabitatsService } from '../../../habitats/services/habitat.service';
import { Habitat } from '../../../../shared/models';


@Component({
  selector: 'app-veterinary-habitat-report-handled',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  template: `
  <section class="habitats-section">
    <h3>Section habitats</h3>
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
      <tr mat-header-row *matHeaderRowDef="displayColums"></tr>
      <tr mat-row *matRowDef="let row; columns: displayColums"></tr>
    </table>
    <mat-icon class="add-icon">add_circle_outline</mat-icon>
  </section>
  <section>
    <form>
      <select name="habitats" id="habitat-select">
        @for(habitat of datasource; track habitat){
        <option value="{{habitat.id}}">{{habitat.title}}</option>}
      </select>
    <textarea name="" id="" cols="30" rows="5" placeholder="Ajouter votre commentaire ici"></textarea>
    </form>
  </section>
  `,
  styleUrl: `../component-handled.component.css`,
})
export class VeterinaryHabitatReportHandledComponent implements OnInit {
  constructor() {}

  displayColums: string[] = [
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
