import { Component, OnInit } from '@angular/core';
import { Incident } from 'src/app/controller/model/incident';
import { CharteService } from 'src/app/controller/service/charte.service';
import { IncidentService } from 'src/app/controller/service/incident.service';

@Component({
  selector: 'app-charte-incident-monetic',
  templateUrl: './charte-incident-monetic.component.html',
  styleUrls: ['./charte-incident-monetic.component.scss']
})
export class CharteIncidentMoneticComponent implements OnInit {

  constructor(private charteService: CharteService,private incidentService: IncidentService) { }

  ngOnInit(): void {
  }
  get charteIncidentMonetic(): boolean {
    return this.charteService.charteIncidentMonetic;
  }

  set charteIncidentMonetic(value: boolean) {
    this.charteService.charteIncidentMonetic = value;
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
