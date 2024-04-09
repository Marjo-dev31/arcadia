import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConnexionComponent } from './pages/connection/connection.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HabitatsComponent } from './pages/habitats/habitats.component';
import { BackofficeComponent } from './pages/backoffice/backoffice.component';
import { ServiceHandledComponent } from './pages/backoffice/component-handled/service-handled.component';
import { HabitatHandledComponent } from './pages/backoffice/component-handled/habitat-handled.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'habitats', component: HabitatsComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'espacepersonnel', component: BackofficeComponent, children: [{path: 'services', component: ServiceHandledComponent}, {path: 'habitats', component: HabitatHandledComponent}]},
  
];
