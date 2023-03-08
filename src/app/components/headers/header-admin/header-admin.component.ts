import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/controller/model/user';
import { AuthService } from 'src/app/controller/service/auth.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private auth : AuthService,private router:Router) { }

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
}
