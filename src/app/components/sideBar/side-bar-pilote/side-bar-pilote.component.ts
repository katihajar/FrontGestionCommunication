import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar-pilote',
  templateUrl: './side-bar-pilote.component.html',
  styleUrls: ['./side-bar-pilote.component.css']
})
export class SideBarPiloteComponent implements OnInit {

  collapseShow = 'hidden';
  constructor() {}

  ngOnInit() {}
  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }

}
