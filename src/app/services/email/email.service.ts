import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Variables de entorno
import { environment } from '../../../environments/environment';

// Interfaces
import { EmailInterface } from '../../interfaces/email/emailInterface';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  API_URI = environment.apiUrl;

  constructor(private http: HttpClient) { }

  sendMail(data: EmailInterface) {
    return this.http.post(`${this.API_URI}/sendmail`, data);
  }

}
