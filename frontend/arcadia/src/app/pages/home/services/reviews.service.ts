import { Injectable } from '@angular/core';
import { ReviewPost, Review } from '../../../shared/models/reviews.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ReviewsService {
    url = 'http://localhost:8000/reviews';
    constructor(private http: HttpClient) {}

    async getReviews(): Promise<any> {
        const reviewsList = await fetch(this.url).then((response)=> response.json());
        return reviewsList
    }

    getHandleReviews(): Observable<any> {
        return this.http.get(`${this.url}/backoffice`)
    }
    
    addReview(review: ReviewPost): Observable<any> {
        return this.http.post(this.url, review)
    }

    updateReview(review: Review){
        return this.http.put(this.url + '/' + review.id, review)
    }
}