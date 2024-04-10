import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConnexionComponent } from './pages/connection/connection.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HabitatsComponent } from './pages/habitats/habitats.component';
import { BackofficeComponent } from './pages/backoffice/backoffice.component';
import { ServiceHandledComponent } from './pages/backoffice/component-handled/admin/service-handled.component';
import { HabitatHandledComponent } from './pages/backoffice/component-handled/admin/habitat-handled.component';
import { AnimalHandledComponent } from './pages/backoffice/component-handled/admin/animal-handled.component';
import { ReviewHandledComponent } from './pages/backoffice/component-handled/employed/review-handled.component';
import { AccountHandledComponent } from './pages/backoffice/component-handled/admin/account-handled.component';
import { VeterinarianReportHandledComponent } from './pages/backoffice/component-handled/veterinarian/veterinarian-report-handled.component';
import { EmployedReportHandledComponent } from './pages/backoffice/component-handled/employed/employed-animal-report-handled.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'habitats', component: HabitatsComponent },
  { path: 'connexion', component: ConnexionComponent },
  {
    path: 'espacepersonnel',
    component: BackofficeComponent,
    children: [
      { path: 'services', component: ServiceHandledComponent },
      { path: 'habitats', component: HabitatHandledComponent },
      { path: 'animaux', component: AnimalHandledComponent},
      { path: 'avis', component: ReviewHandledComponent},
      { path: 'creationdecompte', component: AccountHandledComponent},
      { path: 'rapportveterinaire', component: VeterinarianReportHandledComponent},
      { path: 'rapportemploye', component: EmployedReportHandledComponent}
    ],
  },
];
