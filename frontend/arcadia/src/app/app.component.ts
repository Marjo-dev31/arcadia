import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ServiceService } from './pages/services/service/service.service';
import { HabitatsService } from './pages/habitats/services/habitat.service';
import { AnimalService } from './pages/habitats/services/animal.service';


@Component({
  selector: 'app-root',
  standalone: true,
  providers: [ServiceService, HabitatsService, AnimalService],
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'arcadia';
}
