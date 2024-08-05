import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { User, UserCreate, UserLogin } from "../../../shared/models/user.interface";
import { environment } from '../../../environments/environment';
import { Response } from "../../../shared/models/response.interface";


@Injectable()
export class UserService {
    url = `${environment.serverUrl}/users`;

    constructor(private http:HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get<Response<User>>(this.url).pipe(map((r)=>{
            if(r.data){
                return r.data
            } else {
                return []
            }
        }))
    };

    addUser(user: UserCreate): Observable<Response<UserCreate>> {
        return this.http.post<Response<UserCreate>>(this.url, user)
    }

    updatePassword(user: UserLogin): Observable<Response<UserLogin>> {
        return this.http.put<Response<UserLogin>>(this.url, user)
    }
    

}