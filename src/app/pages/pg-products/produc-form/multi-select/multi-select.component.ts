import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiFilterServicesService, Icategories } from 'src/app/services/api/api-filter-services.service';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {
  @Input() categories:any[] = [];

  openClass:string = '';
  listCateogries: Icategories[] = [];
  list:  Icategories[] = [];

  private _search: string = "";
  public get search(): string {
    return this._search;
  }
  public set search(value: string) {
    this.listCateogries = this.list.filter(x => x.name.toLowerCase().includes(value.toLowerCase()));
    this._search = value;
  }


  constructor(private _apiCategories: ApiFilterServicesService) {
    this._apiCategories.getAll().subscribe({
      next: resp => {
        console.log(resp);
        this.listCateogries = this.list = resp;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {

  }

  onClickMenu(): void {
    this.openClass = this.openClass == '' ? 'open' : '';
  }

  isChecken(item:any): string {
    return this.categories.find(x => x == item.name) ? 'checked' : '';
  }

  itemClick(item:any): void {
    let i:number = this.categories.findIndex(x => x == item.name)
    if (i > -1) {
      this.categories.splice(i, 1);
    }else{
      this.categories.push(item.name);
    }
  }
}