import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Breed, BreedCreate } from "../../../shared/models/breed.interface";
import { environment } from '../../../environments/environment';
import { Response } from "../../../shared/models/response.interface";



@Injectable()
export class BreedService {
    url = `${environment.serverUrl}/breeds`;

    constructor(private http: HttpClient) {}

    getBreeds(): Observable<Breed[]> {
        return this.http.get<Response<Breed>>(this.url).pipe(map((r)=>{
            if(r.data){
                return r.data
            } else {
                return []
            }
        }));
    }

    addBreed(breed: BreedCreate): Observable<Response<Breed>> {
        return this.http.post<Response<Breed>>(this.url, breed)
    }

}