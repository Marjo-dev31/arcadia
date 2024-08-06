import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import {
    EmployeeReport,
    EmployeeReportCreate,
    Response,
} from "../../../shared/models";
import { environment } from "../../../environments/environment";

@Injectable()
export class EmployeeService {
    private readonly url = `${environment.serverUrl}/employees`;

    private readonly http = inject(HttpClient);

    getEmployeeReports(id: string): Observable<EmployeeReport[]> {
        return this.http
            .get<Response<EmployeeReport>>(`${this.url}/${id}`)
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

    addEmployeeReport(
        report: EmployeeReportCreate
    ): Observable<EmployeeReport[]> {
        return this.http.post<Response<EmployeeReport>>(this.url, report).pipe(
            map((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return [];
                }
            })
        );
    }

    updateReport(report: EmployeeReport): Observable<Response<EmployeeReport>> {
        return this.http.put<Response<EmployeeReport>>(
            `${this.url}/${report.id}`,
            report
        );
    }

    deleteEmployeeReport(id: string): Observable<Response<EmployeeReport>> {
        return this.http.delete<Response<EmployeeReport>>(`${this.url}/${id}`);
    }
}
