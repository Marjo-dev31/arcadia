import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mail } from '../../../shared/models/mail.interface';

@Injectable()
export class MailService {
    constructor(private http: HttpClient) { }
    url = 'http://localhost:8000/send';
    
    sendEmail(mail: Mail): Observable<any> {
        return this.http.post(this.url, mail)
    }
}