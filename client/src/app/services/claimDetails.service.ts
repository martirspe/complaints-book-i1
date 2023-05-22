import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClaimDetailsInterface } from '../interfaces/claimDetailsInterface';

@Injectable({
  providedIn: 'root'
})
export class ClaimsDetailsService {

  API_URI = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  postClaimDetails(claimDetails: ClaimDetailsInterface) {
    return this.http.post(`${this.API_URI}/claim_details`, claimDetails);
  }

}
