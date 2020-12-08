import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Nomenclatura } from './../../models/nomenclatura.model';
import { NomenclaturaService } from '../../services/nomenclatura.service';

@Component({
  selector: 'app-departaments',
  templateUrl: './departaments.component.html',
  styleUrls: ['./departaments.component.scss'],
})
export class DepartamentsComponent implements OnInit {
  nomenclatura: Nomenclatura;
  nomenclaturas: Nomenclatura[];
  nomenPrimarias: Nomenclatura[];
  nomenSecundarias: Nomenclatura[];

  constructor(
    private router: Router,
    private nomenclaturaService: NomenclaturaService
  ) {}

  ngOnInit(): void {
    this.getDepartamentos();
  }

  getDepartamentos() {
    this.nomenclaturaService.getNomenclaturas().subscribe((resp: any) => {
      this.nomenclaturas = resp.nomenclaturas;
      this.nomenPrimarias = this.nomenclaturas.filter(
        (nomenclatura) => nomenclatura.nomenclatura.toString().length == 2
      );
      this.nomenSecundarias = this.nomenclaturas.filter(
        (nomenclatura) => nomenclatura.nomenclatura.toString().length == 4
      );
    });
  }

  onDepartamentClick(nomenclatura: Nomenclatura) {
    this.router.navigate(['departamentos/' + nomenclatura.nomenclatura]);
  }
}
