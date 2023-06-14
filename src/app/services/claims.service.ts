import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Variables de entorno
import { environment } from '../../environments/environment';

// Interfaces
import { ClaimInterface } from '../interfaces/claimInterface';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  API_URI = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getClaims() {
    return this.http.get(`${this.API_URI}/claims`)
  }

  getClaim(id: string) {
    return this.http.get(`${this.API_URI}/claims/${id}`)
  }

  postClaim(claim: ClaimInterface) {
    return this.http.post(`${this.API_URI}/claims`, claim);
  }

  updateClaim(id: string, claim: ClaimInterface) {
    return this.http.put(`${this.API_URI}/claims/${id}`, claim);
  }

  deleteClaim(id: string) {
    return this.http.delete(`${this.API_URI}/claims/${id}`);
  }

}
