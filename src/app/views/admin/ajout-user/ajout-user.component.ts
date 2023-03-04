import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajout-user',
  templateUrl: './ajout-user.component.html',
  styleUrls: ['./ajout-user.component.scss']
})
export class AjoutUserComponent implements OnInit {
lots:any[]=[];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.lots= [
      {name: '3B'},
      {name: '7B'},
  ];
  }
  
}
