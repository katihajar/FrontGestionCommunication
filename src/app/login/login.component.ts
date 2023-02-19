import { Component, OnInit } from '@angular/core';
import {AuthService} from "../controller/service/auth.service";
import {Userauth} from "../controller/model/userauth";
import {User} from "../controller/model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = String();
  password: string= String();
  errorMessage= 'Invalid Credentials';
  successMessage: string  = String();
  invalidLogin= false;
  loginSuccess= false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.User = new User();
    this.UserAuth = new Userauth();
  }
  get User(): User {
    return this.authService.User;
  }
  set User(value: User) {
    this.authService.User = value;
  }

  get UserAuth(): Userauth {
    return this.authService.UserAuth;
  }

  set UserAuth(value: Userauth) {
    this.authService.UserAuth = value;
  }
  handleLogin(){
    this.authService.Login(this.username, this.password).subscribe((data) => {
       // @ts-ignore
      this.UserAuth =data.body;
       this.User = this.UserAuth.user;
      console.log('tken: ' + this.UserAuth.accessToken);
      console.log('us: ' + JSON.stringify(this.User));
      console.log('auth: ' + JSON.stringify(this.User.authorities));
      console.log('role: ' + this.User.roles[0].name);

      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful';
      // redirect to main page
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }
}
