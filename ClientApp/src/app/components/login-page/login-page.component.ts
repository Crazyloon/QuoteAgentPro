import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { REMEMBERME } from '../../services/account.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  rememberMe: string;
  constructor() { }

  ngOnInit() {
    this.rememberMe = localStorage.getItem(REMEMBERME);
  }

}
