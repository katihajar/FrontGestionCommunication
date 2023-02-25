import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../controller/service/auth.service";
import {Router} from "@angular/router";
import {Userauth} from "../../controller/model/userauth";
import {User} from "../../controller/model/user";

@Component({
  selector: 'app-pilote',
  templateUrl: './pilote.component.html',
  styleUrls: ['./pilote.component.scss']
})
export class PiloteComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  sideBarOpen = true;


  ngOnInit(): void {
    if(this.UserAuth.accessToken == null) {
      this.router.navigate(['/forbidden']);
    }else  if (this.User.roles[0].name !== 'ROLE_PILOTE') {
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
