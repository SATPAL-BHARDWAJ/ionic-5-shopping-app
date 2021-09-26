import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.page.html',
  styleUrls: ['./product-filter.page.scss'],
})
export class ProductFilterPage implements OnInit {

  tabs = {
    categories: true,
    price: false
  }

  constructor(
    private modalCtrl: ModalController,
    public productService: ProductsService
  ) {
  
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  price_input() {
    this.productService.priceRange.applied = true;
  }

  price_range(event) {
    let range = event.detail.value;
    this.productService.priceRange.lower = range.lower;
    this.productService.priceRange.upper = range.upper;
    this.productService.priceRange.applied = true;
  }

  selectFilter(type: string) {
    Object.keys(this.tabs).forEach((value, index)=>{
      console.log('object :>> ', value, index);
      this.tabs[value] = false;
    })

    this.tabs[type] = true;
  }

  setFilter(i: number, type: string) {
    console.log('setFilter :>> ', i, type);

    if ('undefined' === typeof this.productService[type][i]['isChecked']) {
      this.productService[type][i]['isChecked'] = false;
    }

    this.productService[type][i]['isChecked'] = !this.productService[type][i]['isChecked'];
  } 

  applyFilter(){
    this.productService.selectedCategories = this.productService.categories.filter(val => val.isChecked);
    this.productService.applyFilter();
    this.modalCtrl.dismiss(true);
  }

  clearFilter() {
    this.productService.uncheckFilters();
    this.productService.applyFilter();
    this.modalCtrl.dismiss(true);
  }

}
