import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://localhost:4200/send-email'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  sendEmail(to: string, subject: string, body: string): Observable<any> {
    const emailData = {
      to: to,
      subject: subject,
      text: body
    };

    return this.http.post<any>(this.apiUrl, emailData);
  }
}
