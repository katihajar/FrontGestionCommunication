import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/controller/model/user';
import { AuthService } from 'src/app/controller/service/auth.service';
import { ChangePasswordService } from 'src/app/controller/service/change-password.service';

@Component({
  selector: 'app-header-super-admin',
  templateUrl: './header-super-admin.component.html',
  styleUrls: ['./header-super-admin.component.scss']
})
export class HeaderSuperAdminComponent {
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
