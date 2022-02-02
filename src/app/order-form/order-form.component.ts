import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ShopService } from '../shop-service.service';
import { Shop } from '../shop';
import { Order } from '../order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  orderTypeFormGroup!: FormGroup;
  deliveryFormGroup!: FormGroup;
  contactDataFormGroup!: FormGroup;
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


  constructor(private location: Location, private formBuilder: FormBuilder, 
    private shopService: ShopService, private router: Router) { }

  ngOnInit(): void {
    this.orderTypeFormGroup = this.formBuilder.group({
      orderType: [1, Validators.required],
    });
    this.deliveryFormGroup = this.formBuilder.group({
      shop: ['', this.deliveryValidator],
      deliveryAddress: ['', this.deliveryValidator],

    } );
    this.contactDataFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      patronymic: [],
      surname: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('\\d{3}\\s?\\d{3}\\s?\\d{2}\\s?\\d{2}')]],
      email: ['', [Validators.required, Validators.email]]
    });
    this.shopService.getShopList().subscribe(shopList => this.shopList = shopList);
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    let order: Order = {
      orderType: this.orderTypeFormGroup.controls['orderType'].value,
      shop: this.deliveryFormGroup.controls['shop'].value,
      deliveryAddress: this.deliveryFormGroup.controls['deliveryAddress'].value,
      contactData: {
        name: this.contactDataFormGroup.controls['name'].value,
        patronymic: this.contactDataFormGroup.controls['patronymic'].value,
        surname: this.contactDataFormGroup.controls['surname'].value,
        phone: this.contactDataFormGroup.controls['phone'].value,
        email: this.contactDataFormGroup.controls['email'].value
      }

    }
    sessionStorage.setItem('order', JSON.stringify(order));
    console.log (JSON.stringify(order));
    this.router.navigate(['order-complete']);

  }

}
