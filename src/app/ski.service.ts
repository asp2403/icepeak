import { Injectable } from '@angular/core';
import { Ski } from './Ski';
import { SKIS } from './mock-skis';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SkiService {

  cart: Ski[] = [];

  constructor() { }

  getSkis(): Observable<Ski[]> {
    return of(SKIS);
  }

  getSki(id: number): Observable<Ski> {
    const ski = SKIS.find(ski => ski.id === id)!;
    return of(ski);
  }

  addToCart(id: number): Observable<Ski> {
    const ski = this.getSki(id);
    ski.subscribe(ski => this.cart.push(ski));
    return ski;
  }
}
