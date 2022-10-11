import { Injectable } from '@angular/core';
import { ProductsService } from './api/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  list: any[] =[];
  confirm = false;

  constructor(private _apiService: ProductsService) { }

  getProducts(){

    if(this.confirm){
      return this.list;
    } else {
      this._apiService.getAll()
    }

  }

}
