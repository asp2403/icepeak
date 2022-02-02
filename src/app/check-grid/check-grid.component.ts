import { Component, OnInit } from '@angular/core';
import { DSCartItem } from '../cart.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-check-grid',
  templateUrl: './check-grid.component.html',
  styleUrls: ['./check-grid.component.css']
})
export class CheckGridComponent implements OnInit {

  displayedColumns: string[] = ['vendor', 'model', 'price', 'quantity'];
  footerColumns: string[] = ['vendor', 'quantity'];
  dataSource: DSCartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.dataSource = this.cartService.getDataSource();
  }

  getTotalCost(): number {
    return this.cartService.getTotalCost();
  }


}
