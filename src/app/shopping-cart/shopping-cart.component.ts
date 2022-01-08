import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService, DSCartItem } from '../cart.service';
import { CartItem } from '../cart';
import { Location } from '@angular/common';
import { MatTable } from '@angular/material/table';
import { OnQuantityChangeEvent } from '../quantity-spinner/quantity-spinner.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string[] = ['id', 'vendor', 'model', 'price', 'quantity', 'action'];
  footerColumns: string[] = ['id', 'quantity'];
  dataSource: DSCartItem[] = [];

  @ViewChild(MatTable) table!: MatTable<DSCartItem>;

  constructor(private cartService: CartService, private location: Location) { }

  private updateDatasource(): void {
    this.dataSource = this.cartService.getDataSource();
  }

  ngOnInit(): void {
    this.updateDatasource();
  }

  getTotalCost(): number {
    return this.cartService.getTotalCost();
  }

  goBack(): void {
    this.location.back();
  }

  clearCart(): void {
    if (confirm('Вы действительно хотите очистить корзину?')) {
      this.cartService.clearCart();
      this.updateGrid();
    }
  }

  onQuantityChange(value: OnQuantityChangeEvent) {
    this.cartService.updateQuantity(value.index, value.quantity);
    this.updateGrid();
  }

  private updateGrid(): void {
    this.updateDatasource();
    this.table.renderRows();
  }

  delItem(index: number): void {
    if (confirm('Удалить товар из корзины?')) {
      this.cartService.delCartItem(index);
      this.updateGrid();
    }
  }

  cartIsEmpty(): boolean {
    return this.cartService.isEmpty();
  }





}
