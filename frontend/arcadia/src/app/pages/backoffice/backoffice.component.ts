import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';

@Component({
  selector: 'app-backoffice',
  standalone: true,
  imports: [SidenavComponent],
  templateUrl: './backoffice.component.html',
  styleUrl: `./backoffice.component.css`
})
export class BackofficeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
