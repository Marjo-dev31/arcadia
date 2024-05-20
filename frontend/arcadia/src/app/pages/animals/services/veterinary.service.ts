import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { VeterinaryReport, VeterinaryReportCreate } from "../../../shared/models/veterinaryreport.interface";
import { environment } from '../../../environments/environment';


@Injectable()
export class VeterinaryService {
    url = `${environment.serverUrl}/veterinaries`;

    constructor(private http: HttpClient){}

    getVeterinaryReports(id: string): Observable<any> {
        return this.http.get(`${this.url}/animal/${id}`)
    } 

    addVeterinaryReport(report: VeterinaryReportCreate): Observable<any> {
        return this.http.post(this.url, report)
    }

    updateReport(report: VeterinaryReport): Observable<any> {
        return this.http.put(`${this.url}/${report.id}`, report)
    }

    deleteReport(id: string): Observable<any> {
        return this.http.delete(`${this.url}/${id}`)
    }
}