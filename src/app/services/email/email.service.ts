import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailInterface } from '../../interfaces/email/emailInterface';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  API_URI = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  sendMail(data: EmailInterface) {
    return this.http.post(`${this.API_URI}/sendmail`, data);
  }

}
