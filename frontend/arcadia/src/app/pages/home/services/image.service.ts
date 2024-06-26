import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';

@Injectable()
export class ImageService {
  url = `${environment.serverUrl}/images`;

  constructor( private http: HttpClient) {}

addServiceImage(image: any, id: string): Observable<any> {
  return this.http.post(`${this.url}/service/${id}`, image )
};

addHabitatImage(image: any, id: string): Observable<any> {
  return this.http.post(`${this.url}/habitat/${id}`, image )
};

addAnimalImage(image: any, id: string): Observable<any> {
  return this.http.post(`${this.url}/animal/${id}`, image )
}

deleteImage(id: string): Observable<any> {
  return this.http.delete(`${this.url}/${id}`)
}



}