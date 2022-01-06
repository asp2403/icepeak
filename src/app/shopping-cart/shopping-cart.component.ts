import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService, DSCartItem } from '../cart.service';
import { CartItem} from '../cart';
import { Location } from '@angular/common';
import { MatTable } from '@angular/material/table';

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

  ngOnInit(): void {
    this.dataSource = this.cartService.getDataSource();
    
  }

  getTotalCost(): number | undefined {
    return this.dataSource.map((el) => el.price).reduce((sum, cur) => (sum ?? 0) + (cur ?? 0), 0);
  }

  goBack(): void {
    this.location.back();
  }

  clearCart(): void {
    if (confirm('Вы действительно хотите очистить корзину?')) {
      this.cartService.clearCart();
      this.dataSource = this.cartService.getDataSource();
      this.table.renderRows();
    }
  }

}
