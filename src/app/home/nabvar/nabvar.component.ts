import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiAccessService } from 'src/app/services/api/api-access.service';

@Component({
  selector: 'app-nabvar',
  standalone: true,
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.scss'],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class NabvarComponent implements OnInit {

  menu: boolean = false;
  guard: boolean = false;

  constructor( public auth: ApiAccessService,
               private router: Router) { }

  ngOnInit(): void {
  }

  salir(){
    
    this.auth.logout();
    this.router.navigateByUrl('');

  }

}
