import { Component, OnInit, inject } from '@angular/core';
import { HabitatsService } from './services/habitat.service';
import { Habitat } from '../../shared/models';
import { AnimalsComponent } from '../animals/animals.component';
import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';

@Component({
  selector: 'app-habitats',
  standalone: true,
  imports: [MatDialogModule],
  template: `
    <main>
      <h2>
        Au sein des vastes étendues d'Arcadia, découvrez des habitats conçus
        pour le bien-être de nos animaux.
      </h2>
      <section class="habitats">
        @if(habitats && habitats.length) {
        @for (habitat of habitats; track habitat) {
        <div class="habitat-item" (click)="toggleDetails(habitat.id)">
          <img [src]="'http://localhost:8000/upload/' + habitat.image_url" alt="photo représentative de l'habitat" class="habitat-img" />
          <div class="habitat-content">
            <h3>{{ habitat.title }}</h3>
            @if (showDetails == habitat.id) {
            <p>{{ habitat.description }}</p>
            <ul>
              @for (animal of habitat.animals; track animal) {
              <li (click)="openDialog(animal.id)">{{ animal.firstname }}</li>
              }
            </ul>
            }
          </div>
        </div>
        }} @else {
          <h3>Il n'y a pas d'habitat visible</h3>
        }
      </section>
    </main>
  `,
  styleUrl: `./habitat.component.css`,
})
export class HabitatsComponent implements OnInit {

  habitats!: Habitat[];
  private readonly habitatService = inject(HabitatsService);

  showDetails: string | undefined = undefined;

  constructor(private matdialog: MatDialog) {}

  ngOnInit() {
    this.habitatService.getHabitats().then((response) => {
      this.habitats = response;
    });
  };

  toggleDetails(id: string) {
    this.showDetails = id;
  }
  openDialog(id: string): void {
    const dialogRef = this.matdialog.open(AnimalsComponent, {
      width: '400px',
      data: {id: id},
    });
  }
}
