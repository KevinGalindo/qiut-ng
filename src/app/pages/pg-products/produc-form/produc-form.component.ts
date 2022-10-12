import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModalService } from 'src/app/components/dialog-modal/dialog-modal.service';
import { ProductDataService } from 'src/app/services/product-data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-produc-form',
  standalone: true,
  templateUrl: './produc-form.component.html',
  styleUrls: ['./produc-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class ProducFormComponent implements OnInit {

  openSelect: boolean = true;

  categorys = [] = ['amor','parejas','dia del padre','dia del niño','cumpleaños'];

  forma = new FormGroup({
    name    : new FormControl(``,{
      nonNullable: true,
      validators: [Validators.required]
    }),
    price : new FormControl('',{
      nonNullable: true, 
      validators: [Validators.required]
    }),
    description: new FormControl('',{
      nonNullable: true,
    })
  });

  images:{file:File, src:string}[] = [];

  constructor(
    private _modal: DialogModalService,
    private _dataProduct: ProductDataService,
    private _sanitizer:DomSanitizer
  ) { }

  ngOnInit(): void {
    console.log(this.categorys);
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

  category(item: any, cheked:HTMLLIElement){
    console.log(item);
    console.log(cheked);
    cheked.classList.toggle('checked');
  }

  send(){
    console.log(this.forma.getRawValue());
    if (this.forma.invalid) {
      this._modal.error({
        content: 'Error en la informacion',
        title: 'Error'
      })
      return;
    }

    this._dataProduct.createProduct(
      this.forma.getRawValue(),
      this.images.map(val => val.file)
    ).then(x => {

      console.log(x);
    })

  }

}
