import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiFilterServicesService, Icategories } from 'src/app/services/api/api-filter-services.service';
import { DialogModalService } from 'src/app/components/dialog-modal/dialog-modal.service';

@Component({
  selector: 'app-list-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {

  categories: Icategories[] = [];

  constructor(private _apiFilter: ApiFilterServicesService,
    private _modalService: DialogModalService  
  ) { 
    this._apiFilter.getAll().subscribe({
      next: resp => {
        this.categories = resp;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
  }

  deleteCategory(id: number, index: number){

    this._modalService.info({content: '¿Esta seguro de borrar esta categoria?', confirm: true, title: 'Borrar categoria'})
      .then((resp) => {
        if (resp) {
          
          this._apiFilter.deleteCategory(id).subscribe({
            next: reps => {
              this.categories.splice(index,1);
            },
            error: err => {
              console.log(err);
            }
          });

        }
      });

  }

  send(category:HTMLInputElement){

    let categoryRsul = category.value;

    if (categoryRsul.length == 0) {
  
      this._modalService.error({
        content: "El nombre es obligatorio",
        title: 'Error en nombre'
      });
      return;
    }
    
    this._apiFilter.createCategory(categoryRsul).subscribe({
      next: resp => {
        category.value = '';
        this.categories.push(resp);
      },
      error: err => {
        console.log(err);
      }
    });

  }

}
