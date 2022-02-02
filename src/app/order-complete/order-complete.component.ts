import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { ShopService } from '../shop-service.service';
import { Shop } from '../shop';
import { CartService } from '../cart.service';
import { Location } from '@angular/common';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';



interface NameValue {
  name: string | undefined;
  value: string | undefined;
}

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent implements OnInit {

  order?: Order;
  text: NameValue[] = [];
  shopList: Shop[] = [];

  

  constructor(private shopService: ShopService, private cartService: CartService, private location: Location,
    private orderService: OrderService, private router: Router) { }

  private init(): void {
    
    let orderJson = sessionStorage.getItem('order');
    if (orderJson) {
      this.order = JSON.parse(orderJson);

      if (this.order) {
        switch (this.order.orderType) {
          case 1:
            this.text.push({ name: 'Способ получения', value: 'Самовывоз из магазина' });
            this.text.push({ name: 'Магазин', value: this.shopList[this.order.shop!].title });
            this.text.push({ name: 'Адрес магазина', value: this.shopList[this.order.shop!].address });
            break;
          case 2:
            this.text.push({ name: 'Способ получения', value: 'Доставка курьером' });
            this.text.push({ name: 'Адрес доставки', value: this.order.deliveryAddress });
            break;
        }
        this.text.push({ name: 'Фамилия', value: this.order.contactData.surname });
        this.text.push({ name: 'Имя', value: this.order.contactData.name });
        this.text.push({ name: 'Отчество', value: this.order.contactData.patronymic });
        this.text.push({ name: 'Контактный телефон', value: '+7 ' + this.order.contactData.phone });
        this.text.push({ name: 'Email', value: this.order.contactData.email });
      }
    }
  }

  ngOnInit(): void {
    this.shopService.getShopList().subscribe(list => {
      this.shopList = list;
      this.init();
    });

  }

  
  goBack(): void {
    this.location.back();
  }

  makeOrder(): void {
    if (this.order) {
      this.orderService.makeOrder(this.order).subscribe(orderNo => {
        sessionStorage.setItem('orderNo', orderNo);
        this.cartService.clearCart();
        this.router.navigate(['final']);
      });
    }
  }

}
