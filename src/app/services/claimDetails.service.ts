import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Variables de entorno
import { environment } from '../../environments/environment';

// Interfaces
import { ClaimDetailsInterface } from '../interfaces/claimDetailsInterface';

@Injectable({
  providedIn: 'root'
})
export class ClaimsDetailsService {

  API_URI = environment.apiUrl;

  constructor(private http: HttpClient) { }

  postClaimDetails(claimDetails: ClaimDetailsInterface) {
    return this.http.post(`${this.API_URI}/claim_details`, claimDetails);
  }

}
