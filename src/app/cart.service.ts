import { Injectable } from '@angular/core';
import { CartItem } from './cart';
import { Observable, of } from 'rxjs';
import { SkiService } from './ski.service';
import { PRODUCT_TYPE_SKI } from './Ski';

export const PRODUCT_TYPE_ERROR = -1;

export class DSCartItem {
  id?: number;
  vendor?: string;
  model?: string;
  price?: number;
  quantity?: number
}


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: CartItem[] = [];

  constructor(private skiService: SkiService) { }

  addToCart(id: number, idProductType: number): Observable<CartItem> {

    let cartItem: CartItem = new CartItem(null);
    if (idProductType == PRODUCT_TYPE_SKI) {
      const ski = this.skiService.getSki(id);

      ski.subscribe(ski => {
        cartItem = new CartItem(ski);
        this.cart.push(cartItem);
        return of(cartItem);
      });

    }
    return of(cartItem);
  }

  getCartQuantityText(): string {
    if (this.cart.length > 0) {
      return this.cart.length.toString();
    } else {
      return '';
    }
  }


  delCartItem(index: number) {
    this.cart.splice(index, 1);
  }

  clearCart(): void {
    this.cart = [];
  }

  getDataSource(): DSCartItem[] {
    let ds: DSCartItem[] = [];
    for (let cartItem of this.cart) {
      if (cartItem.product) {
        let dsItem: DSCartItem = new DSCartItem();
        dsItem.id = cartItem.product.id;
        dsItem.vendor = cartItem.product.vendor;
        dsItem.model = cartItem.product.model;
        dsItem.price = cartItem.product.price;
        dsItem.quantity = cartItem.quantity;
        ds.push(dsItem);
      }
    }
    return ds;
  }
}
