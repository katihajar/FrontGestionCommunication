import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Incident } from 'src/app/controller/model/incident';
import { CharteService } from 'src/app/controller/service/charte.service';
import { IncidentService } from 'src/app/controller/service/incident.service';

@Component({
  selector: 'app-charte-incident-monetic-ang-fr',
  templateUrl: './charte-incident-monetic-ang-fr.component.html',
  styleUrls: ['./charte-incident-monetic-ang-fr.component.scss']
})
export class CharteIncidentMoneticAngFrComponent implements OnInit {
  
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private charteService: CharteService,private incidentService: IncidentService) { }

  ngOnInit(): void {
  }
  get charteIncidentMoneticAngFr(): boolean {
    return this.charteService.charteIncidentMoneticAngFr;
  }

  set charteIncidentMoneticAngFr(value: boolean) {
    this.charteService.charteIncidentMoneticAngFr = value;
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
