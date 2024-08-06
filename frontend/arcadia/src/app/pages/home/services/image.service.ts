import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'
import { Response, Image } from '../../../shared/models'

@Injectable()
export class ImageService {
    url = `${environment.serverUrl}/images`

    constructor(private http: HttpClient) {}

    addServiceImage(image: any, id: string): Observable<Response<Image>> {
        return this.http.post<Response<Image>>(
            `${this.url}/service/${id}`,
            image
        )
    }

    addHabitatImage(image: any, id: string): Observable<Response<Image>> {
        return this.http.post<Response<Image>>(
            `${this.url}/habitat/${id}`,
            image
        )
    }

    addAnimalImage(image: any, id: string): Observable<Response<Image>> {
        return this.http.post<Response<Image>>(
            `${this.url}/animal/${id}`,
            image
        )
    }

    deleteImage(id: string): Observable<Response<Image>> {
        return this.http.delete<Response<Image>>(`${this.url}/${id}`)
    }
}
