import { Component, OnInit, inject } from '@angular/core';
import { Review, ReviewPost } from '../../shared/models/reviews.interface';
import { ReviewsService } from './services/reviews.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor() {}

  private readonly reviewService = inject(ReviewsService);

  reviews!: Review[];
  newReview: ReviewPost = {
    pseudo: '',
    content: '',
    date: new Date()
  };

  result: number = 1;

  ngOnInit() {
    this.getReviews();
  }

  getReviews() {
    this.reviewService.getReviews().then((response) => {
      this.reviews = response;
    });
  }

  moreReview(min: number, max: number): number {
    return (this.result = Math.floor(Math.random() * (max - min + 1) + min));
  }


  
  onSubmit(): void {
    this.reviewService.addReview(this.newReview).subscribe();
    this.newReview.pseudo = '';
    this.newReview.content = '';
  }
}
