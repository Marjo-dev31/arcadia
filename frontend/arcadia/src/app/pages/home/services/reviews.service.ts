import { Injectable } from '@angular/core';
import { ReviewPost, Review } from '../../../shared/models/reviews.interface';

@Injectable()
export class ReviewsService {
    url = 'http://localhost:8000/avis';
    constructor() {}

    async getReviews(): Promise<Review []> {
        const reviewsList = await fetch(this.url).then((response)=> response.json());
        return reviewsList
    }
    
    addReview(review: ReviewPost): any {
        console.log(review)
        // todo requete post hhtp client angular
    }

}