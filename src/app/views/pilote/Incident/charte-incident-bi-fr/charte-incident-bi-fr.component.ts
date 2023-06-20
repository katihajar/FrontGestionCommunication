import { Component, ElementRef, ViewChild } from '@angular/core';
import { Incident } from 'src/app/controller/model/incident';
import { CharteService } from 'src/app/controller/service/charte.service';
import { IncidentService } from 'src/app/controller/service/incident.service';

@Component({
  selector: 'app-charte-incident-bi-fr',
  templateUrl: './charte-incident-bi-fr.component.html',
  styleUrls: ['./charte-incident-bi-fr.component.scss']
})
export class CharteIncidentBiFrComponent {
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private charteService: CharteService,private incidentService: IncidentService) { }

  ngOnInit(): void {
  }
  get charteIncidentBIfr(): boolean {
    return this.charteService.charteIncidentBIfr;
  }

  set charteIncidentBIfr(value: boolean) {
    this.charteService.charteIncidentBIfr = value;
  }
  get AddIncident(): Incident{
    return this.incidentService.AddIncident;
  }

  set AddIncident(value: Incident) {
    this.incidentService.AddIncident = value;
  }
}
