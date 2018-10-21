import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AccountService, REMEMBERME, TOKEN, USERID } from '../../services/account.service';
import { LoginCredentials } from '../../../data/models/domain/accountCredentials';
import { Router } from '@angular/router';
import { User } from '../../../data/models/domain/user';
import { LoginNotificationService } from '../../services/login-notification.service';

const pendingUserMessage = "Your account has not been activated yet. Please allow for 3-5 business days for approval, or call 555-5555 for account help.";
const disabledUserMessage = "Your account has been disabled. Please check with a manager if you are recieving this message in error.";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  isUnauthorizedUser: boolean;
  unauthorizedUserMessage: string;
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  @Input() savedUser: string;
  @ViewChild('rememberMe') rememberMe: ElementRef;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router, private loginService: LoginNotificationService) { }

  ngOnInit() {
    if(this.savedUser){
      this.loginForm.patchValue({username: this.savedUser});
    }
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    let creds: LoginCredentials = {email: this.username.value, password: this.password.value};
    
    if (creds.email && creds.password) {
      this.accountService.login(creds).subscribe(token => {
        if (token == 'Pending') {
          this.isUnauthorizedUser = true;
          this.unauthorizedUserMessage = pendingUserMessage;
        }
        else if (token == 'Disabled') {
          this.isUnauthorizedUser = true;
          this.unauthorizedUserMessage = disabledUserMessage;
        }
        else if (token) {
          localStorage.setItem(TOKEN, token);
          localStorage.setItem(USERID, this.accountService.getUserId(token));
          if (this.rememberMe.nativeElement.value){
            localStorage.setItem(REMEMBERME, creds.email);
          } else {
            localStorage.removeItem(REMEMBERME);
          }

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
    this.isUnauthorizedUser = false;
  }

  getRememberMe(): string{
    return localStorage.getItem('username');
  }
}
