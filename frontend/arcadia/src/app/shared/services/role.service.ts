import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../environments/environment";
import { Role, Response } from "../models";

@Injectable()
export class RoleService {
    private readonly http = inject(HttpClient)
    private readonly url = `${environment.serverUrl}/roles`;

    getRolesWithoutAdmin(): Observable<Role[]> {
        return this.http.get<Response<Role>>(this.url).pipe(
            map((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return [];
                }
            })
        );
    }
}
