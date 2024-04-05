import { Injectable } from '@angular/core';
import { Reviews } from '../../../shared/models/reviews.interface';

@Injectable()
export class ReviewsService {
    url = 'http://localhost:8000/avis';
    constructor() {}

    async getReviews(): Promise<Reviews []> {
        const reviewsList = await fetch(this.url).then((response)=> response.json());
        return reviewsList
    }
    
}