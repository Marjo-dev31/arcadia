import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Animal, AnimalOnMongo, AnimalOnMongoCreate } from "../../../shared/models";
import { environment } from '../../../environments/environment';
import { Response } from "../../../shared/models/response.interface";



@Injectable()
export class ClickService {
    url = `${environment.serverUrl}/click`

    constructor(private http: HttpClient){}

    addClick(firstname: string): Observable<Response<AnimalOnMongo>> {
        return this.http.put<Response<AnimalOnMongo>>(`${this.url}/${firstname}`, firstname)
    }

    getAnimals(): Observable<Response<AnimalOnMongo>> {
        return this.http.get<Response<AnimalOnMongo>>(this.url)
    }

    addAnimalOnMongo(animal: AnimalOnMongoCreate): Observable <Response<AnimalOnMongo>> {
        return this.http.post<Response<AnimalOnMongo>>(this.url, animal)
    }

    deleteAnimal(id: string): Observable<Response<AnimalOnMongo>>{
        return this.http.delete<Response<AnimalOnMongo>>(`${this.url}/${id}`)
    }
}