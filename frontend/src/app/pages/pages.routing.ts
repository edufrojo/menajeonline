import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

import { WelcomeComponent } from './welcome/welcome.component';
import { PromotionDetailComponent } from './promotion-detail/promotion-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'search', component: SearchComponent },
      { path: 'promocion/:id', component: PromotionDetailComponent },
      { path: 'producto/:id', component: ProductDetailComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
