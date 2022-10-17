import { Injectable } from '@angular/core';
import { ProductInfo } from '../models/product';
import { ApiProductsService, IApiProductData, IproductFormData } from './api/api-products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  list: ProductInfo[] =[];
  listProductsType: ProductInfo[] = [];
  listProductsCate: ProductInfo[] = [];

  product: IApiProductData | any;

  cate: string = '';
  confirm = false;

  constructor(private _apiService: ApiProductsService) {
  }

  // Este metodo crea un producto
  createProduct(product: IproductFormData, files:File[]):Promise<boolean>{

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
      this.listProductsCate = this.listProductsType = this.list = resp;
      });
    }

  }

  getProduct(id: string | null){

    this._apiService.get(id).subscribe(resp => {
      console.log(resp);
      this.product = resp;
    });

  }

  // Filtrar productos por el valor type
  filtrarProductsType(type: string){
    
    this.listProductsCate = this.listProductsType = this.list.filter((data: ProductInfo) => {
	    return data.type == type;
    });

  }

  // Filtra producto por busqueda
  buscarProductService(search: string){
    
    let searchVal = search.toLowerCase();

    this.listProductsCate = this.listProductsType.filter((data: ProductInfo) => {
	    return data.name.toLowerCase().startsWith(searchVal);
    });

  }

}