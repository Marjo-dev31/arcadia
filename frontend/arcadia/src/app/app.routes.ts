import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HabitatsComponent } from './pages/habitats/habitats.component';
import { BackofficeComponent } from './pages/backoffice/backoffice.component';
import { ServiceHandledComponent } from './pages/backoffice/component-handled/shared/service-handled.component';
import { HabitatHandledComponent } from './pages/backoffice/component-handled/admin/habitat-handled.component';
import { AnimalHandledComponent } from './pages/backoffice/component-handled/admin/animal-handled.component';
import { ReviewHandledComponent } from './pages/backoffice/component-handled/employee/review-handled.component';
import { AccountHandledComponent } from './pages/backoffice/component-handled/admin/account-handled.component';
import { VeterinaryReportHandledComponent } from './pages/backoffice/component-handled/veterinary/veterinary-report-handled.component';
import { EmployeeReportHandledComponent } from './pages/backoffice/component-handled/employee/employee-animal-report-handled.component';
import { FameComponent } from './pages/backoffice/component-handled/shared/fame.component';
import { OpeningComponent } from './pages/backoffice/component-handled/admin/opening.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';
import { ForbiddenComponent } from './pages/backoffice/component-handled/shared/forbidden.component';
import { ErrorComponent } from './shared/components/errors/error.component';
import { PasswordForgotComponent } from './pages/passwordforgot/passwordforgot';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent, data: {title:'Services'} },
  { path: 'contact', component: ContactComponent, data: {title:'Contact'} },
  { path: 'habitats', component: HabitatsComponent, data: {title: 'Habitats'} },
  { path: 'connexion', component: LoginComponent, data: {title:'Connexion'} },
  {
    path: 'espacepersonnel', component: BackofficeComponent, canActivate:[AuthGuard],canActivateChild:[RoleGuard],
    children: [
      { path: 'services', component: ServiceHandledComponent, data: {expectedRoles: ['Admin', 'Employé']} },
      { path: 'habitats', component: HabitatHandledComponent, data: {expectedRoles: ['Admin']} },
      { path: 'animaux', component: AnimalHandledComponent, data: {expectedRoles: ['Admin']} },
      { path: 'avis', component: ReviewHandledComponent, data: {expectedRoles: ['Admin', 'Employé']} },
      { path: 'creationdecompte', component: AccountHandledComponent, data: {expectedRoles: ['Admin']} },
      { path: 'rapportveterinaire', component: VeterinaryReportHandledComponent, data: {expectedRoles: ['Admin', 'Vétérinaire', 'Employé']} },
      { path: 'rapportemploye', component: EmployeeReportHandledComponent, data: {expectedRoles: ['Admin', 'Employé', 'Vétérinaire']}},
      { path: 'horaires', component: OpeningComponent, data: {expectedRoles: ['Admin']} },
      { path: 'popularite', component: FameComponent, data: {expectedRoles: ['Admin', 'Vétérinaire']} },
      { path: 'accesinterdit', component: ForbiddenComponent, data: {expectedRoles: ['Admin', 'Vétérinaire', 'Employé' ]}}
    ],
  },
  { path: 'erreur', component: ErrorComponent},
  { path: 'mdpoublie', component: PasswordForgotComponent},
  { path: '**', redirectTo: '' }
];