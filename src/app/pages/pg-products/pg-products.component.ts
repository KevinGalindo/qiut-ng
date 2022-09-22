import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pg-products',
  templateUrl: './pg-products.component.html',
  styleUrls: ['./pg-products.component.scss']
})
export class PgProductsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  filter( cate: string ){

    this.router.navigate( ['/productos'], {queryParams: {cate}} );

  }

}
