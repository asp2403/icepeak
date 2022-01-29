import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css']
})
export class FinalComponent implements OnInit {

  orderNo?: string | null;

  constructor() { }

  ngOnInit(): void {
    this.orderNo = sessionStorage.getItem('orderNo');
  }

}
