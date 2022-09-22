import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

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

  constructor() { }

  ngOnInit(): void {
  }

  salir(){
    // this.auth.logout();
  }

}
