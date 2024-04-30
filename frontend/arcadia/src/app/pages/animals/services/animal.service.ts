import { Injectable } from '@angular/core';
import { Animal, AnimalCreate } from '../../../shared/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AnimalService {
    url = 'http://localhost:8000/animals';

    constructor(private http: HttpClient) {}

    async getAnimals(): Promise<Animal[]> {
        try {
        const animalsList = await fetch(this.url).then((response)=> response.json());
        return animalsList.data.animals }
        catch (error){
            return []
        }
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
