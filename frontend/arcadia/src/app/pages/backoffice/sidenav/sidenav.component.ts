import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatToolbarModule, MatIcon, NgStyle, RouterLink, RouterOutlet],
  template: `
    <mat-sidenav-container autosize>
      <mat-sidenav #drawer mode="side" class="sidenav" opened>
        <h3>Bonjour user</h3>
        <ul>
          <li><a href="">Horaires</a></li>
          <li><a [routerLink]="['/espacepersonnel/services']">Services</a></li>
          <li><a [routerLink]="['/espacepersonnel/habitats']">Habitats</a></li>
          <li><a [routerLink]="['/espacepersonnel/animaux']">Animaux</a></li>
          <li><a href="">Compte-rendu vétérinaire</a></li>
          <li><a href="">Compte-rendu employé</a></li>
          <li><a href="">Modulation des avis</a></li>
          <li><a href="">Création de compte</a></li>
          <li><a href="">Popularité des animaux</a></li>
        </ul>
      </mat-sidenav>
      
      <mat-sidenav-content>
        <h3>Bienvenue dans votre espace personnel</h3>
        <mat-toolbar>
          <button mat-icon-button class="icon-btn" (click)="drawer.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
        </mat-toolbar>
        <router-outlet></router-outlet>
        
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
