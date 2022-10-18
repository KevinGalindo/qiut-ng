import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss']
})
export class ListFilterComponent implements OnInit {
  open:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
