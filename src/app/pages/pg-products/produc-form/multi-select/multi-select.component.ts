import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  listCateogries = CATEGORIES;

  private _search: string = "";
  public get search(): string {
    return this._search;
  }
  public set search(value: string) {
    this.listCateogries = CATEGORIES.filter(x => x.name.toLowerCase().includes(value.toLowerCase()));
    this._search = value;
  }


  constructor() {
    
  }

  ngOnInit(): void {
    console.log(this.categories)
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



const CATEGORIES:any [] = [
  {id: 1,name: 'amor', status: false},
  {id: 2, name:'parejas', status: false},
  {id: 3, name:'dia del padre', status: false},
  {id: 4, name:'dia del niño', status: false},
  {id: 5, name:'cumpleaños', status: false}];