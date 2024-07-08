import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserLogin } from "../../../shared/models/user.interface";
import { Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment";


@Injectable()
export class LoginService {
    url = `${environment.serverUrl}/login`

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
        localStorage.removeItem('firstname')
        this.isLoggin = false
    }
}