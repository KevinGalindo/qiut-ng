import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() cate:string = '';
  open:boolean = false;

  constructor( private router: ActivatedRoute) {

    this.router.queryParams.subscribe(resp => console.log(resp['cate']));

  }

  ngOnInit(): void {
  }

}
