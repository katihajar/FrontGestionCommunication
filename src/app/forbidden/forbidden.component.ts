import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss'],

})
export class ForbiddenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var str = document.getElementsByTagName('div')[0].innerHTML.toString();
    var i = 0;
    document.getElementsByTagName('div')[0].innerHTML = "";

    setTimeout(function() {
      var se = setInterval(function() {
        i++;
        document.getElementsByTagName('div')[0].innerHTML = str.slice(0, i) + "|";
        if (i == str.length) {
          clearInterval(se);
          document.getElementsByTagName('div')[0].innerHTML = str;
        }
      }, 10);
    },0);
  }

}
