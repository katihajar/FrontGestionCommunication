import { Component, OnInit } from '@angular/core';
import {Userauth} from "../../controller/model/userauth";
import {AuthService} from "../../controller/service/auth.service";
import {Router} from "@angular/router";
import {User} from "../../controller/model/user";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

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
