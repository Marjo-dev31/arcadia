import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { HabitatsService } from '../../../habitats/services/habitat.service';
import { Habitat } from '../../../../shared/models';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { NgStyle } from '@angular/common';


@Component({
  selector: 'app-veterinary-habitat-report-handled',
  standalone: true,
  imports: [MatTableModule, MatIconModule, ReactiveFormsModule, NgStyle],
  template: `
  <section class="habitats-section">
    <h3>Section habitats</h3>
    <table mat-table [dataSource]="datasource">
      <ng-container matColumnDef="habitat">
        <th mat-header-cell *matHeaderCellDef>Habitat</th>
        <td mat-cell *matCellDef="let habitat"> {{habitat.title}}</td>
      </ng-container>
      <ng-container matColumnDef="comment">
        <th mat-header-cell *matHeaderCellDef>Dernier commentaire</th>
        <td mat-cell *matCellDef="let habitat"> {{habitat.comment}} </td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Action</th>
        <td mat-cell *matCellDef="let habitat">
          <!-- <mat-icon>create</mat-icon> -->
          <mat-icon (click)="deleteComment(habitat.id)">delete</mat-icon>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayColums"></tr>
      <tr mat-row *matRowDef="let row; columns: displayColums"></tr>
    </table>
    <mat-icon class="add-icon" (click)="toggleAddForm()">add_circle_outline</mat-icon>
  </section>
  <section [ngStyle]="{ display: addFormIsDisplay ? 'block' : 'none' }">
    <form [formGroup]="commentForm" (ngSubmit)="onSubmit(habitatSelected.value)">
      <select name="habitats" id="habitat-selected" #habitatSelected>
        <option>-- Choissisez un habitat --</option>
        @for(habitat of datasource; track habitat){
        <option [value]="habitat.id">{{habitat.title}}</option>
      }
      </select>
    <textarea formControlName="comment" cols="30" rows="5" placeholder="Ajouter votre commentaire ici"></textarea>
    <button >Ajouter mon commentaire</button>
    </form>
  </section>
  `,
  styleUrl: `../component-handled.component.css`,
})
export class VeterinaryHabitatReportHandledComponent implements OnInit {

  public commentForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      comment: new FormControl('')
    })
  }

  displayColums: string[] = [
  'habitat',
  'comment',
  'actions'
];

  datasource!: Habitat[];

  report!: string[]


  private readonly habitatService = inject(HabitatsService);

  addFormIsDisplay: boolean = false

  ngOnInit() {
    this.getHabitats()
  }

    getHabitats() {
      this.habitatService.getHabitats().then((response) => {
      this.datasource = response;
    })}
  
    toggleAddForm(){
      this.addFormIsDisplay = !this.addFormIsDisplay
    }

    onSubmit(id: string) {
      this.habitatService.addComment(this.commentForm.value, id).pipe(tap(()=> {this.getHabitats()})).subscribe();
      this.commentForm.reset();
      this.addFormIsDisplay = !this.addFormIsDisplay;
    }

    deleteComment(id: string) {
      this.habitatService.deleteComment(id).pipe(tap(()=> {this.getHabitats()})).subscribe();
    }
    
}
