import { Component, OnInit } from '@angular/core';
import { AuthService } from "../controller/service/auth.service";
import { Userauth } from "../controller/model/userauth";
import { User } from "../controller/model/user";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = String();
  password: string = String();
  errorMessage = 'Invalid Credentials';
  successMessage: string = String();
  invalidLogin = false;
  loginSuccess = false;
  spiner:boolean=false;
  constructor(private authService: AuthService, private router: Router) {
   }

  ngOnInit(): void {
      this.authService.LogOUT();
      this.username = String();
      this.password = String();
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
  handleLogin() {
    this.spiner= true;
    this.authService.Login(this.username, this.password).subscribe((data) => {
      // @ts-ignore
      this.UserAuth = data.body;
      this.User = this.UserAuth.user;
      localStorage.setItem('currentUser', JSON.stringify(this.User));
      localStorage.setItem('accessToken', this.UserAuth.accessToken as string);
      localStorage.setItem('refreshToken',this.UserAuth.refreshToken as string);
      localStorage.setItem('auth',JSON.stringify(this.UserAuth));
      this.invalidLogin = false;
      this.loginSuccess = true;      
      this.successMessage = 'Login Successful';
      this.spiner= false;
      if (this.UserAuth.accessToken !== null) {
        if (this.User.roles[0].name == 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        } else if (this.User.roles[0].name == 'ROLE_PILOTE') {
          this.router.navigate(['/pilote']);
        }else if (this.User.roles[0].name == 'ROLE_RESPONSABLE') {
          this.router.navigate(['/responsable']);
        }else{
          this.router.navigate(['/superAdmin']);
        }
      }
    }, () => {
      this.spiner= false;
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }
}
