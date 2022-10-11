import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModalService } from 'src/app/components/dialog-modal/dialog-modal.service';
import { ProductDataService } from 'src/app/services/product-data.service';

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

  forma = new FormGroup({
    nombre    : new FormControl(``,{
      nonNullable: true,
      validators: [Validators.required]
    }),
    precio : new FormControl('',{
      nonNullable: true, 
      validators: [Validators.required]})
  });

  constructor(private _modal: DialogModalService,
              private _dataProduct: ProductDataService) { }

  ngOnInit(): void {
  }

  get isNombreInvalid():boolean{
    return this.forma.controls.nombre.invalid && this.forma.controls.nombre.touched;
  }

  get isPreciovalid():boolean{
    return this.forma.controls.precio.invalid && this.forma.controls.precio.touched;
  }

  send(){

    if (this.forma.invalid) {
      this._modal.error({
        content: 'Error en la informacion',
        title: 'Error'
      })
      return;
    }

    this._dataProduct.createProduct(this.forma.value);

  }

}
