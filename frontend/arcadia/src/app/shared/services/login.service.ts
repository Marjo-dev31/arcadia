import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { UserLogin, Response, CurrentUser } from "../models";
import { Observable, tap } from "rxjs";
import { environment } from "../../environments/environment";


@Injectable()
export class LoginService {
    private readonly http = inject(HttpClient)
    private readonly url = `${environment.serverUrl}/login`;
    
    isLoggin = signal(false);

    currentUser = signal({
        id: '',
        firstname: '',
        lastname: '',
        role: '',
    })

    login(user: UserLogin): Observable<Response<CurrentUser>> {
        this.isLoggin.set(true);
        return this.http.post<Response<CurrentUser>>(this.url, user).pipe(tap((response)=>{
            if(response.data){
                this.currentUser.set(response.data[0])
            }
        }))
        }



    }
