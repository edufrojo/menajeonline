import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromocionService {
  public uri: string = environment.base_url;

  constructor(private http: HttpClient) {}

  getPromociones(): Observable<any> {
    return this.http.get(`${this.uri}/promociones`);
  }

  getPromocionById(id): Observable<any> {
    return this.http.get(`${this.uri}/promociones/${id}`);
  }
}
