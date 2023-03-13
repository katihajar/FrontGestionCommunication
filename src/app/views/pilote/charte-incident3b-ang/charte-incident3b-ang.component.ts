import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Incident } from 'src/app/controller/model/incident';
import { CharteService } from 'src/app/controller/service/charte.service';
import { IncidentService } from 'src/app/controller/service/incident.service';

@Component({
  selector: 'app-charte-incident3b-ang',
  templateUrl: './charte-incident3b-ang.component.html',
  styleUrls: ['./charte-incident3b-ang.component.scss']
})
export class CharteIncident3bAngComponent implements OnInit {
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private charteService: CharteService,private incidentService: IncidentService) { }

  ngOnInit(): void {
  }
  get charteIncident3BAng(): boolean {
    return this.charteService.charteIncident3BAng;
  }

  set charteIncident3BAng(value: boolean) {
    this.charteService.charteIncident3BAng = value;
  }
  get AddIncident(): Incident{
    return this.incidentService.AddIncident;
  }

  set AddIncident(value: Incident) {
    this.incidentService.AddIncident = value;
  }
  get AddIncidentAng(): Incident{
    return this.incidentService.AddIncidentAng;
  }

  set AddIncidentAng(value: Incident) {
    this.incidentService.AddIncidentAng = value;
  }
}
