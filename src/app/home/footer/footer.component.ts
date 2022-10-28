import { Component, OnInit } from '@angular/core';
import { ApiAccessService } from 'src/app/services/api/api-access.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public _apiAcees: ApiAccessService) { }

  ngOnInit(): void {
  }

}
