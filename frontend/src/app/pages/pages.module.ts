// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MaterialModule } from './../material.module';

// Rutas
import { RouterModule } from '@angular/router';

// Componentes comunes
import { SharedModule } from './../shared/shared.module';

// Componentes páginas
import { PagesComponent } from './pages.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [PagesComponent, WelcomeComponent],
  imports: [CommonModule, MaterialModule, RouterModule, SharedModule],
  exports: [PagesComponent],
})
export class PagesModule {}
