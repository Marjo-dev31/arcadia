import { Injectable } from '@angular/core';

@Injectable()
export class AnimalService {
    url = 'http://localhost:8000/animaux';
    constructor() {}

    async getAnimals(): Promise<any> {
        const animalsList = await fetch(this.url).then((response)=> response.json());
        return animalsList
    }
    
}