import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Review } from '../../../../shared/models';
import { ReviewsService } from '../../../home/services/reviews.service';

@Component({
  selector: 'app-review-handled',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  template: `
    <h3>Avis</h3>
    @if(responseMessage === 'No reviews found'){
      <p>Il n'y a pas d'avis</p>
    }
    <table mat-table [dataSource]="datasource">
      <ng-container matColumnDef="pseudo">
        <th mat-header-cell *matHeaderCellDef>Pseudo</th>
        <td mat-cell *matCellDef="let review">{{ review.pseudo }}</td>
      </ng-container>
      <ng-container matColumnDef="content">
        <th mat-header-cell *matHeaderCellDef>Avis</th>
        <td mat-cell *matCellDef="let review">{{ review.content }}</td>
      </ng-container>
      <ng-container matColumnDef="date">
        <th mat-header-cell *matHeaderCellDef>Date</th>
        <td mat-cell *matCellDef="let review">{{ review.date }}</td>
      </ng-container>
      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef>Etat actuel</th>
        <td mat-cell *matCellDef="let review">
          @if(review.status == true){
          <div>Publié</div>
          } @else {
          <div>Refusé</div>
          }
        </td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Action</th>
        <td mat-cell *matCellDef="let review">
          <mat-icon (click)="publishReview(review.id)">cloud_done</mat-icon>
          <mat-icon (click)="unpublishReview(review.id)">cloud_off</mat-icon>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayColums"></tr>
      <tr mat-row *matRowDef="let row; columns: displayColums"></tr>
    </table>
  `,
  styleUrl: `../component-handled.component.css`,
})
export class ReviewHandledComponent implements OnInit {
  constructor() {}

  displayColums: string[] = ['pseudo', 'content', 'date', 'actions', 'status'];

  datasource: Review[] = [];
  private readonly reviewService = inject(ReviewsService);
  responseMessage: string = '';

  ngOnInit() {
    this.getReviews();
  }

  getReviews() {
    this.reviewService.getHandleReviews().subscribe((response) => {
      try {
        this.datasource = response.data.reviews;
        this.responseMessage = response.message;
      } catch (error) {
        this.responseMessage = response.message;
      }
    });
  }

  publishReview(id: string) {
    const reviewToPublish = this.datasource.find((el) => el.id === id);
    if (reviewToPublish) {
      reviewToPublish.status = true;
      reviewToPublish.id_employee = localStorage.getItem('firstname') || ''
      this.reviewService.updateReview(reviewToPublish).subscribe();
    }
  }

  unpublishReview(id: string) {
    const reviewToPublish = this.datasource.find((el) => el.id === id);
    if (reviewToPublish) {
      reviewToPublish.status = false;
      this.reviewService.updateReview(reviewToPublish).subscribe();
    }
  }
}
