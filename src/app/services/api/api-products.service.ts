import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductInfo } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {

  constructor(
    private _http:HttpClient
  ) { }

  get(id: number): Observable<ProductInfo>{
    
    return this._http.get<IApiProductData>(`getproducts/${id}`)
    .pipe(map(result => {
      return new ProductInfo(result);
    }));
  }

  // Trae todos los productos de la api
  getAll(): Observable<ProductInfo[]>{
    
    return this._http.get<IApiProductData[]>('getproducts')
    .pipe(map(results => {
      console.log(results);
      return results.map(item => new ProductInfo(item));
    }));
  }

  create(data:IproductFormData, files:File[]): Observable<any> {

    let formData = new FormData();

    formData.append('data', JSON.stringify(data));
    


    files.forEach((f, i) => {
      formData.append(`img-${i}`, f);
    });

    return this._http.post('products', formData);
  }

  update(id:number, data:IproductFormData, files:File[],  deleteImgs: string[]): Observable<IApiProductData|false> {

    let formData = new FormData();

    formData.append('data', JSON.stringify(data));
    formData.append('deleteImgs', JSON.stringify(deleteImgs));

    files.forEach((f, i) => {
      formData.append(`img-${i}`, f);
    });

    return this._http.put<IApiProductData|false>(`products/${id}`, formData)
  }

}

export interface IproductFormData{
  name: string,
  price: string,
  description: string,
  type: string,
  categorys: string[]
}

/**
 * Estructura que retorna la API de php
 */
export interface IApiProductData{
  map(arg0: (item: IApiProductData) => ProductInfo): any;
  id: number,
  date: string,
  name: string,
  price: number,
  type: string,
  user: number,
  images: string[],
  description: string,
  categorys: string[],
}