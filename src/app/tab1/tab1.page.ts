import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { AddToCartPage } from '../pages/add-to-cart/add-to-cart.page';
import { ProductFilterPage } from '../pages/product-filter/product-filter.page';
import { CartService } from '../services/cart/cart.service';
import { ProductsService } from '../services/products/products.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  // set app banner slides
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    }
  };

  bannerImages: any = [];
  //searchTerm: string;

  constructor(
    public productService : ProductsService,
    public routerOutlet : IonRouterOutlet,
    public modalCtrl : ModalController,
    public cart : CartService,
    private router: Router,
    private actionSheetController: ActionSheetController
  ) {
    this.bannerImages = this.productService.bannerImages;
    this.productService.initProductList();
  }

  search(term: string) {
    console.log({term});
    this.productService.searchProducts(term);
  }

  async addToCartModal(item) {
    console.log('item_id :>> ', item);
    let isAdded = this.cart.isAddedToCart(item.id);

    if ( !isAdded ) {
      this.cart.placeItem(item);
      const modal = await this.modalCtrl.create({
        component: AddToCartPage,
        cssClass: 'add-to-cart-modal',
        presentingElement: this.routerOutlet.nativeEl
      });
  
      await modal.present();
      
      await modal.onWillDismiss().then((result) => {
        console.log('result :>> ', result);
      }).catch((err) => {
        console.log('err :>> ', err);
      });

    } else {
      this.router.navigate(['/tabs/tab2']);
    }
    
  }

  async filterPage() {
    const modal = await this.modalCtrl.create({
      component: ProductFilterPage,
      //cssClass: ,
      presentingElement: this.routerOutlet.nativeEl
    });

    await modal.present();
    
    await modal.onWillDismiss().then((result) => {
      console.log('result :>> ', result);
    }).catch((err) => {
      console.log('err :>> ', err);
    });
  }

  async sortProducts() {
    console.log('productService.sort :>> ', this.productService.sort);
    const actionSheet = await this.actionSheetController.create({
        header: "Sort by",
        mode: "ios",
        cssClass: "sort-products",
        buttons: [{
                text: 'Latest Products',
                role: this.productService.sort.latest ? 'selected' : '',
                handler: () => {
                    this.productService.applyLocalSort ( 'id', 'asc', 'latest');
                }
            },
            {
                text: 'Price - Low to High',
                role: this.productService.sort.price_lth ? 'selected' : '',
                handler: () => {
                  this.productService.applyLocalSort ( 'price', 'desc', 'price_lth' );
                }
            },
            {
                text: 'Price - High to Low',
                role: this.productService.sort.price_htl ? 'selected' : '',
                handler: () => {
                  this.productService.applyLocalSort ( 'price', 'asc', 'price_htl' );
                }
                
            },
            {
              text: 'Cancel',
              icon: 'close',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
        ]
    });
    await actionSheet.present();
  }


}
