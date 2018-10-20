import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../../data/models/domain/user';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
