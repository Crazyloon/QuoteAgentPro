import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { LoginNotificationService } from './services/login-notification.service';
import { User } from '../data/models/domain/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'aia-quoting';
  isUserRoleManager: boolean = false;
  isUserLoggedIn: boolean = false;

  constructor(private authService: AccountService, private loginService: LoginNotificationService) {
    loginService.userLoggedIn$.subscribe((u: User) => {
      if (u) {
        this.isUserRoleManager = u.role == "Manager"
        this.isUserLoggedIn = true;
      }
    });

    loginService.userLoggedOut$.subscribe((action: string) => {
      this.isUserRoleManager = false;
      this.isUserLoggedIn = false;
    })
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const role = this.authService.getUserRole(token);
    this.isUserRoleManager = role === "Manager";
    this.isUserLoggedIn = role != null && role != 'undefined';
  }

}
