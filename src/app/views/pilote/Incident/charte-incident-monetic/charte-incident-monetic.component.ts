import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Incident } from 'src/app/controller/model/incident';
import { CharteService } from 'src/app/controller/service/charte.service';
import { IncidentService } from 'src/app/controller/service/incident.service';

@Component({
  selector: 'app-charte-incident-monetic',
  templateUrl: './charte-incident-monetic.component.html',
  styleUrls: ['./charte-incident-monetic.component.scss']
})
export class CharteIncidentMoneticComponent implements OnInit {
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  @ViewChild('myDialogHeader',{static:false}) header!: ElementRef;
  @ViewChild('myDialogContent',{static:false}) content!: ElementRef;
  @ViewChild('myDialogFooter',{static:false}) footer!: ElementRef;
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
