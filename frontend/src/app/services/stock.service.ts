import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  public uri: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStocks(): Observable<any> {
    return this.http.get(`${this.uri}/stocks`);
  }

  getStockByCod(cod): Observable<any> {
    return this.http.get(`${this.uri}/stocks/${cod}`);
  }
}
