import { Injectable } from '@angular/core';
import { ApiProductsService } from './api/api-products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  list: any[] =[];
  confirm = false;

  constructor(private _apiService: ApiProductsService) { }

  createProduct(product: Iproduct, files:File[], categorys?: any[]):Promise<boolean>{

    let productTmp = {
      ...product,
      categorys
    }

    return new Promise((resolve, reject) => {

      this._apiService.create(productTmp, files).subscribe({
        next: res => {
          console.log(res);
          this.list.push(product);
          resolve(true);
        },
        error: err => {
          resolve(false);
        }
      })
    });
    
  }

  getProducts(){

    

  }

}

interface Iproduct{
  name: string,
  price: string,
  type: string,
  description?: string
}