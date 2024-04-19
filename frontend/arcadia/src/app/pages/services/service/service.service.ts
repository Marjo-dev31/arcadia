import { Injectable } from '@angular/core';
import { Service, ServiceCreate } from '../../../shared/models/service.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ServiceService {
  url = 'http://localhost:8000/services';


  constructor( private http: HttpClient) {}

  async getServices(): Promise<any> {
    const servicesList = await fetch(this.url).then((response) => response.json());
    // console.log( servicesList, 'titi')
    return servicesList.data.services
  }

  addService(service: ServiceCreate): Observable<any> {
    console.log(service)
    return this.http.post(this.url, service)
}

  updateService(service: Service): Observable<any> {
    return this.http.put(this.url +'/'+ service.id, service)
  }

  deleteService(id: string): Observable<any> {
    return this.http.delete(this.url +'/'+ id)
  }

}
