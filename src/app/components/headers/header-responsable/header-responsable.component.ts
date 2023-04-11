import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/controller/model/user';
import { AuthService } from 'src/app/controller/service/auth.service';
import { ChangePasswordService } from 'src/app/controller/service/change-password.service';

@Component({
  selector: 'app-header-responsable',
  templateUrl: './header-responsable.component.html',
  styleUrls: ['./header-responsable.component.scss']
})
export class HeaderResponsableComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

 
  constructor(private auth : AuthService,private router:Router,private service: ChangePasswordService) { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  get User(): User {
    return this.auth.User;
  }
  logOut(){
    this.auth.LogOUT();
      this.router.navigate(['/']);
  }
  showDialog() {
    this.dialogpassword = true;
  }
  get dialogpassword(): boolean {
    return this.service.dialogpassword;
  }

  set dialogpassword(value: boolean) {
    this.service.dialogpassword = value;
  }
}
