import { Component, OnInit } from '@angular/core';
import { CharteService } from 'src/app/controller/service/charte.service';

@Component({
  selector: 'app-charte-incident3bfr',
  templateUrl: './charte-incident3bfr.component.html',
  styleUrls: ['./charte-incident3bfr.component.scss']
})
export class CharteIncident3bfrComponent implements OnInit {

  constructor(private charteService: CharteService) { }

  ngOnInit(): void {
  }
  get charteIncident3Bfr(): boolean {
    return this.charteService.charteIncident3Bfr;
  }

  set charteIncident3Bfr(value: boolean) {
    this.charteService.charteIncident3Bfr = value;
  }

}
