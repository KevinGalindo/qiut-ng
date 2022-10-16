import { Injectable } from '@angular/core';
import { PorductInfo } from '../models/product';
import { ApiProductsService, IproductFormData } from './api/api-products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  list: PorductInfo[] =[];
  confirm = false;

  constructor(private _apiService: ApiProductsService) {
  }

  createProduct(product: IproductFormData, files:File[], categorys?: any[]):Promise<boolean>{

    

    return new Promise((resolve, reject) => {

      this._apiService.create(product, files).subscribe({
        next: res => {
          console.log(res);
          this.list.push(res);
          resolve(true);
        },
        error: err => {
          resolve(false);
        }
      })
    });
    
  }

  getProducts(){

     if (!this.confirm) {
        this._apiService.getAll().subscribe(resp =>{
        console.log(resp);
        this.confirm = true;
        this.list = resp;
      });
    }


  }

}