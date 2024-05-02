import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserCreate } from "../../../shared/models/user.interface";

@Injectable()
export class UserService {
    url = 'http://localhost:8000/users';

    constructor(private http:HttpClient) {}

    getUsers(): Observable<any> {
        return this.http.get(this.url)
    };

    addUser(user: UserCreate): Observable<any> {
        return this.http.post(this.url, user)
    }

}