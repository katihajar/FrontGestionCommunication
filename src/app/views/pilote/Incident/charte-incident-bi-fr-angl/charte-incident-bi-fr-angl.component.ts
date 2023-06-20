import { Component, ElementRef, ViewChild } from '@angular/core';
import { Incident } from 'src/app/controller/model/incident';
import { CharteService } from 'src/app/controller/service/charte.service';
import { IncidentService } from 'src/app/controller/service/incident.service';

@Component({
  selector: 'app-charte-incident-bi-fr-angl',
  templateUrl: './charte-incident-bi-fr-angl.component.html',
  styleUrls: ['./charte-incident-bi-fr-angl.component.scss']
})
export class CharteIncidentBiFrAnglComponent {
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private charteService: CharteService,private incidentService: IncidentService) { }

  ngOnInit(): void {
    this.AddIncidentAng.application.nomApplication=this.AddIncident.application.nomApplication; 
  }
  get charteIncidentBIfrAng(): boolean {
    return this.charteService.charteIncidentBIfrAng;
  }

  set charteIncidentBIfrAng(value: boolean) {
    this.charteService.charteIncidentBIfrAng = value;
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
