import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { VeterinarianHabitatReportHandledComponent } from "./veterinarian-habitat-report-handled.component";
import { VeterinarianAnimalReportHandledComponent } from './veterinarian-animal-report-handled.component';


@Component({
  selector: 'app-veterinarian-report-handled',
  standalone: true,
  imports: [MatTableModule, MatIconModule, VeterinarianHabitatReportHandledComponent, VeterinarianAnimalReportHandledComponent],
  template: `
    <h3>Compte-rendu vétérinaire</h3>
    <app-veterinarian-animal-report-handled></app-veterinarian-animal-report-handled>
    <app-veterinarian-habitat-report-handled></app-veterinarian-habitat-report-handled>
  `,
  styleUrl: `../component-handled.component.css`,
})
export class VeterinarianReportHandledComponent implements OnInit {
  constructor() {}


 


  ngOnInit() {
  
  }
}
