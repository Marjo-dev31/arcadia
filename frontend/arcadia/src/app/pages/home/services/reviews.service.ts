import { Injectable, inject } from "@angular/core";
import { ReviewPost, Review, Response } from "../../../shared/models";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable()
export class ReviewsService {
    
    private readonly http = inject(HttpClient)
    private readonly url = `${environment.serverUrl}/reviews`;
    
     // fetch required for exam
    async getReviews(): Promise<Review[]> {
        const reviewsList = await fetch(this.url).then((response) =>
            response.json()
        );
        return reviewsList.data;
    }

    getHandleReviews(): Observable<Response<Review>> {
        return this.http.get<Response<Review>>(`${this.url}/backoffice`);
    }

    addReview(review: ReviewPost): Observable<Response<Review>> {
        return this.http.post<Response<Review>>(this.url, review);
    }

    updateReview(review: Review): Observable<Response<Review>> {
        return this.http.put<Response<Review>>(
            this.url + "/" + review.id,
            review
        );
    }
}
