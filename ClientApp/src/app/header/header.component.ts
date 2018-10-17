import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { AccountService } from '../account.service';
import { LoginNotificationService } from '../login-notification.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isUserRoleManager: boolean = false;
  @Input() isUserLoggedIn: boolean = false;
  isActiveMenu: boolean = false;

  constructor(private router: Router, private authService: AccountService, private loginService: LoginNotificationService) { }

  ngOnInit() {
  }

  logOut(): void {
    localStorage.clear();
    this.loginService.userLoggedOutEvent();
    this.router.navigate(['login']);
  }

  onClickMenu() {
    this.isActiveMenu = !this.isActiveMenu;
  }
}
