import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import {
    VeterinaryReport,
    VeterinaryReportCreate,
    Response,
} from "../models";
import { environment } from "../../environments/environment";

@Injectable()
export class VeterinaryService {
    private readonly url = `${environment.serverUrl}/veterinaries`;

    private readonly http = inject(HttpClient);

    getVeterinaryReports(id: string): Observable<VeterinaryReport[]> {
        return this.http
            .get<Response<VeterinaryReport>>(`${this.url}/animal/${id}`)
            .pipe(
                map((response) => {
                    if (response.data) {
                        return response.data;
                    } else {
                        return [];
                    }
                })
            );
    }

    addVeterinaryReport(
        report: VeterinaryReportCreate
    ): Observable<Response<VeterinaryReport>> {
        return this.http.post<Response<VeterinaryReport>>(this.url, report);
    }

    updateReport(
        report: VeterinaryReport
    ): Observable<Response<VeterinaryReport>> {
        return this.http.put<Response<VeterinaryReport>>(
            `${this.url}/${report.id}`,
            report
        );
    }

    deleteReport(id: string): Observable<Response<VeterinaryReport>> {
        return this.http.delete<Response<VeterinaryReport>>(
            `${this.url}/${id}`
        );
    }
}
