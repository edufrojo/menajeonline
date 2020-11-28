import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Promocion } from './../../models/promocion.model';
import { PromocionService } from '../../services/promocion.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  promociones: Promocion[];

  @Input() public promotionTitle: String;
  @Input() public promotionCod: String;

  constructor(
    private promocionService: PromocionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPromociones();
  }

  getPromociones() {
    this.promocionService.getPromociones().subscribe((resp: any) => {
      this.promociones = resp.promociones;
      this.promociones.reverse();
    });
  }
}
