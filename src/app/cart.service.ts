import { Injectable } from '@angular/core';
import { CartItem } from './cart';
import { Observable, of } from 'rxjs';
import { SkiService } from './ski.service';
import { PRODUCT_TYPE_SKI } from './Ski';

export const PRODUCT_TYPE_ERROR = -1;


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
}
