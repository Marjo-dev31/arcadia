import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule],
  template: `
    <mat-sidenav-container autosize>
      <mat-sidenav [opened]="true" mode="side" class="sidenav">
        <ul>
          <li><a href="">Horaires</a></li>
          <li><a href="">Services</a></li>
          <li><a href="">Habitats</a></li>
          <li><a href="">Animaux</a></li>
          <li><a href="">Compte-rendu vétérinaire</a></li>
          <li><a href="">Compte-rendu employé</a></li>
          <li><a href="">Modulation des avis</a></li>
          <li><a href="">Création de compte</a></li>
          <li><a href="">Popularité des animaux</a></li>
        </ul>
      </mat-sidenav>
      <mat-sidenav-content>main content</mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrl: `./sidenav.component.css`,
})
export class SidenavComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
