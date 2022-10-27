import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiFilterServicesService, Icategories } from 'src/app/services/api/api-filter-services.service';

@Component({
  selector: 'app-list-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss']
})
export class ListFilterComponent implements OnInit {

  @Output() category:EventEmitter<string> = new EventEmitter<string>();

  open:boolean = false;
  categories: Icategories[] = [];
  categoriesResult: Icategories[] = [];

  constructor(private _apiFilters: ApiFilterServicesService) { }

  ngOnInit(): void {
    this._apiFilters.getAll().subscribe({
      next: resp => {
        this.categoriesResult = this.categories = resp;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  buscarFiltro(text: string){

    this.categoriesResult = this.categories.filter(x => x.name.toLowerCase().includes(text.toLowerCase()));

  }

  filterCategory(category: string): void{
    this.category.emit(`${category}`);
  }
}
