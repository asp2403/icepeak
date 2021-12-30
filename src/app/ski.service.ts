import { Injectable } from '@angular/core';
import { Ski } from './Ski';
import { SKIS } from './mock-skis';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkiService {

  constructor() { }

  getSkis(): Observable<Ski[]> {
    return of(SKIS);
  }
}
