import { Injectable } from '@angular/core';
import { ReviewPost, Review } from '../../../shared/models/reviews.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Response } from '../../../shared/models/response.interface';


@Injectable()
export class ReviewsService {
    url = `${environment.serverUrl}/reviews`;
    constructor(private http: HttpClient) {}

    async getReviews(): Promise<Review[]> {
        const reviewsList = await fetch(this.url).then((response)=> response.json());
        return reviewsList.data
    }

    getHandleReviews(): Observable<Response<Review>> {
        return this.http.get<Response<Review>>(`${this.url}/backoffice`)
    }
    
    addReview(review: ReviewPost): Observable<Response<Review>> {
        return this.http.post<Response<Review>>(this.url, review)
    }

    updateReview(review: Review): Observable<Response<Review>>{
        return this.http.put<Response<Review>>(this.url + '/' + review.id, review)
    }
}