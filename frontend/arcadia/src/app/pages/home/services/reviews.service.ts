import { Injectable } from '@angular/core';
import { ReviewPost, Review } from '../../../shared/models/reviews.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ReviewsService {
    url = 'http://localhost:8000/avis';
    constructor(private http: HttpClient) {}

    async getReviews(): Promise<Review []> {
        const reviewsList = await fetch(this.url).then((response)=> response.json());
        return reviewsList
    }
    
    addReview(review: ReviewPost): Observable<any> {
        // const headers = {'content-type': 'application/json'};
        // const body = JSON.stringify(review)
        // console.log(review)
        return this.http.post(this.url, review)
    }
}