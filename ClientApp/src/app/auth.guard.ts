import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AccountService) { }

  canActivate() {
    if(!this.authService.isTokenExpired()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;


  }
}
