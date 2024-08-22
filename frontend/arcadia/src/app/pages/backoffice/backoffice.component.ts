import { Component, inject } from "@angular/core";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { ActivatedRoute, RouterOutlet } from "@angular/router";


@Component({
    selector: "app-backoffice",
    standalone: true,
    imports: [SidenavComponent, RouterOutlet],
    template: ` <main>
        <h1 class="title">{{ title }}</h1>
        <app-sidenav></app-sidenav>
    </main>`,
})
export class BackofficeComponent {
    private readonly route = inject(ActivatedRoute)
    
    title: string = this.route.snapshot.data["title"];
}
