import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class UsersService {
    url = 'http://localhost:8000/users';

    constructor(private http:HttpClient) {}

    getUsers(): Observable<any>{
        return this.http.get(this.url)
    }

}