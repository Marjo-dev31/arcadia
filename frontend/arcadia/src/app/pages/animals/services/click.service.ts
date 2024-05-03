import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class ClickService {
    url = 'http://localhost:8000/click'

    constructor(private http: HttpClient){}

    addClick(firstname: string): Observable<any> {
        return this.http.put(`${this.url}/${firstname}`, firstname)
    }


}