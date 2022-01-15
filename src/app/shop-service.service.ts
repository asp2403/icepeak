import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SHOPS } from './mock-shops';
import { Shop } from './shop';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor() { }

  getShopList(): Observable<Shop[]> {
    return of(SHOPS);
  }
}
