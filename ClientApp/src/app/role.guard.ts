import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './services/account.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private router: Router,
    private accountService: AccountService) { }

  canActivate() {
    if (this.accountService.getUserRole()) {
      return true;
    }

    this.router.navigate(['/dashboard']);
    return false;
  }
}
