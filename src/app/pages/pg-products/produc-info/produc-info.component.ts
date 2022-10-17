import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDataService } from 'src/app/services/product-data.service';
import { ProductInfo } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produc-info',
  standalone: true,
  templateUrl: './produc-info.component.html',
  styleUrls: ['./produc-info.component.scss'],
  imports: [CommonModule],
})
export class ProducInfoComponent implements OnInit {

  id: string | null = null;
  product: ProductInfo[] = [];

  constructor(public _dataProduct: ProductDataService,
    private route: ActivatedRoute
  ) {

    this.id = this.route.snapshot.paramMap.get('id');

  }
  
  ngOnInit(): void {

    this._dataProduct.getProduct(this.id);
    
  }
  

}
