import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.scss']
})
export class ResponsableComponent implements OnInit {

  constructor() { }
  sideBarOpen = true;


  ngOnInit(): void {
    console.log('layout  respo');

  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
