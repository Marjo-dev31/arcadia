import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class BreedService {
    url = 'http://localhost:8000/breeds'

    constructor(private http: HttpClient) {}

    getBreeds(): Observable<any> {
        return this.http.get(this.url);
    }


}