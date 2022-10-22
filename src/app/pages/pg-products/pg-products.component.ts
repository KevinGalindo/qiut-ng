import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-pg-products',
  templateUrl: './pg-products.component.html',
  styleUrls: ['./pg-products.component.scss']
})
export class PgProductsComponent implements OnInit {

  cate: string = '';

  constructor(
    private router: Router,
    public _dataService: ProductDataService
  ) { }

  ngOnInit(): void {
  }

}
