// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MaterialModule } from './../material.module';

// Rutas
import { RouterModule } from '@angular/router';

// Componentes comunes
import { SharedModule } from './../shared/shared.module';
import { ComponentsModule } from './../components/components.module';

// Componentes páginas
import { PagesComponent } from './pages.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  declarations: [PagesComponent, WelcomeComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
  ],
  exports: [PagesComponent, WelcomeComponent, ProductDetailComponent],
})
export class PagesModule {}
