import { Injectable } from '@angular/core';
import { Animal, AnimalCreate } from '../../../shared/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AnimalService {
    url = `${environment.serverUrl}/animals`;

    constructor(private http: HttpClient) {}

    async getAnimals(): Promise<Animal[]> {
        try {
        const animalsList = await fetch(this.url).then((response)=> response.json());
        return animalsList.data.animals }
        catch (error){
            return []
        }
    }

    getHandleAnimals(): Observable<any> {
        return this.http.get(`${this.url}/backoffice`)
    }

    getAnimal(id: string): Observable<any> {
        return this.http.get(`${this.url}/${id}`)
    }

    addAnimal(animal: AnimalCreate): Observable<any> {
        return this.http.post(this.url, animal)
    }

    updateAnimal(animal: Animal): Observable<any> {
        return this.http.put(`${this.url}/${animal.id}`, animal)
    }

    deleteAnimal(id: string): Observable<any> {
      return this.http.delete(`${this.url}/${id}`)
    }

    getAnimalsByHabitat(id: string): Observable<any> {
        return this.http.get(`${this.url}/habitats/${id}`)
    }
}
