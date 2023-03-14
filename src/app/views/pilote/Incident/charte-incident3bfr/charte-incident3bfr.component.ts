import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Incident } from 'src/app/controller/model/incident';
import { CharteService } from 'src/app/controller/service/charte.service';
import { IncidentService } from 'src/app/controller/service/incident.service';

@Component({
  selector: 'app-charte-incident3bfr',
  templateUrl: './charte-incident3bfr.component.html',
  styleUrls: ['./charte-incident3bfr.component.scss']
})
export class CharteIncident3bfrComponent implements OnInit {
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private charteService: CharteService,private incidentService: IncidentService) { }

  ngOnInit(): void {
  }
  get charteIncident3Bfr(): boolean {
    return this.charteService.charteIncident3Bfr;
  }

  set charteIncident3Bfr(value: boolean) {
    this.charteService.charteIncident3Bfr = value;
  }
  get AddIncident(): Incident{
    return this.incidentService.AddIncident;
  }

  set AddIncident(value: Incident) {
    this.incidentService.AddIncident = value;
  }
}
