import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  selectedCategories: any = [];

  priceRange: PriceRange = {
    lower: 0,
    upper: 100,
    applied: false
  };

  filterItems: any = [];

  cartCount: number = 0;

  listBy: ListBy = {
    nav: false,
    search: false,
    banner: false,
    details: false
  };

  show_result_size: boolean = true;

  bannerImages = [
    {
      imgurl: 'assets/images/slide1.jpg'
    }, {
      imgurl: 'assets/images/slide2.jpg'
    }, {
      imgurl: 'assets/images/slide3.jpg'
    }
  ];

  products = [
    {
      id : 1,
      imgurl: 'assets/images/slide1.jpg',
      name: 'Multi color bags',
      category: 'shopping',
      price: 67,
      totalStock: 10
    }, {
      id : 2,
      imgurl: 'assets/images/slide3.jpg',
      name: 'Daily use bags',
      category: 'routine',
      price: 37,
      totalStock: 10
    }, {
      id : 3,
      imgurl: 'assets/images/slide2.jpg',
      name: 'Real Value',
      category: 'folk',
      price: 77,
      totalStock: 10
    }, {
      id : 4,
      imgurl: 'assets/images/slide1.jpg',
      name: 'Vosto bags',
      category: 'shopping',
      price: 65,
      totalStock: 10
    }
  ];

  categories : any = [
    {
      category : 'shopping'
    }, {
      category : 'folk'
    }, {
      category : 'routine'
    }
  ];

  constructor(
  ) { 
    
  }

  initProductList() {
    this.filterItems = this.products;
    this.showResultCount();
  }

  applyFilter() {
    console.log(this.selectedCategories, this.priceRange);
    if ( this.selectedCategories.length > 0 || this.priceRange.applied ) {
      console.log('Filter applied :>> ');
      this.products = [];

      for(let i = 0; i < this.filterItems.length; i++) {
        let foundCategory = true, foundPrice = true;

        if ( this.selectedCategories.length > 0 ) {
          foundCategory = this.selectedCategories.some( val => val.category.toLocaleLowerCase() === this.filterItems[i]['category'].toLocaleLowerCase() && val.isChecked);
        }
        
        if ( this.priceRange.applied ) {
          let price = this.filterItems[i]['price'];
          foundPrice = ( price >= this.priceRange.lower && price <= this.priceRange.upper );
        }
        
        if(foundCategory && foundPrice) {
          this.products.push(this.filterItems[i]);
        }
        
      }
    } else {
      console.log('No Filter found:>> ');
      this.products = this.filterItems;
    }
  } 


  showResultCount() {
    this.show_result_size = true;
    setTimeout(() => {
      this.show_result_size = false;
    }, 2000);
  }

  resetItems() {
    this.products = [];
    this.filterItems = [];

    this.uncheckFilters();
    this.defaultListBy();
  } 

  uncheckFilters() {
    this.selectedCategories = []
    this.defaultPriceRange();

    for( let i = 0; i < this.categories.length; i++) {
      this.categories[i].isChecked = false;
    }
  }

  defaultPriceRange() {
    this.priceRange = {
      applied:  false,
      lower : 0,
      upper : 100
    }
    
  }

  defaultListBy() {
    Object.keys(this.listBy).forEach(key => {
      this.listBy[key] = false;
    })
  }

}

interface PriceRange {
  lower: any,
  upper: any,
  applied: boolean
}

interface ListBy {
  search: boolean,
  banner: boolean,
  nav: boolean,
  details: boolean
}