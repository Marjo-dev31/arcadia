import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { EmployeeReport, EmployeeReportCreate } from "../../../shared/models/employeereport.interface";
import { environment } from "../../../environments/environment";
import { Response } from "../../../shared/models/response.interface";


@Injectable()

export class EmployeeService {
    url = `${environment.serverUrl}/employees`;

    constructor( private http: HttpClient) {}

    getEmployeeReports(id: string): Observable<EmployeeReport[]> {
       return this.http.get<Response<EmployeeReport>>(`${this.url}/${id}`).pipe(map((r)=>{
        if(r.data){
            return r.data
        } else {
            return []
        }
       }))
    }

    addEmployeeReport(report: EmployeeReportCreate): Observable<EmployeeReport[]> {
        return this.http.post<Response<EmployeeReport>>(this.url, report).pipe(map((r)=>{
            if(r.data){
                return r.data
            } else {
                return []
            }
           }))
    }

    updateReport(report: EmployeeReport): Observable<Response<EmployeeReport>> {
        return this.http.put<Response<EmployeeReport>>(`${this.url}/${report.id}`, report)
    }

    deleteEmployeeReport(id: string): Observable<Response<EmployeeReport>> {
        return this.http.delete<Response<EmployeeReport>>(`${this.url}/${id}`)
    }
}