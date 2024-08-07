import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Response, Image } from "../models";

@Injectable()
export class ImageService {
    private readonly http = inject(HttpClient);
    private readonly url = `${environment.serverUrl}/images`;
    
    addServiceImage(image: FormData, id: string): Observable<Response<Image>> {
        return this.http.post<Response<Image>>(
            `${this.url}/service/${id}`,
            image
        );
    }

    addHabitatImage(image: FormData, id: string): Observable<Response<Image>> {
        return this.http.post<Response<Image>>(
            `${this.url}/habitat/${id}`,
            image
        );
    }

    addAnimalImage(image: FormData, id: string): Observable<Response<Image>> {
        return this.http.post<Response<Image>>(
            `${this.url}/animal/${id}`,
            image
        );
    }

    deleteImage(id: string): Observable<Response<Image>> {
        return this.http.delete<Response<Image>>(`${this.url}/${id}`);
    }
}
