import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/controller/model/user';
import { Userauth } from 'src/app/controller/model/userauth';
import { AuthService } from 'src/app/controller/service/auth.service';

@Component({
  selector: 'app-sup-admin',
  templateUrl: './sup-admin.component.html',
  styleUrls: ['./sup-admin.component.scss']
})
export class SupAdminComponent  implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  sideBarOpen = true;


  ngOnInit(): void {
  }

  get User(): User {
    return this.authService.User;
  }

  get UserAuth(): Userauth {
    return this.authService.UserAuth;
  }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}

