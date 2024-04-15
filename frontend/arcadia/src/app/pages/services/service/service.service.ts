import { Injectable } from '@angular/core';
import { Service } from '../../../shared/models/service.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ServiceService {
  url = 'http://localhost:8000/services';
  constructor( private http: HttpClient) {}

  async getServices(): Promise<Service[]> {
    const servicesList = await fetch(this.url).then((response) => response.json());
    // console.log(servicesList)
    return servicesList
  }

  addService(service: Service): Observable<any> {
    return this.http.post(this.url, service)
}

}
