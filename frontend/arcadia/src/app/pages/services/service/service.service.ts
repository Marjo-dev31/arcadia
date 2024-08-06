import { Injectable } from '@angular/core'
import { Service, ServiceCreate, Response } from '../../../shared/models'
import { Observable, map } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'

@Injectable()
export class ServiceService {
    url = `${environment.serverUrl}/services`

    constructor(private http: HttpClient) {}

    async getServices(): Promise<Service[]> {
        try {
            const servicesList = await fetch(this.url).then((response) =>
                response.json()
            )
            return servicesList.data
        } catch {
            return []
        }
    }

    getHandleServices(): Observable<Service[]> {
        return this.http.get<Response<Service>>(`${this.url}/backoffice`).pipe(
            map((r) => {
                if (r.data) {
                    return r.data
                } else {
                    return []
                }
            })
        )
    }

    addService(service: ServiceCreate): Observable<Response<Service>> {
        return this.http.post<Response<Service>>(this.url, service)
    }

    updateService(service: Service): Observable<Response<Service>> {
        return this.http.put<Response<Service>>(
            this.url + '/' + service.id,
            service
        )
    }

    deleteService(id: string): Observable<Response<Service>> {
        return this.http.delete<Response<Service>>(this.url + '/' + id)
    }
}
