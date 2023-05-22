import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  API_URI = 'https://api.alka.cloud/api';

  constructor(private http: HttpClient) { }

  postSendMail(sendMail: any) {
    return this.http.post(`${this.API_URI}/sendmail`, sendMail);
  }

}
