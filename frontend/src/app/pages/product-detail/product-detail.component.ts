import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Articulo } from 'src/app/models/articulo.model';
import { ArticuloService } from 'src/app/services/articulo.service';

import { Caracteristica } from 'src/app/models/caracteristica.model';
import { CaracteristicaService } from 'src/app/services/caracteristica.service';

import { Stock } from 'src/app/models/stock.model';
import { StockService } from 'src/app/services/stock.service';

import { Nomenclatura } from 'src/app/models/nomenclatura.model';
import { NomenclaturaService } from 'src/app/services/nomenclatura.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  articulo: Articulo;
  caracteristica: Caracteristica;
  nomenclatura: Nomenclatura;
  stock: Stock;
  codArticulo = '';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private articuloService: ArticuloService,
    private caracteristicaService: CaracteristicaService,
    private nomenclaturaService: NomenclaturaService,
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

      this.setSEO(this.articulo.descripcion + ' ' + this.articulo.descripcion2);
      this.getCaracteristica(this.articulo.cod_articulo);
      this.getStock(this.articulo.cod_articulo);
      this.getNomenclatura(this.articulo.nomenclatura);
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

  getNomenclatura(nomenclatura) {
    this.nomenclaturaService
      .getNomenclaturaByCod(nomenclatura)
      .subscribe((resp: any) => {
        this.nomenclatura = resp.nomenclatura;
      });
  }

  setSEO(nombre) {
    this.titleService.setTitle(nombre + ' - Menaje Hogar Jané');

    this.metaService.addTags([
      { name: 'keywords', content: 'Menaje, Hogar, Jardin' },
      { name: 'description', content: 'Detalles informativos del producto' },
    ]);
  }

  backClicked() {
    this.location.back();
  }
}
