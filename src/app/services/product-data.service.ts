import { Injectable } from '@angular/core';
import { ProductsService } from './api/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  list: any[] =[];
  confirm = false;

  constructor(private _apiService: ProductsService) { }

  createProduct(product: any){

    this.list.push(product);


  }

  getProducts(){

    

  }

}

interface Iproduct{
  nombre: string,
  precio: string
}