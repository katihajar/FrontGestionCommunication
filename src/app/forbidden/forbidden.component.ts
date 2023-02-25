import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss'],

})
export class ForbiddenComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
    var str = document.getElementsByTagName('div')[0].innerHTML.toString();
    console.log('hna string value : '+str);  
    var i = 0;
    document.getElementsByTagName('div')[0].innerHTML = "";

    setTimeout(function() {
    var se = setInterval(function() {
    i++;
    document.getElementsByTagName('div')[0].innerHTML = str.slice(0, i) + "|";
  if (i == str.length) {
      clearInterval(se);
     document.getElementsByTagName('div')[0].innerHTML = str;
  }else{
    document.getElementsByTagName('div')[0].innerHTML = str.slice(0, i) + "|";
  }
}, 10);
},0);
  }
  

}