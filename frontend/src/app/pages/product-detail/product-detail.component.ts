import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Articulo } from '../../models/articulo.model';
import { ArticuloService } from '../../services/articulo.service';

import { Caracteristica } from '../../models/caracteristica.model';
import { CaracteristicaService } from '../../services/caracteristica.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  articulo: Articulo;
  caracteristica: Caracteristica;
  codArticulo = '';

  constructor(
    private articuloService: ArticuloService,
    private caracteristicaService: CaracteristicaService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getArticulo();
  }

  getArticulo() {
    const id = this.activatedRoute.snapshot.params.id;

    this.articuloService.getArticuloById(id).subscribe((resp: any) => {
      this.articulo = resp.articulo;

      this.getCaracteristica(this.articulo.cod_articulo);
    });
  }

  getCaracteristica(codArticulo) {
    console.log('Cod: ' + codArticulo);
    this.caracteristicaService
      .getCaracteristicaByCod(codArticulo)
      .subscribe((resp: any) => {
        this.caracteristica = resp.caracteristica;
        console.log('Caracteristica: ' + this.caracteristica);
      });
  }
}
