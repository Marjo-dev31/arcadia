import { Injectable } from '@angular/core';
import { Habitat } from '../../../shared/models';

@Injectable()
export class HabitatsService {
    url = 'http://localhost:8000/habitats';
    constructor() {}

    async getHabitats(): Promise<Habitat[]> {
        const habitatsList = await fetch(this.url).then((response)=> response.json());
        return habitatsList.data.habitats
    }
    
}