import { Component } from "@angular/core";

@Component({
    selector: "app-forbidden",
    standalone: true,
    template: `
        <h3>Accès interdit</h3>
        <p>Vous n'avez pas accès à cette section</p>
    `,
    styleUrl: `../../component-handled.component.css`,
})
export class ForbiddenComponent {}
