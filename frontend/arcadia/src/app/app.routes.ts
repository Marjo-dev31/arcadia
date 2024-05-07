import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConnexionComponent } from './pages/login/login.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HabitatsComponent } from './pages/habitats/habitats.component';
import { BackofficeComponent } from './pages/backoffice/backoffice.component';
import { ServiceHandledComponent } from './pages/backoffice/component-handled/admin/service-handled.component';
import { HabitatHandledComponent } from './pages/backoffice/component-handled/admin/habitat-handled.component';
import { AnimalHandledComponent } from './pages/backoffice/component-handled/admin/animal-handled.component';
import { ReviewHandledComponent } from './pages/backoffice/component-handled/employee/review-handled.component';
import { AccountHandledComponent } from './pages/backoffice/component-handled/admin/account-handled.component';
import { VeterinaryReportHandledComponent } from './pages/backoffice/component-handled/veterinary/veterinary-report-handled.component';
import { EmployeeReportHandledComponent } from './pages/backoffice/component-handled/employee/employee-animal-report-handled.component';
import { FameComponent } from './pages/backoffice/component-handled/admin/fame.component';
import { OpeningComponent } from './pages/backoffice/component-handled/admin/opening.component';
import { AuthGuard } from './shared/interceptors/guards/auth.guard';
import { RoleGuard } from './shared/interceptors/guards/role.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'habitats', component: HabitatsComponent },
  { path: 'connexion', component: ConnexionComponent },
  {
    path: 'espacepersonnel', component: BackofficeComponent, canActivate:[AuthGuard, RoleGuard], data: {expectedRoles: ['Vétérinaire']} ,
    children: [
      { path: 'services', component: ServiceHandledComponent },
      { path: 'habitats', component: HabitatHandledComponent },
      { path: 'animaux', component: AnimalHandledComponent },
      { path: 'avis', component: ReviewHandledComponent },
      { path: 'creationdecompte', component: AccountHandledComponent },
      { path: 'rapportveterinaire', component: VeterinaryReportHandledComponent },
      { path: 'rapportemploye', component: EmployeeReportHandledComponent },
      { path: 'horaires', component: OpeningComponent },
      { path: 'popularite', component: FameComponent }
    ],
  },
];
