import { Component, OnInit, inject } from '@angular/core';
import { Review, ReviewPost } from '../../shared/models/reviews.interface';
import { ReviewsService } from './services/reviews.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor() {}

  reviews!: Review[];
  newReview!: ReviewPost;

  private readonly reviewService = inject(ReviewsService)
  result: number = 1;


  ngOnInit() {
    this.reviewService.getReviews().then((response) => {
      this.reviews = response;
    });
  }

  moreReview(min: number, max: number): number {
    return (this.result = Math.floor(Math.random() * (max - min + 1) + min));
  }


}
