import { Injectable, inject } from "@angular/core";
import { Habitat, HabitatCreate, Response } from "../../../shared/models";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable()
export class HabitatsService {
    private readonly http = inject(HttpClient);
    private readonly url = `${environment.serverUrl}/habitats`;

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
            map((response) => {
                if (response.data) {
                    return response.data;
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
