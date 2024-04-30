import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class VeterinaryService {
    url = 'http://localhost:8000/veterinaries';

    constructor(private http: HttpClient){}

    getVeterinaryReports(id: string): Observable<any> {
        return this.http.get(`${this.url}/animal/${id}`)
    }

}