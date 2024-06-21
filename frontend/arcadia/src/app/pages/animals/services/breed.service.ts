import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BreedCreate } from "../../../shared/models/breed.interface";
import { environment } from '../../../environments/environment';
import { ResponseBreed } from "../../../shared/models/response.interface";


@Injectable()
export class BreedService {
    url = `${environment.serverUrl}/breeds`;

    constructor(private http: HttpClient) {}

    getBreeds(): Observable<ResponseBreed> {
        return this.http.get<ResponseBreed>(this.url);
    }

    addBreed(breed: BreedCreate): Observable<ResponseBreed> {
        return this.http.post<ResponseBreed>(this.url, breed)
    }

}