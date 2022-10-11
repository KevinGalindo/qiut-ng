import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiAccessService } from 'src/app/services/api/api-access.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() cate:string = '';
  open:boolean = false;

  prueba:boolean = false;

  constructor( private router: ActivatedRoute,
               public auth: ApiAccessService) {

    this.router.queryParams.subscribe();

  }

  ngOnInit(): void {


  }

}
