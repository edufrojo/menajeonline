import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public uri: string = environment.base_url;
  public cargando: boolean = false;
  public page = 0;
  public terminoAnterior: string = '';

  constructor(private http: HttpClient) {}

  get params() {
    return {
      page: this.page.toString(),
    };
  }

  busquedaGlobal(termino: string) {
    this.cargando = true;

    if (this.terminoAnterior !== termino) {
      this.terminoAnterior = termino;
      this.page = 0;
    }

    const url = `${this.uri}/todo/${termino}`;
    return this.http.get(url, { params: this.params }).pipe(
      tap(() => {
        this.cargando = false;

        this.page += 1;
      })
    );
  }
}
