import { Injectable, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Opening } from '../../../shared/models/opening.interface';
import { environment } from '../../../environments/environment';
import { Response } from '../../../shared/models/response.interface';


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

  getOpeningToPublic(): Observable<Opening[]> {
      return this.http.get<Opening[]>(this.url)
  }

  getHandleOpeningToPublic(): Observable<Opening[]> {
    return this.http.get<Opening[]>(`${this.url}/backoffice`)
  }

  updateOpeningToPublic(opening: Opening, id:string): Observable<Opening> {
    this.schedule.set(opening)
    return this.http.put<Opening>(`${this.url}/${id}`, opening)
  }

}
