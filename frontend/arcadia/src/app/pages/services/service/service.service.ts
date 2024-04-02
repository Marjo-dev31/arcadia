import { Injectable } from '@angular/core';

@Injectable()
export class ServiceService {
  url = 'http://localhost:8000/service';
  constructor() {}

  async getServices(): Promise<any> {
    const result = await fetch(this.url).then((response) => response.json());
    console.log(result)
    return result
  }
}
