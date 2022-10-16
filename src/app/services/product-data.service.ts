import { Injectable } from '@angular/core';
import { ApiProductsService, IproductFormData } from './api/api-products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  list: IproductData[] =[];
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
        this._apiService.getAll().subscribe((resp:IproductData[]) =>{
        console.log(resp);
        this.confirm = true;
        this.list = resp;
      });
    }


  }

}

interface IproductData{
  id: number,
  date: Date,
  name: string,
  price: string,
  type: string,
  user: number,
  images: string[],
  description?: string,
  categorys?: string[],
}