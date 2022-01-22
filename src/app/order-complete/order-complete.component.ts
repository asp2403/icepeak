import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { ShopService } from '../shop-service.service';
import { Shop } from '../shop';


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
  constructor(private shopService: ShopService) { }

  private init(): void {
    let orderJson = sessionStorage.getItem('order');
    if (orderJson) {
      this.order = JSON.parse(orderJson);
      console.log(this.order);
      if (this.order) {
        switch (this.order.orderType) {
          case 0:
            this.text.push({ name: 'Способ получения', value: 'Самовывоз из магазина' });
            this.text.push({ name: 'Магазин', value: this.shopList[this.order.shop!].title });
            this.text.push({ name: 'Адрес магазина', value: this.shopList[this.order.shop!].address });
            break;
          case 1:
            this.text.push({ name: 'Способ получения', value: 'Доставка курьером' });
            this.text.push({ name: 'Адрес доставки', value: this.order.deliveryAddress });

        }
      }
    }
  }

  ngOnInit(): void {
    this.shopService.getShopList().subscribe(list => {
      this.shopList = list;
      this.init();
    });

  }

}
