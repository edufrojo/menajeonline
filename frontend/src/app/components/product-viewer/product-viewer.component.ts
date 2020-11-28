import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Articulo } from './../../models/articulo.model';
import { ArticuloService } from './../../services/articulo.service';

@Component({
  selector: 'app-product-viewer',
  templateUrl: './product-viewer.component.html',
  styleUrls: ['./product-viewer.component.scss'],
})
export class ProductViewerComponent implements OnInit {
  @Input() public promotionCod: string;
  @Input() public promotionTitle: string;

  articulos: Articulo[];
  articulosLength = 0;

  constructor(
    private articuloService: ArticuloService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductsByPromotionWelcome(this.promotionCod);
  }

  getProductsByPromotionWelcome(promotion) {
    this.articuloService
      .getProductsByPromotionWelcome(promotion)
      .subscribe((resp: any) => {
        this.articulos = resp.articulos.slice(0, 8);
        this.articulosLength = this.articulos.length;
      });
  }

  onProductClick(articulo: Articulo) {
    this.router.navigate(['producto/' + articulo.cod_articulo]);
  }

  onPromotionClick() {
    this.router.navigate(['promocion/' + this.promotionCod]);
  }
}
