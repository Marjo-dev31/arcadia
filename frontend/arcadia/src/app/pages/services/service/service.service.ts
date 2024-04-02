import { Injectable } from '@angular/core';

@Injectable()
export class ServiceService {
  url = 'http://localhost:8000/services';
  constructor() {}

  async getServices(): Promise<any> {
    const servicesList = await fetch(this.url).then((response) => response.json());
    console.log(servicesList)
    return servicesList
  }
}
