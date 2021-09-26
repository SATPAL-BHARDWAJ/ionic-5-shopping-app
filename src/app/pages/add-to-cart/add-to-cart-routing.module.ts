import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddToCartPage } from './add-to-cart.page';

const routes: Routes = [
  {
    path: '',
    component: AddToCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddToCartPageRoutingModule {}
