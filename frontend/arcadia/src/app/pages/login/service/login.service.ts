import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserLogin } from "../../../shared/models/user.interface";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoginService {
    url = 'http://13.39.80.204:8000/login'

    constructor(private http: HttpClient) {}

    isLoggin: boolean = false;

    login(user: UserLogin): Observable<any> {
        return this.http.post(this.url, user).pipe(
            tap(()=>{
                this.isLoggin = true
            })
        )
    }

    logout(){
        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
        this.isLoggin = false
    }
}