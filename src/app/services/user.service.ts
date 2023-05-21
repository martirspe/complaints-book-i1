import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Interfaces
import { UserInterface } from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URI = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.API_URI}/users`)
  }

  getUser(id: string) {
    return this.http.get(`${this.API_URI}/users/${id}`)
  }

  postUser(user: UserInterface) {
    return this.http.post(`${this.API_URI}/users`, user);
  }

  updateUser(id: string, user: UserInterface) {
    return this.http.put(`${this.API_URI}/users/${id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.API_URI}/users/${id}`);
  }

}
