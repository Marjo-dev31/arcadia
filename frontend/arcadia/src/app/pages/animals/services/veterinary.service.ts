import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { VeterinaryReportCreate } from "../../../shared/models/veterinaryreport.interface";

@Injectable()
export class VeterinaryService {
    url = 'http://localhost:8000/veterinaries';

    constructor(private http: HttpClient){}

    getVeterinaryReports(id: string): Observable<any> {
        return this.http.get(`${this.url}/animal/${id}`)
    } 

    addVeterinaryReport(report: VeterinaryReportCreate): Observable<any> {
        return this.http.post(this.url, report)
    }

    deleteReport(id: string): Observable<any> {
        return this.http.delete(`${this.url}/${id}`)
    }
}