import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
// this guard is not in use
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    public constructor( private auth: AuthService, private router: Router ){}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if( this.auth.isLoggedIn() ){
      return true;
    }

    this.router.navigateByUrl('/login');
    return false;
  }
  
}
