import { Injectable } from '@angular/core';
import { ProductInfo } from '../models/product';
import { ApiProductsService, IproductFormData } from './api/api-products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  list: ProductInfo[] =[];
  listProductsType: ProductInfo[] = [];
  cate: string = '';
  confirm = false;

  constructor(private _apiService: ApiProductsService) {
  }

  // Este metodo crea un producto
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

  // Este metodo trae todos lo productos
  getProducts(){

    if (!this.confirm) {
      this._apiService.getAll().subscribe(resp =>{
      console.log(resp);
      this.confirm = true;
      this.listProductsType = this.list = resp;
      });
    }

  }

  filtrarProductsType(type: string){
    
    this.listProductsType = this.list.filter((data: ProductInfo) => {
	    return data.type == type;
    });
    console.log(this.listProductsType);

  }

}