import { NgStyle, TitleCasePipe } from "@angular/common";
import { Component } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
    selector: "app-sidenav",
    standalone: true,
    imports: [
        MatSidenavModule,
        MatToolbarModule,
        MatIcon,
        NgStyle,
        RouterLink,
        RouterOutlet,
        TitleCasePipe,
    ],
    template: `
        <mat-sidenav-container autosize>
            <mat-sidenav #drawer mode="side" class="sidenav" opened>
                <h3>Bonjour {{ this.userFirstname | titlecase }}</h3>
                <ul>
                    <li>
                        <a [routerLink]="['/espacepersonnel/horaires']"
                            >Horaires</a
                        >
                    </li>
                    <li>
                        <a [routerLink]="['/espacepersonnel/services']"
                            >Services</a
                        >
                    </li>
                    <li>
                        <a [routerLink]="['/espacepersonnel/habitats']"
                            >Habitats</a
                        >
                    </li>
                    <li>
                        <a [routerLink]="['/espacepersonnel/animaux']"
                            >Animaux</a
                        >
                    </li>
                    <li>
                        <a
                            [routerLink]="[
                                '/espacepersonnel/rapportveterinaire'
                            ]"
                            >Compte-rendu vétérinaire</a
                        >
                    </li>
                    <li>
                        <a [routerLink]="['/espacepersonnel/rapportemploye']"
                            >Compte-rendu employé</a
                        >
                    </li>
                    <li>
                        <a [routerLink]="['/espacepersonnel/avis']"
                            >Modulation des avis</a
                        >
                    </li>
                    <li>
                        <a [routerLink]="['/espacepersonnel/creationdecompte']"
                            >Création de compte</a
                        >
                    </li>
                    <li>
                        <a [routerLink]="['/espacepersonnel/popularite']"
                            >Popularité des animaux</a
                        >
                    </li>
                </ul>
            </mat-sidenav>

            <mat-sidenav-content>
                <h2>Bienvenue dans votre espace personnel</h2>
                <mat-toolbar>
                    <button
                        mat-icon-button
                        class="icon-btn"
                        (click)="drawer.toggle()"
                    >
                        <mat-icon>menu</mat-icon>
                    </button>
                </mat-toolbar>
                <router-outlet></router-outlet>
            </mat-sidenav-content>
        </mat-sidenav-container>
    `,
    styleUrls: ["./sidenav.component.css"],
})
export class SidenavComponent {
    userFirstname: string = localStorage.getItem("firstname") || "";
}
