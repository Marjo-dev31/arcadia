import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Mail, Response } from "../models";
import { environment } from "../../environments/environment";


@Injectable()
export class MailService {
    
    private readonly http = inject(HttpClient)
    private readonly url = `${environment.serverUrl}/send`;

    sendEmail(mail: Mail): Observable<Response<Mail>> {
        return this.http.post<Response<Mail>>(this.url, mail);
    }

    sendEmailForNewPassword(email: string): Observable<Response<string>> {
        return this.http.post<Response<string>>(`${this.url}/forgotpassword`, { email });
    }
}
