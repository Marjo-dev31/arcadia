import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { User, UserCreate, UserLogin, Response } from "../../../shared/models/";
import { environment } from "../../../environments/environment";

@Injectable()
export class UserService {
    private readonly http = inject(HttpClient);
    private readonly url = `${environment.serverUrl}/users`;

    getUsers(): Observable<User[]> {
        return this.http.get<Response<User>>(this.url).pipe(
            map((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return [];
                }
            })
        );
    }

    addUser(user: UserCreate): Observable<Response<UserCreate>> {
        return this.http.post<Response<UserCreate>>(this.url, user);
    }

    updatePassword(user: UserLogin): Observable<Response<UserLogin>> {
        return this.http.put<Response<UserLogin>>(this.url, user);
    }
}
