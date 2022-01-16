import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { DSCartItem } from '../cart.service';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
    { id: 1, value: 'Самовывоз из магазина' },
    { id: 2, value: 'Доставка курьером' }
  ];
  shopList: Shop[] = [];
  
  deliveryValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const shop = this.deliveryFormGroup?.controls['shop'];
    const deliveryAddress = this.deliveryFormGroup?.controls['deliveryAddress'];
    const orderType = this.orderTypeFormGroup.controls['orderType'].value;
    shop?.setErrors(null);
    deliveryAddress?.setErrors(null);
    switch (orderType) {
      case 1:
        if (!shop?.value) {
          return { requiredShop: true };
        }
        break;
      case 2:
        if (!deliveryAddress?.value) {
          return {requiredAddress: true};
        }
        break;
    }
    return null;
  }


  constructor(private cartService: CartService, private location: Location, private formBuilder: FormBuilder, private shopService: ShopService) { }

  ngOnInit(): void {
    this.dataSource = this.cartService.getDataSource();
    this.orderTypeFormGroup = this.formBuilder.group({
      orderType: [1, Validators.required],
    });
    this.deliveryFormGroup = this.formBuilder.group({
      shop: ['', this.deliveryValidator],
      deliveryAddress: ['', this.deliveryValidator],

    } );
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
