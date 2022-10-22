import { Injectable } from '@angular/core';
import { ResolveEnd } from '@angular/router';
import { zip } from 'rxjs';
import { ProductInfo } from '../models/product';
import { ApiProductsService, IApiProductData, IproductFormData } from './api/api-products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  private _loaded:boolean = false;

  /** Alamcenos las lista de los productos cargados de la API */
  list: ProductInfo[] = [];
  listProductsType: ProductInfo[] = [];
  listProductsCate: ProductInfo[] = [];

  confirm = false;

  constructor(private _apiService: ApiProductsService) {
  }

  /**
   * Carga los datos de la API para guardarlos en local y no recargar los datos de la API Casa ves que se abra la ventana
   */
  loadData():Promise<void>{
    return new Promise((resolve, reject) => {

      if (this._loaded){
        resolve();
      }else{
        this._apiService.getAll().subscribe(resp =>{
          this.list = resp;
          this._loaded = true;
          resolve();
        });
      }
    });
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

  getById(id:number): Promise<ProductInfo> {
    return new Promise((resolve, reject) => {

      let product: ProductInfo | undefined = this.list.find(x => x.id == id);

      if (product){
        resolve(product);
      } else {
        this._apiService.get(id).subscribe({
          next: res => {
            console.log(res);
            resolve(res);
          },
          error: err => {
            reject(err);
          }
        });
      }
    });
  }

  update(product: ProductInfo, data:IproductFormData, files:File[], deleteImgs:string[]): Promise<void> {
    return new Promise((resolve, reject ) => {

      this._apiService.update(product.id, data, files, deleteImgs).subscribe({
        next: res => {

          if (res){
            this.list.find(x => x.id == product.id)?.setData(res);
          }
          resolve();
        },
        error: err => {
          reject(err);
        }
      })

    });
  }

  deleteProduct(id: number): Promise<void>{
    return new Promise((resolve, reject) => {

    this._apiService.dalete(id).subscribe({
      next: res => {

        if (res) {
          let index = this.list.findIndex( x => x.id == id );
          this.list.splice(index,1);
        }
        resolve();
      },
      error: err => {
        reject(err);
      }
    })

    });
  }
}