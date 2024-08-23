import { Component, OnInit, inject } from "@angular/core";
import { LoginService } from "../../services/login.service";
import { removeLocalStorage } from "../../utils/removeLocalStorage";

@Component({
    selector: "app-error",
    template: `
    <main>
        <h1 class="title">ARCADIA</h1>
        <h3>
            Oups, une erreur est survenue, veuillez ré-essayer plus tard ou
            vérifiez que vous êtes bien connecté.
        </h3>
    </main>
    `,
})
export class ErrorComponent implements OnInit {
    public readonly loginService = inject(LoginService);

    ngOnInit() {
        this.loginService.isLoggin.set(false);
        removeLocalStorage()
    }
}
