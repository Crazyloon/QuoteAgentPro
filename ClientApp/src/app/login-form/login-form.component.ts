import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AccountService } from '../account.service';
import { LoginCredentials } from '../../data/models/domain/accountCredentials';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  jwtKey: string;
  creds: LoginCredentials;
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private accountService: AccountService) { }

  ngOnInit() {
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    console.log("TODO: Log User In");
    this.creds.username = this.username.value;
    this.creds.password = this.password.value;
    
    this.accountService.login(this.creds).subscribe(key => this.jwtKey = key);

    // test localstorage of JSON WEB TOKEN
    localStorage.setItem("JWT", this.jwtKey)
  }

}
