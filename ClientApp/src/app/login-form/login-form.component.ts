import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AccountService } from '../account.service';
import { LoginCredentials } from '../../data/models/domain/accountCredentials';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  creds: LoginCredentials;
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit() {
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    console.log("TODO: Log User In");
    this.creds = {email: this.username.value, password: this.password.value};
    
    this.accountService.login(this.creds).subscribe(token => {
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', this.accountService.getUserId(token))
        this.router.navigate(['/dashboard'])
      }
      else {
        this.loginForm.setErrors(['Unabled to match username with password'])
      }
    });
  }

}
