import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService, DSCartItem } from '../cart.service';
import { CartItem} from '../cart';
import { Location } from '@angular/common';
import { MatTable } from '@angular/material/table';
import { OnQuantityChangeEvent } from '../quantity-spinner/quantity-spinner.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string [] = ['id', 'vendor', 'model', 'price', 'quantity'];
  footerColumns: string [] = ['id', 'quantity'];
  dataSource: DSCartItem [] = [];

  @ViewChild(MatTable) table!: MatTable<DSCartItem>;

  constructor(private cartService: CartService, private location: Location) { }

  updateDatasource(): void {
    this.dataSource = this.cartService.getDataSource();
  }

  ngOnInit(): void {
    this.updateDatasource();
  }

  getTotalCost(): number {
    let sum = 0;
    for (let el of this.dataSource) {
      sum += (el.price ?? 0) * (el.quantity ?? 0);
    }
    return sum;
  }

  goBack(): void {
    this.location.back();
  }

  clearCart(): void {
    if (confirm('Вы действительно хотите очистить корзину?')) {
      this.cartService.clearCart();
      this.updateDatasource();
      this.table.renderRows();
    }
  }

  onQuantityChange(value: OnQuantityChangeEvent) {
    this.cartService.updateQuantity(value.index, value.quantity);
    this.updateDatasource();
    this.table.renderRows();
  }



  

}
