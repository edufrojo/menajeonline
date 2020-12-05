import { Component, HostListener, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

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
    private titleService: Title,
    private metaService: Meta,
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
    const cod = this.activatedRoute.snapshot.params.cod;

    this.promocionService.getPromocionByCod(cod).subscribe((resp: any) => {
      this.promocion = resp.promocion;

      this.titleService.setTitle(
        this.promocion.denominacion + ' - Menaje Hogar Jané'
      );

      this.metaService.addTags([
        { name: 'keywords', content: 'Menaje, Hogar, Jardin' },
        { name: 'description', content: 'Lista de productos de la promocion' },
      ]);

      this.articuloService
        .getProductsByPromotion(this.promocion.cod_promocion)
        .subscribe((resp: any) => {
          this.articulos = resp.articulos;
        });
    });
  }

  onProductClick(articulo: Articulo) {
    this.router.navigate(['producto/' + articulo.cod_articulo]);
  }
}
