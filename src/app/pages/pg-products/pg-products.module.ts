import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PgProductsRoutingModule } from './pg-products-routing.module';
import { PgProductsComponent } from './pg-products.component';
import { ProductListComponent } from './product-list/product-list.component';


@NgModule({
  declarations: [
    PgProductsComponent,
  ],
  imports: [
    CommonModule,
    ProductListComponent,
    PgProductsRoutingModule
  ]
})
export class PgProductsModule { }
