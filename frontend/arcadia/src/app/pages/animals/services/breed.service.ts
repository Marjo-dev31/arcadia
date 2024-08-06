import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { Breed, BreedCreate, Response } from "../../../shared/models";
import { environment } from "../../../environments/environment";

@Injectable()
export class BreedService {
    private readonly url = `${environment.serverUrl}/breeds`;

    private readonly http = inject(HttpClient);
    
    getBreeds(): Observable<Breed[]> {
        return this.http.get<Response<Breed>>(this.url).pipe(
            map((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return [];
                }
            })
        );
    }

    addBreed(breed: BreedCreate): Observable<Response<Breed>> {
        return this.http.post<Response<Breed>>(this.url, breed);
    }
}
