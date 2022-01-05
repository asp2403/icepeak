import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SkiService } from '../ski.service';
import { Ski, PRODUCT_TYPE_SKI } from '../Ski';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  ski?: Ski;

  constructor(
    private route: ActivatedRoute,
    private skiService: SkiService,
    private location: Location,
    private snackBar: MatSnackBar,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getSki();
  }

  getSki(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.skiService.getSki(id).subscribe(ski => this.ski = ski);
  }

  goBack(): void {
    this.location.back();
  }

  addToCart(id: number): void {
    this.cartService.addToCart(id, PRODUCT_TYPE_SKI).subscribe((cartItem) => {
      
      if (cartItem.product)
      this.snackBar.open(`Лыжи ${cartItem.product.model} добавлены в корзину`, '', {
        duration: 2000,
        verticalPosition: 'top'
      });

      this.goBack()
    });
  }

}
