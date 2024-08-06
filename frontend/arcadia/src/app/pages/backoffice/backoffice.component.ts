import { Component } from "@angular/core";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { ActivatedRoute, RouterOutlet } from "@angular/router";

@Component({
    selector: "app-backoffice",
    standalone: true,
    imports: [SidenavComponent, RouterOutlet],
    template: ` <main>
        <app-sidenav></app-sidenav>
    </main>`,
})
export class BackofficeComponent {
    title: string;

    constructor(public route: ActivatedRoute) {
        this.title = route.snapshot.data["title"];
    }
}
