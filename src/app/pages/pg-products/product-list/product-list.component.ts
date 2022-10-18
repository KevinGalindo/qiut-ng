import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductInfo } from 'src/app/models/product';

import { ApiAccessService } from 'src/app/services/api/api-access.service';
import { IApiProductData } from 'src/app/services/api/api-products.service';
import { ProductDataService } from 'src/app/services/product-data.service';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { ListFilterComponent } from './components/list-filter/list-filter.component';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    ListCategoriesComponent,
    ListFilterComponent
  ]
})
export class ProductListComponent implements OnInit {

  cate:string | null= '';
  loading:boolean = false;

  list:ProductInfo[] = [];

  constructor( private router: ActivatedRoute,
    public auth: ApiAccessService,
    public _dataProduct: ProductDataService,
    public _AuthService: ApiAccessService
  ) {

    this.loading = true;
    this._dataProduct.loadData().then(() => {
      
      console.log('Datos cargads');
      this.list = this._dataProduct.list;
      this.loading = false;
    }).catch(err => {
      
      console.error(err);
      this.loading = false;
    })
  }

  ngOnInit(): void {
  }

}