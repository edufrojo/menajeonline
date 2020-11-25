import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-boton-atras',
  templateUrl: './boton-atras.component.html',
  styleUrls: ['./boton-atras.component.scss'],
})
export class BotonAtrasComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  backClicked() {
    this.location.back();
  }
}
