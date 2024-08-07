import { AsyncPipe, NgStyle } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { LoginService } from "../../services/login.service";
import { removeLocalStorage } from "../../utils/removeLocalStorage";

@Component({
    selector: "app-header",
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
                        @if(loginService.isLoggin() === true){
                        <li>
                            <a [routerLink]="['/espacepersonnel']"
                                >EspacePersonnel</a
                            >
                        </li>
                        }
                    </ul>
                </nav>
                <div class="login-btn">
                    @if(loginService.isLoggin() === true){
                    <a
                        (click)="logout()"
                        tabindex="0"
                        role="button"
                        (keyup.enter)="logout()"
                        >Déconnexion</a
                    >
                    } @else {
                    <a [routerLink]="['/connexion']">Connexion</a>
                    }
                </div>
                <div class="menu-btn">
                    <a
                        (click)="toggleSideDrawer()"
                        tabindex="0"
                        role="button"
                        (keyup.enter)="toggleSideDrawer()"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </a>
                </div>
            </div>
        </header>
        <aside
            id="side-drawer"
            [ngStyle]="{ display: showSideDrawer() ? 'block' : 'none' }"
            (click)="toggleSideDrawer()"
            tabindex="0"
            role="button"
            (keyup.enter)="toggleSideDrawer()"
        >
            <nav>
                <ul>
                    <li><a [routerLink]="['/']">Accueil</a></li>
                    <li>
                        <a
                            [routerLink]="['/habitats']"
                            [state]="{ title: 'Habitats' }"
                            >Habitats</a
                        >
                    </li>
                    <li><a [routerLink]="['/services']">Services</a></li>
                    <li><a [routerLink]="['/contact']">Contact</a></li>
                    @if(loginService.isLoggin() === true){
                    <li>
                        <a [routerLink]="['/espacepersonnel']"
                            >EspacePersonnel</a
                        >
                    </li>
                    <li>
                        <a
                            (click)="logout()"
                            tabindex="0"
                            role="button"
                            (keyup.enter)="logout()"
                            >Déconnexion</a
                        >
                    </li>
                    } @else {
                    <li><a [routerLink]="['/connexion']">Connexion</a></li>
                    }
                </ul>
            </nav>
        </aside>
    `,
    styleUrl: "./header.component.css",
})
export class HeaderComponent {
    public readonly loginService = inject(LoginService);
    private readonly route = inject(Router);

    showSideDrawer = signal(false);

    toggleSideDrawer() {
        this.showSideDrawer.update((value)=> !value);
    }

    logout() {
        removeLocalStorage()
        this.loginService.isLoggin.set(false);
        this.route.navigateByUrl('/')
    }
}
