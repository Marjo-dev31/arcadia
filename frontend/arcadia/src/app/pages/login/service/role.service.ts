import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class RoleService {
    url = 'http://13.39.80.204:8000/roles';

    constructor(private http: HttpClient) {}

    getRolesWithoutAdmin(): Observable<any>{
        return this.http.get(this.url)
    }
}