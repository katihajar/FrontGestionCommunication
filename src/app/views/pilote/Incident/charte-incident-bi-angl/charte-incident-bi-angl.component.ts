import { Component, ElementRef, ViewChild } from '@angular/core';
import { Incident } from 'src/app/controller/model/incident';
import { CharteService } from 'src/app/controller/service/charte.service';
import { IncidentService } from 'src/app/controller/service/incident.service';

@Component({
  selector: 'app-charte-incident-bi-angl',
  templateUrl: './charte-incident-bi-angl.component.html',
  styleUrls: ['./charte-incident-bi-angl.component.scss']
})
export class CharteIncidentBiAnglComponent {
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private charteService: CharteService,private incidentService: IncidentService) { }

  ngOnInit(): void {
  }
  get charteIncidentBIAng(): boolean {
    return this.charteService.charteIncidentBIAng;
  }

  set charteIncidentBIAng(value: boolean) {
    this.charteService.charteIncidentBIAng = value;
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
