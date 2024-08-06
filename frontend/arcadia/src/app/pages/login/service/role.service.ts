import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, map } from 'rxjs'
import { environment } from '../../../environments/environment'
import { Role, Response } from '../../../shared/models'

@Injectable()
export class RoleService {
    url = `${environment.serverUrl}/roles`

    constructor(private http: HttpClient) {}

    getRolesWithoutAdmin(): Observable<Role[]> {
        return this.http.get<Response<Role>>(this.url).pipe(
            map((r) => {
                if (r.data) {
                    return r.data
                } else {
                    return []
                }
            })
        )
    }
}
