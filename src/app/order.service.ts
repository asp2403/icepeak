import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  makeOrder(order: Order): Observable<string> {
    let orderNo = Math.round(Math.random() * 999 + 1);
    return of('ICEPEAK-' + orderNo);
  }
}
