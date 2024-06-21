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

    getHandleAnimals(): Observable<ResponseAnimal> {
        return this.http.get<ResponseAnimal>(`${this.url}/backoffice`);
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

    updateAnimal(animal: Animal): Observable<ResponseAnimal> {
        return this.http.put<ResponseAnimal>(`${this.url}/${animal.id}`, animal)
    }

    deleteAnimal(id: string): Observable<ResponseAnimal> {
      return this.http.delete<ResponseAnimal>(`${this.url}/${id}`)
    }

    getAnimalsByHabitat(id: string): Observable<ResponseAnimal> {
        return this.http.get<ResponseAnimal>(`${this.url}/habitats/${id}`)
         
    }
}
