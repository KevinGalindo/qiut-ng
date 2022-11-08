import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiFilterServicesService {

  categories: Icategories[] = [];

  constructor(private _http: HttpClient) { }

  getAll(){
    return this._http.get<Icategories[]>('categories');
  }

  createCategory(category: string){

    const data = {
      name: category
    }

    return this._http.post<Icategories>('categories', data);

  }

  deleteCategory(id: number){
    return this._http.delete<IapiRest>(`categories/${id}`);
  }

}

export interface IapiRest{
  status: boolean;
  mesaje: string;
}

export interface Icategories{
  id: number;
  name: string;
}