import { Injectable } from '@angular/core';

@Injectable()
export class ServiceService {
  url = 'https://jsonplaceholder.typicode.com/todos/1';
  constructor() {}

  async getServices(): Promise<any> {
    return fetch(this.url).then((response) => response.json());
  }
}
