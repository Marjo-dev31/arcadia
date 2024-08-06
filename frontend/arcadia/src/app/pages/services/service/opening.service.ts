import { Injectable, signal } from "@angular/core";
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Opening, Response } from "../../../shared/models";
import { environment } from "../../../environments/environment";

@Injectable()
export class OpeningService {
    url = `${environment.serverUrl}/opening`;

    schedule = signal<Opening>({
        openingTime: "",
        closingTime: "",
        openingDay: "",
        closingDay: "",
        _id: "",
    });

    constructor(private http: HttpClient) {}

    getOpeningToPublic(): Observable<Opening[]> {
        return this.http.get<Response<Opening>>(this.url).pipe(
            map((r) => {
                if (r.data) {
                    return r.data;
                } else {
                    return [];
                }
            })
        );
    }

    getHandleOpeningToPublic(): Observable<Opening[]> {
        return this.http.get<Response<Opening>>(`${this.url}/backoffice`).pipe(
            map((r) => {
                if (r.data) {
                    return r.data;
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
