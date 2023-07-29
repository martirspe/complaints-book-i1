import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Variables de entorno
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClaimNumberService {

  API_URI = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTableLength(): Observable<number> {
    return this.http.get<any[]>(`${this.API_URI}/claims`).pipe(
      map(response => response.length)
    );
  }
}
