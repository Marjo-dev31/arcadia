import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class OpeningService {
  url = 'http://localhost:8000/opening';


  constructor( private http: HttpClient) {}

  getOpening(){
    
  }

}
