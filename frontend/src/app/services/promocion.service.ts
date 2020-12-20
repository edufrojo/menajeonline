import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromocionService {
  public uri: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPromociones(): Observable<any> {
    return this.http.get(`${this.uri}/promociones`);
  }

  getPromocionByCod(cod): Observable<any> {
    return this.http.get(`${this.uri}/promociones/${cod}`);
  }
}
