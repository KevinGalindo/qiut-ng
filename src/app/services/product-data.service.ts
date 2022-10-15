import { Injectable } from '@angular/core';
import { ApiProductsService } from './api/api-products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  list: Iproduct[] =[];
  confirm = false;

  constructor(private _apiService: ApiProductsService) {
    console.log('hola');
  }

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

    if (this.confirm) {
      
      this._apiService.getAll().subscribe(resp =>{
        console.log(resp);
      });

    }

  }

}

interface Iproduct{
  name: string,
  price: string,
  type: string,
  description?: string,
  categorys?: any[]
}