import { AsyncPipe, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../pages/login/service/login.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgStyle, AsyncPipe],
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
            @if(loginService.isLoggin === true){
            <li><a [routerLink]="['/espacepersonnel']">EspacePersonnel</a></li>
            }
          </ul>
        </nav>
        <div>
          @if(loginService.isLoggin === true){
          <a class="login-btn" (click)="logout()">Déconnexion</a>
          } @else {
          <a class="login-btn" [routerLink]="['/connexion']">Connexion</a>
          }
          <a class="menu-btn" (click)="toggleSideDrawer()">
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
      </div>
      <div class="hero-scene">
        
      </div>
    </header>
    <aside
      id="side-drawer"
      [ngStyle]="{ display: showSideDrawer ? 'block' : 'none' }"
      (click)="toggleSideDrawer()"
    >
      <nav>
        <ul>
          <li><a [routerLink]="['/']">Accueil</a></li>
          <li><a [routerLink]="['/habitats']" [state]="{title:'Habitats'}">Habitats</a></li>
          <li><a [routerLink]="['/services']">Services</a></li>
          <li><a [routerLink]="['/contact']">Contact</a></li>
          @if(loginService.isLoggin === true){
          <li><a [routerLink]="['/espacepersonnel']">EspacePersonnel</a></li>
          <li><a (click)="logout()">Déconnexion</a></li>
          } @else {
          <li><a [routerLink]="['/connexion']">Connexion</a></li>
          }
        </ul>
      </nav>
    </aside>
  `,
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  showSideDrawer = false;

  constructor(public route: Router) {}

  loginService = inject(LoginService);

  ngOnInit(){ 
  }

  toggleSideDrawer() {
    this.showSideDrawer = !this.showSideDrawer;
  }

  logout() {
    this.loginService.logout();
    this.route.navigateByUrl('/');
  }
}
