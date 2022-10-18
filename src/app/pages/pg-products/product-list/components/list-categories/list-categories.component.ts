import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  filter(value:string): void{
    
  }

}
