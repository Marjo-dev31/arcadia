import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EmployeeReportCreate } from "../../../shared/models/employeereport.interface";

@Injectable()

export class EmployeeService {
    url = 'http://localhost:8000/employees';

    constructor( private http: HttpClient) {}

    getEmployeeReports(id: string): Observable<any> {
       return this.http.get(`${this.url}/${id}`)
    }

    addEmployeeReport(report: EmployeeReportCreate): Observable<any> {
        return this.http.post(this.url, report)
    }
}