import { Component, HostListener, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { Router, ActivatedRoute } from '@angular/router';

import { Nomenclatura } from 'src/app/models/nomenclatura.model';
import { NomenclaturaService } from 'src/app/services/nomenclatura.service';

import { Articulo } from 'src/app/models/articulo.model';
import { ArticuloService } from 'src/app/services/articulo.service';

@Component({
  selector: 'app-departaments-detail',
  templateUrl: './departaments-detail.component.html',
  styleUrls: ['./departaments-detail.component.scss'],
})
export class DepartamentsDetailComponent implements OnInit {
  nomenclatura: Nomenclatura;
  articulos: Articulo[];

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private nomenclaturaService: NomenclaturaService,
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
          .getProductsByNomenclatura(this.nomenclatura.nomenclatura)
          .subscribe((resp: any) => {
            this.articulos.push(...resp.articulos);
          });
      }
    }
  }

  loadData() {
    const cod = this.activatedRoute.snapshot.params.nom;

    this.nomenclaturaService
      .getNomenclaturaByCod(cod)
      .subscribe((resp: any) => {
        this.nomenclatura = resp.nomenclatura;

        this.titleService.setTitle(
          this.nomenclatura.denominacion + ' - Menaje Hogar Jané'
        );

        this.metaService.addTags([
          { name: 'keywords', content: 'Menaje, Hogar, Jardin' },
          {
            name: 'description',
            content: 'Lista de productos de la promocion',
          },
        ]);

        this.articuloService
          .getProductsByNomenclatura(this.nomenclatura.nomenclatura)
          .subscribe((resp: any) => {
            this.articulos = resp.articulos;
          });
      });
  }

  onProductClick(articulo: Articulo) {
    this.router.navigate(['producto/' + articulo.cod_articulo]);
  }
}
