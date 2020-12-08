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
import { PromotionDetailComponent } from './promotion-detail/promotion-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SearchComponent } from './search/search.component';
import { DepartamentsComponent } from './departaments/departaments.component';
import { DepartamentsDetailComponent } from './departaments-detail/departaments-detail.component';

@NgModule({
  declarations: [
    PagesComponent,
    WelcomeComponent,
    PromotionDetailComponent,
    ProductDetailComponent,
    SearchComponent,
    DepartamentsComponent,
    DepartamentsDetailComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
  ],
  exports: [],
})
export class PagesModule {}
