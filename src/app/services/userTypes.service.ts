import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserTypesService {

  API_URI = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getUsersTypes() {
    return this.http.get(`${this.API_URI}/user_types`)
  }

}
