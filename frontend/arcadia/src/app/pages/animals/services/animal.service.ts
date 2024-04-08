import { Injectable } from '@angular/core';
import { Animal } from '../../../shared/models';

@Injectable()
export class AnimalService {
    url = 'http://localhost:8000/animal';
    constructor() {}

    async getAnimals(): Promise<Animal> {
        const animalsList = await fetch(this.url).then((response)=> response.json());
        return animalsList
    }
    
}