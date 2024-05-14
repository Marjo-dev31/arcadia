import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BreedCreate } from "../../../shared/models/breed.interface";

@Injectable()
export class BreedService {
    url = 'http://localhost:8000/breeds'

    constructor(private http: HttpClient) {}

    getBreeds(): Observable<any> {
        return this.http.get(this.url);
    }

    addBreed(breed: BreedCreate): Observable<any> {
        return this.http.post(this.url, breed)
    }

}