import { Component, OnInit, inject } from '@angular/core';
import { HabitatsService } from './services/habitat.service';
import { Habitats } from '../../shared/models';
import { AnimalsComponent } from '../animals/animals.component';
import {
  MatDialog,
  MatDialogModule,
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
        @for (habitat of habitats; track habitat) {
        <div class="habitat-item" (click)="toggleDetails(habitat.id)">
          <img [src]="habitat.image" alt="" class="habitat-img" />
          <div class="habitat-content">
            <h3>{{ habitat.title }}</h3>
            @if (showDetails == habitat.id) {
            <p>{{ habitat.description }}</p>
            <ul>
              @for (animal of habitat.animals; track animal) {
              <li (click)="openDialog()">{{ animal.firstname }}</li>
              }
            </ul>
            }
          </div>
        </div>
        }
      </section>
    </main>
  `,
  styleUrl: `./habitat.component.css`,
})
export class HabitatsComponent implements OnInit {
  habitats!: Habitats[];
  private readonly habitatService = inject(HabitatsService);

  showDetails: number | undefined = undefined;

  constructor(private matdialog: MatDialog) {}

  ngOnInit() {
    this.habitatService.getHabitats().then((response) => {
      this.habitats = response;
    });
  }
  toggleDetails(id: number) {
    this.showDetails = id;
  }
  openDialog(): void {
    console.log('toto', AnimalsComponent);
    const dialogRef = this.matdialog.open(AnimalsComponent, {
      width: '250px',
    });
  }
}
