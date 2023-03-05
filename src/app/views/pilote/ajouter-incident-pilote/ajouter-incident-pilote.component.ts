import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Incident } from 'src/app/controller/model/incident';
import { PlanAction } from 'src/app/controller/model/plan-action';
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

  ListPlanAction: Array<PlanAction> = new Array<PlanAction>();
  constructor(private incidentService: IncidentService, private router: Router) { }
  clear(table: Table) {
    table.clear();
  }

  ngOnInit(): void {
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
    if(this.Action.statut != null && this.Action.description!=null && this.Action.numero != null  ){
    this.ListPlanAction.push(this.Action);
    this.Action= new PlanAction();
  }
  }

  showCharte(){
    this.AddIncident.planActions=this.ListPlanAction;
    console.log("Incident info : "+JSON.stringify(this.AddIncident) );
    
  }
}
