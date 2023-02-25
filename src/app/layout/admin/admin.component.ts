import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor() { }
  sideBarOpen = true;


  ngOnInit(): void {
    console.log('layout  Admin');

  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
