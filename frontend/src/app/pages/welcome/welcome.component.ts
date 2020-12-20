import { Component, Input, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

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
    private titleService: Title,
    private metaService: Meta,
    private promocionService: PromocionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Inicio - Menaje Hogar Jané');
    this.metaService.addTags([
      {
        name: 'keywords',
        content: 'tienda, menaje, hogar, decoración, ordenación, cocina',
      },
      {
        name: 'description',
        content:
          '🏡 ¿Buscas las últimas tendencias para tu hogar? Tienda especializada en productos de menaje, hogar, jardín y decoración.',
      },
    ]);

    this.getPromociones();
  }

  getPromociones() {
    this.promocionService.getPromociones().subscribe((resp: any) => {
      this.promociones = resp.promociones;
      this.promociones.reverse();
    });
  }
}
