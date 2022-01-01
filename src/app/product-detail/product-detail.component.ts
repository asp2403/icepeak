import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SkiService } from '../ski.service';
import { Ski } from '../Ski';
import {MatSnackBar} from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
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
    this.skiService.addToCart(id).subscribe(ski => {
      this.snackBar.open(`Лыжи ${ski.model} добавлены в корзину`, '', {
        duration: 2000,
        verticalPosition: 'top'
      });
      
      this.goBack()});
  }

}
