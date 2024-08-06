import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Mail } from "../../../shared/models/mail.interface";
import { environment } from "../../../environments/environment";

@Injectable()
export class MailService {
    
    private readonly http = inject(HttpClient)
    private readonly url = `${environment.serverUrl}/send`;

    sendEmail(mail: Mail): Observable<any> {
        return this.http.post(this.url, mail);
    }

    sendEmailForNewPassword(email: string): Observable<any> {
        return this.http.post(`${this.url}/forgotpassword`, { email });
    }
}
