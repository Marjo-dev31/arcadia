import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EmployeeReport, EmployeeReportCreate } from "../../../shared/models/employeereport.interface";


@Injectable()

export class EmployeeService {
    url = 'http://13.39.80.204:8000/employees';

    constructor( private http: HttpClient) {}

    getEmployeeReports(id: string): Observable<any> {
       return this.http.get(`${this.url}/${id}`)
    }

    addEmployeeReport(report: EmployeeReportCreate): Observable<any> {
        return this.http.post(this.url, report)
    }

    updateReport(report: EmployeeReport): Observable<any> {
        return this.http.put(`${this.url}/${report.id}`, report)
    }

    deleteEmployeeReport(id: string): Observable<any> {
        return this.http.delete(`${this.url}/${id}`)
    }
}