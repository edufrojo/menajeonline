import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArticuloService {
  public uri: string = environment.base_url;
  public cargando: boolean = false;
  private page = 0;
  private promotionId = '';
  private nomenclaturaId = '';

  constructor(private http: HttpClient) {}

  get params() {
    return {
      page: this.page.toString(),
    };
  }

  getArticulos(): Observable<any> {
    this.cargando = true;

    return this.http.get(`${this.uri}/articulos`, { params: this.params }).pipe(
      tap(() => {
        this.cargando = false;
        this.page += 1;
      })
    );
  }

  getProductsByPromotion(promotion): Observable<any> {
    this.cargando = true;

    if (this.promotionId !== promotion) {
      this.promotionId = promotion;
      this.page = 0;
    }

    return this.http
      .get(`${this.uri}/articulos/promocion/${promotion}`, {
        params: this.params,
      })
      .pipe(
        tap(() => {
          this.cargando = false;
          this.page += 1;
        })
      );
  }

  getProductsByNomenclatura(nomenclatura): Observable<any> {
    this.cargando = true;

    if (this.nomenclaturaId !== nomenclatura) {
      this.nomenclaturaId = nomenclatura;
      this.page = 0;
    }

    return this.http
      .get(`${this.uri}/articulos/departamentos/${nomenclatura}`, {
        params: this.params,
      })
      .pipe(
        tap(() => {
          this.cargando = false;
          this.page += 1;
        })
      );
  }

  getProductsByPromotionWelcome(promotion): Observable<any> {
    return this.http.get(`${this.uri}/articulos/promocion/${promotion}`);
  }

  getArticuloByCod(cod): Observable<any> {
    return this.http.get(`${this.uri}/articulos/${cod}`);
  }
}
