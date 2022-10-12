import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiAccessService } from '../services/api/api-access.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( 
    private auth: ApiAccessService,
    private router: Router ) {}

  canActivate(): boolean {

    if ( this.auth.isAuth() ) {
      return true;
    } else {
      this.router.navigateByUrl('');
      return false;
    }

  }
  
}
