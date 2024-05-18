import { Injectable } from '@angular/core';
import { Habitat, HabitatCreate } from '../../../shared/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HabitatsService {
    url = 'http://13.39.80.204:8000/habitats';

    constructor(private http: HttpClient) {}

    async getHabitats(): Promise<Habitat[]> {
        try {
        const habitatsList = await fetch(this.url).then((response)=> response.json());
        return habitatsList.data.habitats }
        catch (error){
            return []
        }
    }

    getHandleHabitats(): Observable<any> {
        return this.http.get(`${this.url}/backoffice`)
    }
 
    addHabitat(habitat: HabitatCreate): Observable<any> {
        return this.http.post(this.url, habitat)
    }

    updateHabitat(habitat: Habitat): Observable<any> {
        return this.http.put(this.url + '/' + habitat.id, habitat)
    };

    deleteHabitat(id: string): Observable<any> {
        return this.http.delete(this.url + '/' + id)
    }

    addComment(habitat: Habitat, id: string): Observable<any> {
        return this.http.put(this.url + '/' + id + '/comment', habitat)
    }

    deleteComment(id:string){
        return this.http.delete(this.url + '/' + id + '/comment');
    }

}