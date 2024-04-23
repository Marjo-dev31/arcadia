import { Injectable } from "@angular/core";
import { Image, ImageCreate } from "../../../shared/models/image.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Form } from "@angular/forms";




@Injectable()
export class ImageService {
  url = 'http://localhost:8000/images/service';

  constructor( private http: HttpClient) {}

addImage(image: any, id: string): Observable<any> {
  return this.http.post(`${this.url}/${id}`, image )
}

}