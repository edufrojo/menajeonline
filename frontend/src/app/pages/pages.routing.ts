import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

import { WelcomeComponent } from './welcome/welcome.component';
import { PromotionDetailComponent } from './promotion-detail/promotion-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SearchComponent } from './search/search.component';
import { DepartamentsComponent } from './departaments/departaments.component';
import { DepartamentsDetailComponent } from './departaments-detail/departaments-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'search', component: SearchComponent },
      { path: 'departamentos', component: DepartamentsComponent },
      { path: 'departamentos/:nom', component: DepartamentsDetailComponent },
      { path: 'promocion/:cod', component: PromotionDetailComponent },
      { path: 'producto/:cod', component: ProductDetailComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
