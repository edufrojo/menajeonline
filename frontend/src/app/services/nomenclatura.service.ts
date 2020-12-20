import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NomenclaturaService {
  public uri: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getNomenclaturas(): Observable<any> {
    return this.http.get(`${this.uri}/nomenclaturas`);
  }

  getNomenclaturaByCod(cod): Observable<any> {
    return this.http.get(`${this.uri}/nomenclaturas/${cod}`);
  }
}
