import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatToolbarModule, MatIcon, NgStyle],
  template: `
    <mat-sidenav-container autosize>
      <mat-sidenav #drawer mode="side" class="sidenav">
        <h3>Bonjour user</h3>
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
      <mat-sidenav-content>
        <mat-toolbar>
          <button mat-icon-button class="icon-btn" (click)="drawer.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
        </mat-toolbar>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrl: `./sidenav.component.css`,
})
export class SidenavComponent implements OnInit {
  constructor() {}

  sidenavState = false;
  ngOnInit() {}
}
