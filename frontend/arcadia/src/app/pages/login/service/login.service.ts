import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserLogin } from "../../../shared/models/user.interface";
import { Observable, map } from "rxjs";

@Injectable()
export class LoginService {
    url = 'http://localhost:8000/login'

    constructor(private http: HttpClient) {}

    login(user: UserLogin): Observable<any> {
        return this.http.post(this.url, user)
    }

    logout(){}
}