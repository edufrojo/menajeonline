import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SearchService } from '../../services/search.service';
import { Articulo } from '../../models/articulo.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public articulos: Articulo[] = [];
  public articulosTemp: Articulo[] = [];
  public totalArticulos: number;

  public texto: string;

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit(): void {
    this.articulosTemp = this.articulos;
  }

  buscar(termino: string) {
    if (termino !== '' && this.texto !== termino) {
      this.texto = termino;
      this.searchService.busquedaGlobal(termino).subscribe((resp: any) => {
        this.articulos = resp.articulos;
        this.totalArticulos = resp.totalArticulos;
      });
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) + 2000;
    const max =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    if (pos > max) {
      if (this.searchService.cargando == false) {
        this.searchService.busquedaGlobal(this.texto).subscribe((resp: any) => {
          this.articulos.push(...resp.articulos);
        });
      }
    }
  }

  onArticuloClick(articulo: Articulo) {
    this.router.navigate(['producto', articulo._id]);
  }
}
