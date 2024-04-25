import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";




@Injectable()
export class ImageService {
  url = 'http://localhost:8000/images/';

  constructor( private http: HttpClient) {}

addServiceImage(image: any, id: string): Observable<any> {
  return this.http.post(`${this.url}/service/${id}`, image )
};

addHabitatImage(image: any, id: string): Observable<any> {
  return this.http.post(`${this.url}/habitat/${id}`, image )
};

}