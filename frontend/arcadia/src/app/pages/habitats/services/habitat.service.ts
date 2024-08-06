import { Injectable } from "@angular/core";
import { Habitat, HabitatCreate, Response } from "../../../shared/models";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable()
export class HabitatsService {
    url = `${environment.serverUrl}/habitats`;

    constructor(private http: HttpClient) {}

    // fetch required for exam
    async getHabitats(): Promise<Habitat[]> {
        try {
            const habitatsList = await fetch(this.url).then((response) =>
                response.json()
            );
            return habitatsList.data;
        } catch {
            return [];
        }
    }

    getHandleHabitats(): Observable<Habitat[]> {
        return this.http.get<Response<Habitat>>(`${this.url}/backoffice`).pipe(
            map((r) => {
                if (r.data) {
                    return r.data;
                } else {
                    return [];
                }
            })
        );
    }

    addHabitat(habitat: HabitatCreate): Observable<Response<Habitat>> {
        return this.http.post<Response<Habitat>>(this.url, habitat);
    }

    updateHabitat(habitat: Habitat): Observable<Response<Habitat>> {
        return this.http.put<Response<Habitat>>(
            this.url + "/" + habitat.id,
            habitat
        );
    }

    deleteHabitat(id: string): Observable<Response<Habitat>> {
        return this.http.delete<Response<Habitat>>(this.url + "/" + id);
    }

    addComment(habitat: Habitat, id: string): Observable<Response<Habitat>> {
        return this.http.put<Response<Habitat>>(
            this.url + "/" + id + "/comment",
            habitat
        );
    }

    deleteComment(id: string): Observable<Response<Habitat>> {
        return this.http.delete<Response<Habitat>>(
            this.url + "/" + id + "/comment"
        );
    }
}
