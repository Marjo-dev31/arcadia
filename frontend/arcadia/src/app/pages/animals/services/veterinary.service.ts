import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { VeterinaryReport, VeterinaryReportCreate } from "../../../shared/models/veterinaryreport.interface";
import { environment } from '../../../environments/environment';
import { Response } from "../../../shared/models/response.interface";


@Injectable()
export class VeterinaryService {
    url = `${environment.serverUrl}/veterinaries`;

    constructor(private http: HttpClient){}

    getVeterinaryReports(id: string): Observable<Response<VeterinaryReport>> {
        return this.http.get<Response<VeterinaryReport>>(`${this.url}/animal/${id}`)
    } 

    addVeterinaryReport(report: VeterinaryReportCreate): Observable<Response<VeterinaryReport>> {
        return this.http.post<Response<VeterinaryReport>>(this.url, report)
    }

    updateReport(report: VeterinaryReport): Observable<Response<VeterinaryReport>> {
        return this.http.put<Response<VeterinaryReport>>(`${this.url}/${report.id}`, report)
    }

    deleteReport(id: string): Observable<Response<VeterinaryReport>> {
        return this.http.delete<Response<VeterinaryReport>>(`${this.url}/${id}`)
    }
}