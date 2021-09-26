import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductFilterPage } from './product-filter.page';

const routes: Routes = [
  {
    path: '',
    component: ProductFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductFilterPageRoutingModule {}
