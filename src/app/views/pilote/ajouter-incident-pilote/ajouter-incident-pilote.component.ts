import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Incident } from 'src/app/controller/model/incident';
import { PlanAction } from 'src/app/controller/model/plan-action';
import { CharteService } from 'src/app/controller/service/charte.service';
import { IncidentService } from 'src/app/controller/service/incident.service';

@Component({
  selector: 'app-ajouter-incident-pilote',
  templateUrl: './ajouter-incident-pilote.component.html',
  styleUrls: ['./ajouter-incident-pilote.component.scss']
})
export class AjouterIncidentPiloteComponent implements OnInit {
  StatutPlan:any[]=[];
  date1: Date = new Date();
  date2: Date = new Date();
  date3: Date = new Date();
  Action: PlanAction = new PlanAction();
  num:number= Number(0);
  ListPlanAction: Array<PlanAction> = new Array<PlanAction>();
  constructor(private incidentService: IncidentService, private charteService:CharteService,private router: Router) { }
  clear(table: Table) {
    table.clear();
  }

  ngOnInit(): void {
    this.Action = new PlanAction();
    this.num=1;
    this.StatutPlan= [
      {name: 'En cours'},
      {name: 'A Démarer'},
      {name: 'Clos'},
  ];
  }

  get AddIncident(): Incident{
    return this.incidentService.AddIncident;
  }

  set AddIncident(value: Incident) {
    this.incidentService.AddIncident = value;
  }

  AddAction(){
    if(this.Action.statut != null && this.Action.description!=null && this.num != null  ){
      this.Action.numero = this.num;
    this.ListPlanAction.push(this.Action);
    this.Action = new PlanAction();
    this.num = this.num+1;
  }
  }

  showCharte(){
    this.AddIncident.planActions=this.ListPlanAction;
    console.log("Incident info : "+JSON.stringify(this.AddIncident) );
    this.charteIncident3Bfr= true;
    
  }
  get charteIncident3Bfr(): boolean {
    return this.charteService.charteIncident3Bfr;
  }

  set charteIncident3Bfr(value: boolean) {
    this.charteService.charteIncident3Bfr = value;
  }
}
