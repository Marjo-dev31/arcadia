import { Injectable } from '@angular/core';
import { Service } from '../../../shared/models/service.interface';

@Injectable()
export class ServiceService {
  url = 'http://localhost:8000/services';
  constructor() {}

  async getServices(): Promise<Service[]> {
    const servicesList = await fetch(this.url).then((response) => response.json());
    console.log(servicesList)
    return servicesList
  }
}
