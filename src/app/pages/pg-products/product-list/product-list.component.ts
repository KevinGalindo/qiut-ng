import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiAccessService } from 'src/app/services/api/api-access.service';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  cate:string | null= '';
  open:boolean = false;


  constructor( private router: ActivatedRoute,
    public auth: ApiAccessService,
    public _dataProduct: ProductDataService,
    public _AuthService: ApiAccessService
  ) {
  }

  ngOnInit(): void {

    this._dataProduct.getProducts();

  }

}