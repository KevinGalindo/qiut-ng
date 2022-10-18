import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';

import { ProductDataService } from 'src/app/services/product-data.service';
import { ProductInfo } from 'src/app/models/product';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiAccessService } from 'src/app/services/api/api-access.service';

@Component({
  selector: 'app-produc-info',
  standalone: true,
  templateUrl: './produc-info.component.html',
  styleUrls: ['./produc-info.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class ProducInfoComponent implements OnInit, AfterViewInit {
  
  product!: ProductInfo;
  status:"loading" | "load" | "error" = "error";

  edit:boolean = false;
  

  @ViewChild('contenedorImgSmal') ref:any

  constructor(public _dataProduct: ProductDataService,
    private route: ActivatedRoute,
    private location: Location,
    public _AuthService: ApiAccessService
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
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {

    // this._dataProduct.getProduct(this.id);
    
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

  volver(){
    this.location.back();
  }

}
