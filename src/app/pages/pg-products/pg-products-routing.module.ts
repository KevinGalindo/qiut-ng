import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PgProductsComponent } from './pg-products.component';

const routes: Routes = [
  { path: '', component: PgProductsComponent},
  { path: 'agregar', loadComponent:() => import('./produc-form/produc-form.component').then(x => x.ProducFormComponent), canActivate: [ AuthGuard ]},
  { path: ':id', loadComponent:() => import('./produc-info/produc-info.component').then(x => x.ProducInfoComponent)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PgProductsRoutingModule { }
