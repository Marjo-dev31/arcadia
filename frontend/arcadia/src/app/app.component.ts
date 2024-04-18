import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ServiceService } from './pages/services/service/service.service';
import { HabitatsService } from './pages/habitats/services/habitat.service';
import { AnimalService } from './pages/animals/services/animal.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ReviewsService } from './pages/home/services/reviews.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SidenavComponent } from './pages/backoffice/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [ServiceService, HabitatsService, AnimalService, ReviewsService],
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    SidenavComponent,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'arcadia';
}
