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

  constructor(private authService: AuthService, private router: Router) { }

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
  handleLogin() {
    this.authService.Login(this.username, this.password).subscribe((data) => {
      // @ts-ignore
      this.UserAuth = data.body;
      this.User = this.UserAuth.user;
      console.log('tken: ' + this.UserAuth.accessToken);
      console.log('us: ' + JSON.stringify(this.User));
      console.log('auth: ' + JSON.stringify(this.User.authorities));
      console.log('role: ' + this.User.roles[0].name);
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful';

      if (this.UserAuth.accessToken !== null) {
        console.log('routes ...');
        if (this.User.roles[0].name == 'ROLE_ADMIN') {
          console.log('admin router  ...');
          this.router.navigate(['/admin']);
        } else if (this.User.roles[0].name == 'ROLE_PILOTE') {
          console.log('piloteNav router  ...');
          this.router.navigate(['/pilote']);
        }else if (this.User.roles[0].name == 'ROLE_RESPONSABLE') {
          console.log('respo router  ...');
          this.router.navigate(['/responsable']);
        }
      }
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }
}
