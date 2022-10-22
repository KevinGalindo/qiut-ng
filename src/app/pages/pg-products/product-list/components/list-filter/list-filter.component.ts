import { Component, OnInit } from '@angular/core';
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

  open:boolean = false;
  categories: Icategories[] = [];

  constructor(private _apiFilters: ApiFilterServicesService) { }

  ngOnInit(): void {
    this._apiFilters.getAll().subscribe({
      next: resp => {
        console.log(resp);
        this.categories = resp;
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
