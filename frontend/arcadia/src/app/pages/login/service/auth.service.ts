import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {

    getToken() {
       const accessToken = localStorage.getItem('accessToken');
       return accessToken
    }
}