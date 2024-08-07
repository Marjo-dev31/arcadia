import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { UserLogin, Response, CurrentUser } from "../../../shared/models";
import { Observable} from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable()
export class LoginService {
    private readonly http = inject(HttpClient)
    private readonly url = `${environment.serverUrl}/login`;
    
    isLoggin = signal(false);

    login(user: UserLogin): Observable<Response<CurrentUser>> {
        this.isLoggin.set(true);
        return this.http.post<Response<CurrentUser>>(this.url, user);
    }

    logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        localStorage.removeItem("firstname");
        this.isLoggin.set(false);
    }
}
