import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {} from '../../../views/sessions/signin3/signin3.component'
@Injectable()
export class AuthGuard implements CanActivate {
  public authToken;
  
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isLoggedIn()) {
      return true
    }
    this.router.navigate(['/sessions/signin3']);
    return false;
  }

  public isLoggedIn(): boolean {     
    let status = false;      
    if (sessionStorage.getItem('Islogin') == "true") {      
       status = true;      
    }    
    else {      
       status = false;      
       }      
    return status;      
    }    

}