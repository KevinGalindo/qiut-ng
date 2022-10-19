import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


import { MultiSelectComponent } from './multi-select/multi-select.component';
import { ProductInfo } from 'src/app/models/product';
import { ProductDataService } from 'src/app/services/product-data.service';
import { DialogModalService } from 'src/app/components/dialog-modal/dialog-modal.service';

@Component({
  selector: 'app-produc-form',
  standalone: true,
  templateUrl: './produc-form.component.html',
  styleUrls: ['./produc-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MultiSelectComponent
  ],
})
export class ProducFormComponent implements OnInit {

  loading:boolean = false;
  forma = new FormGroup({
    name:         new FormControl(``,{ nonNullable: true, validators: [Validators.required] }),
    price:        new FormControl('',{ nonNullable: true, validators: [Validators.required]}),
    description:  new FormControl('',{ nonNullable: true }),
    type:         new FormControl('', { nonNullable: true, validators: Validators.required}),
    categorys:    new FormControl<string[]>([], { nonNullable: true, validators: Validators.required})
  });

  images:{file:File, src:string}[] = [];

  productEdit:ProductInfo|null = null;

  constructor(
    private _modal: DialogModalService,
    private _dataProduct: ProductDataService,
    private _sanitizer:DomSanitizer,
    private _location:Location,
    private _routeActived:ActivatedRoute
  ) { }

  ngOnInit(): void {
  
    this._routeActived.parent?.paramMap.subscribe(res => {

        let param:string|null = res.get('id');
        if (param){
          let id:number = Number.parseInt(param);
            
          this._dataProduct.getById(id).then(p => {

            this.productEdit = p;

            this.forma.setValue(p.getValuesForm());

          }).catch(err => {
            
            console.error(err);
          });
        }
    })
  }

  get isNombreInvalid():boolean{
    return this.forma.controls.name.invalid && this.forma.controls.name.touched;
  }

  get isPreciovalid():boolean{
    return this.forma.controls.price.invalid && this.forma.controls.price.touched;
  }

  tryFile(e:Event): void {

    let imgs:File[] = Array.from((e.target as HTMLInputElement).files || []);
    
    imgs.forEach(file => {

      this.extracBase64(file).then(src => {

        this.images.push({file, src});

      });

    });
  }

  extracBase64(file:File):Promise<string>{
    return new Promise((resolve, reject) => {
      try {
        const usafeImg = window.URL.createObjectURL(file);
        const image = this._sanitizer.bypassSecurityTrustUrl(usafeImg);
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          resolve((reader.result as string));
        }

        reader.onerror = error=>{
          reject();
        }

        return undefined;

      } catch (error) {
        return undefined;
      }
    });
  }

  send(): void {

    console.log(this.forma.value);

    if (this.forma.invalid) {
      this._modal.error({
        content: 'Error en la informacion',
        title: 'Error'
      })
      return;
    }


    if (this.productEdit){
      // Editar
      this.loading = true;
      this._dataProduct.update(this.productEdit, this.forma.getRawValue(), this.images.map(val => val.file), []).then(() => {
        this.loading = false;
        this._location.back()
      })
      .catch(err => {

        console.error(err);
        this.loading = false;
      });

      return;
    }


    // Crear
    this.loading = true;
    let productTmp = this.forma.getRawValue();

    this._dataProduct.createProduct(
      productTmp,
      this.images.map(val => val.file)
    ).then(x => {

      console.log(x);
      this.loading = false;
      this._modal.info({
        content: 'El producto sea creado'
      })

    })
    

  }

}