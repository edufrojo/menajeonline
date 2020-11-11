import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  closeNav() {
    document.getElementById('sidenav').style.left = '-200px';
    document.getElementById('sidenav-background').style.display = 'none';
    document.getElementById('sidenav-background').style.visibility = 'hidden';
  }
}
