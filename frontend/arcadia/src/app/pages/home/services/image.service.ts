import { Injectable } from "@angular/core";
import { Image } from "../../../shared/models/image.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Form } from "@angular/forms";




@Injectable()
export class ImageService {
  url = 'http://localhost:8000/images';

  constructor( private http: HttpClient) {}

addImage(file: File): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('file', file);
  return this.http.post(this.url, formData)
}

}