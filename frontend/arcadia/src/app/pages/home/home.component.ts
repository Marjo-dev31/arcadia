import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Review, ReviewPost } from '../../shared/models/reviews.interface';
import { ReviewsService } from './services/reviews.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterLink],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  private readonly reviewService = inject(ReviewsService);
  private readonly destroyRef = inject(DestroyRef);

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

  onSubmit(form: NgForm): void {
    this.reviewService.addReview(this.newReview).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    form.reset() 
  }
}
