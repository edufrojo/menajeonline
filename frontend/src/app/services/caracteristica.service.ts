import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CaracteristicaService {
  public uri: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCaracteristicas(): Observable<any> {
    return this.http.get(`${this.uri}/caracteristicas`);
  }

  getCaracteristicaByCod(cod): Observable<any> {
    return this.http.get(`${this.uri}/caracteristicas/${cod}`);
  }
}
