import { Component, OnInit } from '@angular/core';
import { CartService, DSCartItem } from '../cart.service';
import { CartItem} from '../cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string [] = ['id', 'vendor', 'model', 'price', 'quantity'];
  dataSource: DSCartItem [] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.dataSource = this.cartService.getDataSource();
    
  }

}
