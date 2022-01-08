import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { DSCartItem } from '../cart.service';
import { Location } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  constructor(private cartService: CartService, private location: Location, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.dataSource = this.cartService.getDataSource();
    this.orderTypeFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
  }

  getTotalCost() {
    return this.cartService.getTotalCost();
  }

  goBack() {
    this.location.back();
  }

}
