import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { User } from 'src/app/controller/model/user';
import { AuthService } from 'src/app/controller/service/auth.service';

@Component({
  selector: 'app-header-pilote',
  templateUrl: './header-pilote.component.html',
  styleUrls: ['./header-pilote.component.scss']
})
export class HeaderPiloteComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();


  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  get User(): User {
    return this.auth.User;
  }
}
