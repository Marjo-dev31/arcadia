import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor() {}

  reviews = [
    {
      id: 1,
      pseudo: 'Manon',
      content: 'Agreable moment en famille',
      date: '12/03/2023'
    },
    {
      id: 2,
      pseudo: 'Vanessa',
      content: 'Animaux heureux',
      date: '08/06/2023'
    },
    {
      id: 3,
      pseudo: 'Laurie',
      content: 'De belles prestations',
      date: '05/04/2024'
    }
  ];

  result:number = 1 

  ngOnInit() {console.log('toto',this.result)}

  moreReview(min: number, max: number): number { 
  return this.result = Math.floor(Math.random() * (max-min + 1) + min)
  }
  
}
