import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Articulo } from './../../models/articulo.model';
import { ArticuloService } from './../../services/articulo.service';

import { Promocion } from '../../models/promocion.model';
import { PromocionService } from '../../services/promocion.service';

@Component({
  selector: 'app-promotion-detail',
  templateUrl: './promotion-detail.component.html',
  styleUrls: ['./promotion-detail.component.scss'],
})
export class PromotionDetailComponent implements OnInit {
  promocion: Promocion;
  articulos: Articulo[];

  constructor(
    private promocionService: PromocionService,
    private articuloService: ArticuloService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPromocion();
    this.getProductsByPromotion(this.promocion);
  }

  getPromocion() {
    const id = this.activatedRoute.snapshot.params.id;

    this.promocionService.getPromocionById(id).subscribe((resp: any) => {
      this.promocion = resp.promocion;
    });
  }

  getProductsByPromotion(promotion) {
    this.articuloService
      .getProductsByPromotion(promotion)
      .subscribe((resp: any) => {
        this.articulos = resp.articulos;
      });
  }
}
