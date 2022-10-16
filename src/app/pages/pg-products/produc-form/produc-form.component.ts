import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModalService } from 'src/app/components/dialog-modal/dialog-modal.service';
import { ProductDataService } from 'src/app/services/product-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IproductFormData } from 'src/app/services/api/api-products.service';

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
  loading:boolean = false;
  type:string = 'detalles';
  menssage:string = 'Categorias';

  categorys: Icategory[] = [
    {id: 1,name: 'amor', status: false},
    {id: 2, name:'parejas', status: false},
    {id: 3, name:'dia del padre', status: false},
    {id: 4, name:'dia del niño', status: false},
    {id: 5, name:'cumpleaños', status: false}];

  categorysData: string[] = ['cumpleaños'];

  categorysSearch: Icategory[] = [];

  categorysResult: string[] = [];

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
    }),
  });

  images:{file:File, src:string}[] = [];

  constructor(
    private _modal: DialogModalService,
    private _dataProduct: ProductDataService,
    private _sanitizer:DomSanitizer
  ) { }

  ngOnInit(): void {
    
    this.categorysSearch = this.categorys;

    if(this.categorysData.length > 0){
      this.menssage = `${this.categorysData.length} selecionadas`;
      this.categorysResult = this.categorysData;
      for (let i = 0; i < this.categorys.length; i++) {
        const element = this.categorys[i];
        for (let j = 0; j < this.categorysData.length; j++) {
          const elementData = this.categorysData[j];
  
          let indexOF = elementData.indexOf(element.name);
          console.log(indexOF);
          if (indexOF >= 0) {
            element.status = true;
          }
          
        }
      }
    }

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

  category( cheked:HTMLLIElement, item: any){

    let esta = cheked.classList.contains('checked');
    if (esta) {
      cheked.classList.remove('checked');
      let indexOf = this.categorysResult.indexOf(item.name);
      this.categorysResult.splice(indexOf,1);
      this.menssage = `${this.categorysResult.length} selecionadas`;
    } else {
      cheked.classList.add('checked');
      this.categorysResult.push(item.name);
      this.menssage = `${this.categorysResult.length} selecionadas`;
    }

  }

  bucarFiltro(inSearch: string){
  
    let searchedVal = inSearch.toLowerCase();
    this.categorysSearch = this.categorys.filter((data: any) => {
      return data.name.toLowerCase().startsWith(searchedVal);
    });

  }

  cambiarType(type: string){
    this.type = type;
  }

  send(){

    if (this.forma.invalid) {
      this._modal.error({
        content: 'Error en la informacion',
        title: 'Error'
      })
      return;
    }
    
    this.loading = true;
    let productTmp: IproductFormData = {
      ...this.forma.getRawValue(),
      categorys: this.categorysResult,
      type: this.type
    }  

    this._dataProduct.createProduct(
      productTmp,
      this.images.map(val => val.file),
      this.categorysResult
    ).then(x => {

      console.log(x);
      this.loading = false;
      this._modal.info({
        content: 'El producto sea creado'
      })

    })

  }

}

interface Icategory{
  id: number,
  name: string,
  status: boolean
}