import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { VeterinaryHabitatReportHandledComponent } from "./veterinary-habitat-report-handled.component";
import { VeterinaryAnimalReportHandledComponent } from './veterinary-animal-report-handled.component';


@Component({
  selector: 'app-veterinary-report-handled',
  standalone: true,
  imports: [MatTableModule, MatIconModule, VeterinaryAnimalReportHandledComponent, VeterinaryHabitatReportHandledComponent],
  template: `
    <h3>Compte-rendu vétérinaire</h3>
    <!-- <app-veterinary-animal-report-handled></app-veterinary-animal-report-handled> -->
    <app-veterinary-habitat-report-handled></app-veterinary-habitat-report-handled>
  `,
  styleUrl: `../component-handled.component.css`,
})
export class VeterinaryReportHandledComponent implements OnInit {
  constructor() {}

  ngOnInit() {
  
  }
}
