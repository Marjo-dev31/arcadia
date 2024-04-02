import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports:[RouterLink] ,
  standalone: true,
  template: `
    <header>
      <div class="links">
        <a [routerLink]="['/']" id="logo">
          <img src="assets/images/logo L.png" alt="logo Arcadia">
        </a>
        <nav class="navbar">
          <ul class="links-pages">
            <li><a [routerLink]="['/']">Accueil</a></li>
            <li><a [routerLink]="['/habitats']">Habitats</a></li>
            <li><a [routerLink]="['/services']">Services</a></li>
            <li><a [routerLink]="['/contact']">Contact</a></li>
          </ul>
        </nav>
        <a class="connection-btn" [routerLink]="['/connexion']">Connexion</a>
        <a href="#side-drawer" class="menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
      <div class="hero-scene">
        <h1>ARCADIA</h1>
      </div>
    </header>
    <aside id="side-drawer">
      <nav>
        <ul>
          <li><a [routerLink]="['/']">Accueil</a></li>
          <li><a [routerLink]="['/habitats']">Habitats</a></li>
          <li><a [routerLink]="['/services']">Services</a></li>
          <li><a [routerLink]="['/contact']">Contact</a></li>
          <li><a [routerLink]="['/connexion']">Connexion</a></li>
        </ul>
      </nav>
    </aside>
  `,
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
