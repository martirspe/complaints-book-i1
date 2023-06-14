import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Variables de entorno
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserTypesService {

  API_URI = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsersTypes() {
    return this.http.get(`${this.API_URI}/user_types`)
  }

}
