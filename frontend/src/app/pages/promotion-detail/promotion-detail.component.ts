import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) + 2000;
    const max =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    if (pos > max) {
      if (this.articuloService.cargando == false) {
        this.articuloService
          .getProductsByPromotion(this.promocion.cod_promocion)
          .subscribe((resp: any) => {
            this.articulos.push(...resp.articulos);
          });
      }
    }
  }

  loadData() {
    const id = this.activatedRoute.snapshot.params.id;

    this.promocionService.getPromocionById(id).subscribe((resp: any) => {
      this.promocion = resp.promocion;

      this.articuloService
        .getProductsByPromotion(this.promocion.cod_promocion)
        .subscribe((resp: any) => {
          this.articulos = resp.articulos;
        });
    });
  }

  onProductClick(articulo: Articulo) {
    this.router.navigate(['producto', articulo._id]);
  }
}
