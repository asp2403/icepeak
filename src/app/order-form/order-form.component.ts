import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { DSCartItem } from '../cart.service';
import { Location } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ShopService } from '../shop-service.service';
import { Shop } from '../shop';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  displayedColumns: string[] = ['vendor', 'model', 'price', 'quantity'];
  footerColumns: string[] = ['vendor', 'quantity'];
  dataSource: DSCartItem[] = [];
  orderTypeFormGroup!: FormGroup;
  deliveryFormGroup!: FormGroup;
  paymentFormGroup!: FormGroup;
  orderTypeList = [
    {id: 1, name: 'orderType', value: 'Самовывоз из магазина'},
    {id: 2, name: 'orderType', value: 'Доставка курьером'}
  ];
  shopList: Shop[] = [];


  constructor(private cartService: CartService, private location: Location, private formBuilder: FormBuilder, private shopService: ShopService) { }

  ngOnInit(): void {
    this.dataSource = this.cartService.getDataSource();
    this.orderTypeFormGroup = this.formBuilder.group({
      orderType: [1, Validators.required],
    });
    this.deliveryFormGroup = this.formBuilder.group({
      shop: ['', Validators.required]

    });
    this.paymentFormGroup = this.formBuilder.group({});
    this.shopService.getShopList().subscribe(shopList => this.shopList = shopList);
  }

  getTotalCost() {
    return this.cartService.getTotalCost();
  }

  goBack() {
    this.location.back();
  }

}
