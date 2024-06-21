import { Injectable } from '@angular/core';
import { Animal, AnimalCreate } from '../../../shared/models';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Response } from '../../../shared/models/response.interface';

@Injectable()
export class AnimalService {
    url = `${environment.serverUrl}/animals`;

    constructor(private http: HttpClient) {}

    async getAnimals(): Promise<Animal[]> {
        try {
        const animalsList = await fetch(this.url).then((response)=> response.json());
        return animalsList.data }
        catch (error){
            return []
        }
    }

    getHandleAnimals(): Observable<Animal[]> {
        return this.http.get<Response<Animal>>(`${this.url}/backoffice`).pipe(map((r)=>{
            if(r.data){
                return r.data
            } else {
                return []
            }
        }))
    }

    // getAnimal(id: string): Observable<any> {
    //     return this.http.get(`${this.url}/${id}`)
    // }

    addAnimal(animal: AnimalCreate): Observable<Animal[]> {
        return this.http.post<Response<Animal>>(this.url, animal).pipe(map((r)=>{
            if(r.data){
                return r.data
            }
            else{return []}
        }))
    }

    updateAnimal(animal: Animal): Observable<Response<Animal>> {
        return this.http.put<Response<Animal>>(`${this.url}/${animal.id}`, animal)
    }

    deleteAnimal(id: string): Observable <Response<Animal>> {
      return this.http.delete<Response<Animal>>(`${this.url}/${id}`)
    }

    getAnimalsByHabitat(id: string): Observable<Animal[]> {
        return this.http.get<Response<Animal>>(`${this.url}/habitats/${id}`).pipe(map((r)=>{
        if(r.data){
            return r.data
        }
        else{return []}
    }))
    }
}
