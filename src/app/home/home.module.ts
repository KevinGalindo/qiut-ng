import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { NabvarComponent } from './nabvar/nabvar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    NabvarComponent,
    RouterModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
