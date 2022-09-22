import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: '', loadComponent:() => import('./home/home-content/home-content.component').then(x => x.HomeContentComponent) },
      { path: 'productos', loadChildren:() => import('./pages/pg-products/pg-products.module').then(x => x.PgProductsModule) },
    ]
  },
  { path: 'login', loadComponent:() => import('./access/login/login.component').then(x => x.LoginComponent) },
  { path: 'registrarse', loadComponent:() => import('./access/register/register.component').then(x => x.RegisterComponent) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
