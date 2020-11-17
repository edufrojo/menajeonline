import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Articulo } from '../../models/articulo.model';
import { ArticuloService } from '../../services/articulo.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  articulo: Articulo;

  constructor(
    private articuloService: ArticuloService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getArticulo();
  }

  getArticulo() {
    const id = this.activatedRoute.snapshot.params.id;

    this.articuloService.getArticuloById(id).subscribe((resp: any) => {
      this.articulo = resp.articulo;
    });
  }
}
