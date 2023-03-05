import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { User } from 'src/app/controller/model/user';
import { AuthService } from 'src/app/controller/service/auth.service';

@Component({
  selector: 'app-header-responsable',
  templateUrl: './header-responsable.component.html',
  styleUrls: ['./header-responsable.component.scss']
})
export class HeaderResponsableComponent implements OnInit {

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
