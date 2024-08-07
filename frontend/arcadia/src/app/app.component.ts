import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { ServiceService } from "./shared/services/service.service";
import { HabitatsService } from "./shared/services/habitat.service";
import { AnimalService } from "./shared/services/animal.service";
import { MatDialogModule } from "@angular/material/dialog";
import { ReviewsService } from "./shared/services/reviews.service";
import { FormsModule } from "@angular/forms";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { SidenavComponent } from "./pages/backoffice/sidenav/sidenav.component";
import { ImageService } from "./shared/services/image.service";
import { BreedService } from "./shared/services/breed.service";
import { VeterinaryService } from "./shared/services/veterinary.service";
import { UserService } from "./shared/services/user.service";
import { EmployeeService } from "./shared/services/employee.service";
import { RoleService } from "./shared/services/role.service";
import { LoginService } from "./shared/services/login.service";
import { ClickService } from "./shared/services/click.service";
import { OpeningService } from "./shared/services/opening.service";
import { MailService } from "./shared/services/mail.service";

@Component({
    selector: "app-root",
    standalone: true,
    providers: [
        ServiceService,
        HabitatsService,
        AnimalService,
        ReviewsService,
        ImageService,
        BreedService,
        VeterinaryService,
        UserService,
        EmployeeService,
        RoleService,
        LoginService,
        ClickService,
        OpeningService,
        MailService,
    ],
    imports: [
        RouterOutlet,
        HeaderComponent,
        FooterComponent,
        MatDialogModule,
        FormsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatTableModule,
        SidenavComponent,
        MatFormFieldModule,
        MatInputModule,
    ],
    template: ` <!-- header -->
        <app-header />
        <!-- component -->
        <router-outlet></router-outlet>
        <!-- footer  -->
        <app-footer />`,
    styles: `
        app-footer {
            margin-top: auto;
        }`,
})
export class AppComponent {
    title = "arcadia";
}
