import { Injectable } from '@angular/core';
import { Animal } from '../../../shared/models';
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
}