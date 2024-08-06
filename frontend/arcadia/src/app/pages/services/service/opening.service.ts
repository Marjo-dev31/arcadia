import { Injectable, inject, signal } from "@angular/core";
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Opening, Response } from "../../../shared/models";
import { environment } from "../../../environments/environment";

@Injectable()
export class OpeningService {

    schedule = signal<Opening>({
        openingTime: "",
        closingTime: "",
        openingDay: "",
        closingDay: "",
        _id: "",
    });

    private readonly http = inject(HttpClient)
    private readonly url = `${environment.serverUrl}/opening`;

    getOpeningToPublic(): Observable<Opening[]> {
        return this.http.get<Response<Opening>>(this.url).pipe(
            map((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return [];
                }
            })
        );
    }

    getHandleOpeningToPublic(): Observable<Opening[]> {
        return this.http.get<Response<Opening>>(`${this.url}/backoffice`).pipe(
            map((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return [];
                }
            })
        );
    }

    updateOpeningToPublic(opening: Opening, id: string): Observable<Opening> {
        this.schedule.set(opening);
        return this.http.put<Opening>(`${this.url}/${id}`, opening);
    }
}
