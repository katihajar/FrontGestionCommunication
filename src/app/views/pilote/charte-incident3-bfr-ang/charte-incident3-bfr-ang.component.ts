import { Component, OnInit } from '@angular/core';
import { CharteService } from 'src/app/controller/service/charte.service';

@Component({
  selector: 'app-charte-incident3-bfr-ang',
  templateUrl: './charte-incident3-bfr-ang.component.html',
  styleUrls: ['./charte-incident3-bfr-ang.component.scss']
})
export class CharteIncident3BfrAngComponent implements OnInit {

  constructor(private charteService: CharteService) { }

  ngOnInit(): void {
  }
  get charteIncident3BfrAng(): boolean {
    return this.charteService.charteIncident3BfrAng;
  }

  set charteIncident3BfrAng(value: boolean) {
    this.charteService.charteIncident3BfrAng = value;
  }
}
