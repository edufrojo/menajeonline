import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../material.module';

import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';

import { PagesComponent } from './pages.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [PagesComponent, WelcomeComponent],
  imports: [CommonModule, MaterialModule, RouterModule, SharedModule],
  exports: [PagesComponent],
})
export class PagesModule {}
