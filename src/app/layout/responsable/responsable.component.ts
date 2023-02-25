import { Component, OnInit } from '@angular/core';
import {Userauth} from "../../controller/model/userauth";
import {AuthService} from "../../controller/service/auth.service";
import {Router} from "@angular/router";
import {User} from "../../controller/model/user";

@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.scss']
})
export class ResponsableComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  sideBarOpen = true;


  ngOnInit(): void {
    if(this.UserAuth.accessToken == null) {
      this.router.navigate(['/forbidden']);
    }else  if (this.User.roles[0].name !== 'ROLE_RESPONSABLE') {
      this.router.navigate(['/forbidden']);
    }
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
