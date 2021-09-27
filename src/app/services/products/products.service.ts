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

  allProducts: any = [];
  cartCount: number = 0;

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

  sort: Sort = {
    latest: false,
    price_lth: false,
    price_htl: false
  };

  beforeSort : any;

  constructor(
  ) { 
    
  }

  initProductList() {
    this.allProducts = this.products;
    this.showResultCount();
  }

  searchProducts( term: string ) {
    this.products = [];
    if ( `${term}`.trim() ) {
      let NotFoundInName = this.allProducts.map(item => {
        if ( item.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) < 0 ) {
          return item;
        } else {
          this.products.push(item);
        }
      });
      console.log({NotFoundInName});

      let NotFoundInCategory = NotFoundInName.map(item => {
        if (item) {
          if ( item.category.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) < 0 ) {
            return item;
          } else {
            this.products.push(item);
          }
        }
      });
      console.log({NotFoundInCategory});

      let foundInPrice = NotFoundInCategory.map(item => {
        if (item) {
          if ( `${item.price}`.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1 ) {
            this.products.push(item);
          }
        }
      });
    } else {
      this.products = this.allProducts;
    }

    this.showResultCount();
  }

  applyLocalSort ( column, order, type )  {
    this.uncheckSorts();
    this.sort[type] = true;
    console.log('column :>> ', column);
    this.beforeSort = this.products;

    this.products = this.beforeSort.sort((a, b) => {
      console.log('sort :>> ', a, b);
      if ( order === 'desc' ) {
        return a[column] > b[column];
      } else {
        return a[column] < b[column];
      }
    });

    this.showResultCount();
  }

  applyFilter() {
    console.log(this.selectedCategories, this.priceRange);
    if ( this.selectedCategories.length > 0 || this.priceRange.applied ) {
      console.log('Filter applied :>> ');
      this.products = [];

      for(let i = 0; i < this.allProducts.length; i++) {
        let foundCategory = true, foundPrice = true;

        if ( this.selectedCategories.length > 0 ) {
          foundCategory = this.selectedCategories.some( val => val.category.toLocaleLowerCase() === this.allProducts[i]['category'].toLocaleLowerCase() && val.isChecked);
        }
        
        if ( this.priceRange.applied ) {
          let price = this.allProducts[i]['price'];
          foundPrice = ( price >= this.priceRange.lower && price <= this.priceRange.upper );
        }
        
        if(foundCategory && foundPrice) {
          this.products.push(this.allProducts[i]);
        }
        
      }
    } else {
      console.log('No Filter found:>> ');
      this.products = this.allProducts;
    }

    if ( Object.values(this.sort).some(el => el) ) {
      this.verifySort();
    }

    this.showResultCount();
  }
  
  verifySort() {
    if ( this.sort.latest ) {
      this.applyLocalSort ( 'id', 'asc', 'latest');
    } else if (this.sort.price_lth) {
      this.applyLocalSort ( 'price', 'desc', 'price_lth' );
    } else if (this.sort.price_htl) {
      this.applyLocalSort ( 'price', 'asc', 'price_htl' );
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
    this.allProducts = [];
    this.beforeSort = [];

    this.uncheckFilters();
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

  uncheckSorts() {
    this.defaultSorting();
  }

  defaultSorting() {
    Object.keys(this.sort).forEach(key => {
      this.sort[key] = false;
    })
  }

  isSorted() {
    return Object.values(this.sort).some(el => el);
  }

  isFiltered() {
    return this.selectedCategories.length > 0 || this.priceRange.applied;
  }

}

interface PriceRange {
  lower: any,
  upper: any,
  applied: boolean
}

interface Sort {
  latest: boolean,
  price_lth: boolean,
  price_htl: boolean
}