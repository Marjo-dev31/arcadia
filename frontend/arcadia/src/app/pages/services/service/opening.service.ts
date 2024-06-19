import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Opening } from '../../../shared/models/opening.interface';
import { environment } from '../../../environments/environment';


@Injectable()
export class OpeningService {
  url = `${environment.serverUrl}/opening`;

  schedule = signal<Opening>({
    openingTime: '',
    closingTime: '',
    openingDay: '',
    closingDay: '',
    _id: ''
  })

  constructor( private http: HttpClient) {}

  getOpeningToPublic(): Observable<any> {
      return this.http.get(this.url)
  }

  getHandleOpeningToPublic(): Observable<any> {
    return this.http.get(`${this.url}/backoffice`)
  }

  UpdateOpeningToPublic(opening: Opening, id:string): Observable<any> {
    this.schedule.set(opening)
    return this.http.put(`${this.url}/${id}`, opening)
  }

}
