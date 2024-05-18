import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AnimalOnMongoCreate } from "../../../shared/models";


@Injectable()
export class ClickService {
    url = 'http://13.39.80.204:8000/click'

    constructor(private http: HttpClient){}

    addClick(firstname: string): Observable<any> {
        return this.http.put(`${this.url}/${firstname}`, firstname)
    }

    getAnimals(): Observable<any> {
        return this.http.get(this.url)
    }

    addAnimalOnMongo(animal: AnimalOnMongoCreate): Observable<any> {
        return this.http.post(this.url, animal)
    }

    deleteAnimal(id: string){
        return this.http.delete(`${this.url}/${id}`)
    }
}