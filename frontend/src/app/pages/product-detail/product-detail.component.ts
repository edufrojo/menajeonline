import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Articulo } from '../../models/articulo.model';
import { ArticuloService } from '../../services/articulo.service';

import { Caracteristica } from '../../models/caracteristica.model';
import { CaracteristicaService } from '../../services/caracteristica.service';

import { Stock } from '../../models/stock.model';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  articulo: Articulo;
  caracteristica: Caracteristica;
  stock: Stock;
  codArticulo = '';

  constructor(
    private articuloService: ArticuloService,
    private caracteristicaService: CaracteristicaService,
    private stockService: StockService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getArticulo();
  }

  getArticulo() {
    const cod = this.activatedRoute.snapshot.params.cod;

    this.articuloService.getArticuloByCod(cod).subscribe((resp: any) => {
      this.articulo = resp.articulo;

      this.getCaracteristica(this.articulo.cod_articulo);
      this.getStock(this.articulo.cod_articulo);
    });
  }

  getCaracteristica(codArticulo) {
    this.caracteristicaService
      .getCaracteristicaByCod(codArticulo)
      .subscribe((resp: any) => {
        this.caracteristica = resp.caracteristica;
      });
  }

  getStock(codArticulo) {
    this.stockService.getStockByCod(codArticulo).subscribe((resp: any) => {
      this.stock = resp.stock;
    });
  }

  backClicked() {
    this.location.back();
  }
}
