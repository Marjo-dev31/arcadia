import { NgStyle } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgStyle],
  standalone: true,
  template: `
    <header>
      <div class="links">
        <a [routerLink]="['/']" id="logo">
          <img src="assets/images/logo L.png" alt="logo Arcadia" />
        </a>
        <nav class="navbar">
          <ul class="links-pages">
            <li><a [routerLink]="['/']">Accueil</a></li>
            <li><a [routerLink]="['/habitats']">Habitats</a></li>
            <li><a [routerLink]="['/services']">Services</a></li>
            <li><a [routerLink]="['/contact']">Contact</a></li>
            <li><a [routerLink]="['/espacepersonnel']">EspacePersonnel</a></li>
          </ul>
        </nav>
        <a class="login-btn" [routerLink]="['/connexion']">Connexion</a>
        <a class="menu-btn" (click)="toggleSideDrawer()">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
      <div class="hero-scene">
        <h1>Arcadia</h1>
      </div>
    </header>
    <aside id="side-drawer"
    [ngStyle]="{'display': showSideDrawer ? 'block' : 'none' }"
    (click)="toggleSideDrawer()">
      <nav>
        <ul>
          <li><a [routerLink]="['/']">Accueil</a></li>
          <li><a [routerLink]="['/habitats']">Habitats</a></li>
          <li><a [routerLink]="['/services']">Services</a></li>
          <li><a [routerLink]="['/contact']">Contact</a></li>
          <li><a [routerLink]="['/espacepersonnel']">EspacePersonnel</a></li>
          <li><a [routerLink]="['/connexion']">Connexion</a></li>
        </ul>
      </nav>
    </aside>
  `,
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  showSideDrawer = false;
  title!: string;
  constructor(public route: Router) {}

  ngOnInit() {
    // console.log(this.route.url);
    // this.title = this.route.url
    // console.log(this.showSideDrawer)
  }

  toggleSideDrawer(){
    this.showSideDrawer = !this.showSideDrawer;
  }
  

}
