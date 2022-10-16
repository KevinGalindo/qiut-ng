import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {

  constructor(
    private _http:HttpClient
  ) { }

  getAll(): Observable<IproductData[]>{
    return this._http.get<IproductData[]>('getproducts');
  }

  create(data:Iproduct, files:File[]): Observable<any> {

    let formData = new FormData();

    formData.append('data', JSON.stringify(data));

    files.forEach((f, i) => {
      formData.append(`img-${i}`, f);
    });

    return this._http.post('products', formData);
  }

}

interface Iproduct{
  name: string,
  price: string,
  description?: string,
  categorys?: any[]
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