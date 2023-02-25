import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header-pilote',
  templateUrl: './header-pilote.component.html',
  styleUrls: ['./header-pilote.component.scss']
})
export class HeaderPiloteComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

}
