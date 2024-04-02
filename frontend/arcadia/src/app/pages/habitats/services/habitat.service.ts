import { Injectable } from '@angular/core';

@Injectable()
export class HabitatsService {
    url = 'http://localhost:8000/habitats';
    constructor() {}

    async getHabitats(): Promise<any> {
        const habitatsList = await fetch(this.url).then((response)=> response.json());
        return habitatsList
    }
    
}