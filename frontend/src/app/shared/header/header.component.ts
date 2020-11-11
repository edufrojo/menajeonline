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
    document.getElementById('sidenav-background').style.display = 'block';
    document.getElementById('sidenav-background').style.visibility = 'visible';
  }
}
