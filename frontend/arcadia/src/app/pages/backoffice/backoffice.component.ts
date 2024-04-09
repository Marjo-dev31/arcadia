import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-backoffice',
  standalone: true,
  imports: [SidenavComponent, RouterOutlet],
  templateUrl: './backoffice.component.html',
  styleUrl: `./backoffice.component.css`
})
export class BackofficeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
