import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AccountService } from '../account.service';
import { LoginCredentials } from '../../data/models/domain/accountCredentials';
import { Router } from '@angular/router';
import { User } from '../../data/models/domain/user';
import { LoginNotificationService } from '../login-notification.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  creds: LoginCredentials;
  isPendingUser: boolean;
  pendingUserMessage: string = "Your account has not been activated yet. Please allow for 3-5 business days for approval, or call 555-5555 for account help.";
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router, private loginService: LoginNotificationService) { }

  ngOnInit() {
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    this.creds = {email: this.username.value, password: this.password.value};
    
    if (this.creds.email && this.creds.password) {
      this.accountService.login(this.creds).subscribe(token => {
        if (token == "Pending")
          this.isPendingUser = true;
        else if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('userId', this.accountService.getUserId(token));

          const user = new User(this.username.value, token);
          this.loginService.setUser(user);
          this.loginService.userLoggedInEvent(user);

          this.router.navigate(['/dashboard']);
        }
        else {
          this.loginForm.setErrors(['Unabled to match username with password']);
        }
      });
    }
  }

  onInput() {
    this.isPendingUser = false;
  }

}
