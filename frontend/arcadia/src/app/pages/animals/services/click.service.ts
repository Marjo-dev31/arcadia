import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import {
    AnimalOnMongo,
    AnimalOnMongoCreate,
    Response,
} from "../../../shared/models";
import { environment } from "../../../environments/environment";

@Injectable()
export class ClickService {
    private readonly url = `${environment.serverUrl}/click`;

    private readonly http = inject(HttpClient);

    addClick(firstname: string): Observable<Response<AnimalOnMongo>> {
        return this.http.put<Response<AnimalOnMongo>>(
            `${this.url}/${firstname}`,
            firstname
        );
    }

    getAnimals(): Observable<Response<AnimalOnMongo>> {
        return this.http.get<Response<AnimalOnMongo>>(this.url);
    }

    addAnimalOnMongo(
        animal: AnimalOnMongoCreate
    ): Observable<Response<AnimalOnMongo>> {
        return this.http.post<Response<AnimalOnMongo>>(this.url, animal);
    }

    deleteAnimal(id: string): Observable<Response<AnimalOnMongo>> {
        return this.http.delete<Response<AnimalOnMongo>>(`${this.url}/${id}`);
    }
}
