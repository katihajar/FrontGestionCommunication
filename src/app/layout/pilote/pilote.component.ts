import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pilote',
  templateUrl: './pilote.component.html',
  styleUrls: ['./pilote.component.scss']
})
export class PiloteComponent implements OnInit {

  constructor() { }
  sideBarOpen = true;


  ngOnInit(): void {
    console.log('layout  Admin');

  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
