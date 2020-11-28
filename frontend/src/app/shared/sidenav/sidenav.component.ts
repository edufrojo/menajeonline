import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Promocion } from '../../models/promocion.model';
import { PromocionService } from '../../services/promocion.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  promociones: Promocion[];
  @Output() sidenavClose = new EventEmitter();

  constructor(
    private promocionService: PromocionService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.getPromociones();
  }

  getPromociones() {
    this.promocionService.getPromociones().subscribe((resp: any) => {
      this.promociones = resp.promociones;
    });
  }

  onPromocionClick(promocion: Promocion) {
    this.sidenavClose.emit();
    this.router.navigate(['/promocion/' + promocion.cod_promocion]);
  }

  onChangePage(path) {
    this.sidenavClose.emit();
    this.router.navigate(['/search']);
  }
}
