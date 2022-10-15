import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiAccessService } from 'src/app/services/api/api-access.service';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() cate:string = '';
  open:boolean = false;

  products: any[] = [];

  constructor( private router: ActivatedRoute,
    public auth: ApiAccessService,
    private _dataProduct: ProductDataService) {

    this.router.queryParams.subscribe();

  }

  ngOnInit(): void {

    // this.products = this._dataProduct.list;
    this._dataProduct.getProducts();

  }

}
