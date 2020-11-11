import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  openNav() {
    document.getElementById('sidenav').style.left = '0px';
    document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
  }
}
