import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HabitatsComponent } from './pages/habitats/habitats.component';
import { BackofficeComponent } from './pages/backoffice/backoffice.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'habitats', component: HabitatsComponent },
    { path: 'connexion', component: ConnexionComponent },
    { path: 'backoffice', component: BackofficeComponent },

];
