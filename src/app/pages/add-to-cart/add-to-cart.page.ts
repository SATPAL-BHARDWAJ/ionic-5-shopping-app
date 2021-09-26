import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart/cart.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.page.html',
  styleUrls: ['./add-to-cart.page.scss'],
})
export class AddToCartPage implements OnInit {

  minOrderQty: any;
  availableQty: any;

  constructor(
    private modalCtrl: ModalController,
    public cart: CartService,
    public utility: UtilityService
  ) {
    this.minOrderQty = 1;
    this.cart.item['cartQuantity'] =  this.minOrderQty;
    this.availableQty  = this.cart.item['totalStock'] || 0;
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  increaseQuantity() {
    let itemQty = this.getCartItemQty();
    
    let increasedQty = itemQty + 1;
    if (increasedQty <= this.availableQty) {
      this.cart.item['cartQuantity'] += 1;
    } else {
      this.utility.showToast(`This Stock is not available!`, 'top', 'error');
    }
  }

  decreaseQuantity() {
    let itemQty = this.cart.item['cartQuantity'];

    let decreasedQty = itemQty - 1;
    if (decreasedQty >= this.minOrderQty) {
      this.cart.item['cartQuantity'] -= 1;
    } else {
      this.utility.showToast(`Minimum order quantity is ${this.minOrderQty}`, 'top', 'error');
    }
  }

  getCartItemQty() {
    let index = this.cart.items.findIndex(value => value.id === this.cart.item.id);
    let qty = this.cart.item['cartQuantity'];
    if ( index > -1 ) {
      qty = this.cart.items[index]['cartQuantity'] + this.cart.item['cartQuantity'];
    }
    return qty;
  }

  addToCart() {
    let itemQty = this.getCartItemQty();

    let validOrder = this.availableQty > 0 
      && itemQty <= this.availableQty;
    
    if ( validOrder ) {
      this.cart.addToCart();
      this.modalCtrl.dismiss();
    } else {
      this.utility.showToast('This product is out of stock!', 'top', 'error');
    }
  }


}
