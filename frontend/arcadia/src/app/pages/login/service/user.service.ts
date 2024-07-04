import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserCreate } from "../../../shared/models/user.interface";
import { environment } from '../../../environments/environment';


@Injectable()
export class UserService {
    url = `${environment.serverUrl}/users`;

    constructor(private http:HttpClient) {}

    getUsers(): Observable<any> {
        return this.http.get(this.url)
    };

    addUser(user: UserCreate): Observable<any> {
        return this.http.post(this.url, user)
    }

}