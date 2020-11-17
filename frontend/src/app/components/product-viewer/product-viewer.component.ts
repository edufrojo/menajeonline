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
  articulos: Articulo[];
  @Input() public promotion: string;

  constructor(
    private articuloService: ArticuloService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductsByPromotionWelcome(this.promotion);
  }

  getProductsByPromotionWelcome(promotion) {
    this.articuloService
      .getProductsByPromotionWelcome(this.promotion)
      .subscribe((resp: any) => {
        this.articulos = resp.articulos.slice(0, 12);
      });
  }

  onProductClick(articulo: Articulo) {
    this.router.navigate(['producto', articulo._id]);
  }
}
