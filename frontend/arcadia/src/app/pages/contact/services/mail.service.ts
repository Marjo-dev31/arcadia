import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mail } from '../../../shared/models/mail.interface';
import { environment } from '../../../environments/environment';


@Injectable()
export class MailService {
    constructor(private http: HttpClient) { }
    url = `${environment.serverUrl}/send`;
    
    sendEmail(mail: Mail): Observable<any> {
        return this.http.post(this.url, mail)
    }
}