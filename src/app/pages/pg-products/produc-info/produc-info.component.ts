import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';

import { ProductDataService } from 'src/app/services/product-data.service';
import { ProductInfo } from 'src/app/models/product';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiAccessService } from 'src/app/services/api/api-access.service';
import { DialogModalService } from 'src/app/components/dialog-modal/dialog-modal.service';
import { ApiInfoEmpresService, InfoEmpresa } from 'src/app/services/api-info-empres.service';

@Component({
  selector: 'app-produc-info',
  standalone: true,
  templateUrl: './produc-info.component.html',
  styleUrls: ['./produc-info.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class ProducInfoComponent implements OnInit {
  
  product!: ProductInfo;
  status:"loading" | "load" | "error" = "error";

  edit:boolean = false;
  infoEmpres: InfoEmpresa[] = [];
  

  constructor(public _dataProduct: ProductDataService,
    private route: ActivatedRoute,
    private location: Location,
    public _AuthService: ApiAccessService,
    private _modal: DialogModalService,
    private _apiIfoEmpres: ApiInfoEmpresService
  ) {
    
    this._dataProduct.loadData().then(() => {
      let param:string|null = this.route.snapshot.paramMap.get('id');
    
      if (param &&  param.match('[0-9]+')){

        let id:number = Number.parseInt(param);
        
        this._dataProduct.getById(id).then(p => {
          this.product = p;
          this.status = "load";

        }).catch(err => {
          
          this.status = "error";
          console.error(err);
        });
      }
    }).catch(err => {
      console.error(err);
    })

  }
  
  ngOnInit(): void {   
    this.infoEmpres = this._apiIfoEmpres.InfoEmpres;
  }
  
  cambiarImg(img: HTMLImageElement, imgContainer: HTMLImageElement, contenedorImgSmal: HTMLDivElement){

    let imgSmal = img.getAttribute('src');
    let imgCon = imgContainer.getAttribute('src');
    let imgsSmal = contenedorImgSmal.children;

    for (let i = 0; i < imgsSmal.length; i++) {
      const element = imgsSmal[i];
  
      element.classList.remove('active');
    }

    if(imgSmal != imgCon){

      imgContainer.removeAttribute('src');
      imgContainer.setAttribute('src', `${imgSmal}`);
      img.classList.add('active');
      
    }

  }

  DeleteProduct(){
    this._modal.info({content: '¿Esta seguro de borrar este producto?', confirm: true, title: 'Borrar producto'})
    .then((res) => {
      if (res) {
        
        this._dataProduct.deleteProduct(this.product.id).then(() => {
          this.location.back();
        });
      
      }
    })
  }

  volver(){
    this.location.back();
  }

}
