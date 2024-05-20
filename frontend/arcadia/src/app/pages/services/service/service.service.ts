import { Injectable } from '@angular/core';
import { Service, ServiceCreate } from '../../../shared/models/service.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';



@Injectable()
export class ServiceService {
  url = `${environment.serverUrl}/services`;


  constructor( private http: HttpClient) {}

  async getServices(): Promise<Service[]> {
    try {
    const servicesList = await fetch(this.url).then((response) => response.json());
    return servicesList.data.services }
    catch {
      return []
    }
  }

  getHandleServices(): Observable<any> {
    return this.http.get(`${this.url}/backoffice`)
  }

  addService(service: ServiceCreate): Observable<any> {
    return this.http.post(this.url, service)
}

  updateService(service: Service): Observable<any> {
    return this.http.put(this.url +'/'+ service.id, service)
  }

  deleteService(id: string): Observable<any> {
    return this.http.delete(this.url +'/'+ id)
  }

}
