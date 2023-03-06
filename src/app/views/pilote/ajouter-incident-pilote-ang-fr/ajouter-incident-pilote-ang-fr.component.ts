import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Incident } from 'src/app/controller/model/incident';
import { PlanAction } from 'src/app/controller/model/plan-action';
import { CharteService } from 'src/app/controller/service/charte.service';
import { IncidentService } from 'src/app/controller/service/incident.service';

@Component({
  selector: 'app-ajouter-incident-pilote-ang-fr',
  templateUrl: './ajouter-incident-pilote-ang-fr.component.html',
  styleUrls: ['./ajouter-incident-pilote-ang-fr.component.scss']
})
export class AjouterIncidentPiloteAngFrComponent implements OnInit {

  StatutPlan:any[]=[];
  date1: Date = new Date();
  date2: Date = new Date();
  date3: Date = new Date();
  Action: PlanAction = new PlanAction();
  ActionAng: PlanAction = new PlanAction();
  ListPlanAction: Array<PlanAction> = new Array<PlanAction>();
  ListPlanActionAng: Array<PlanAction> = new Array<PlanAction>();

  constructor(private incidentService: IncidentService, private charteService:CharteService,private router: Router) { }
  clear(table: Table) {
    table.clear();
  }

  ngOnInit(): void {
    this.AddIncident = new Incident();
    this.Action = new PlanAction();
    this.AddIncidentAng = new Incident();
    this.ActionAng = new PlanAction();
    this.ListPlanAction= new Array<PlanAction>();
    this.ListPlanActionAng= new Array<PlanAction>(); 
    this.AddIncidentAng = this.AddIncident;
    this.ActionAng = this.Action;
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

  get AddIncidentAng(): Incident{
    return this.incidentService.AddIncidentAng;
  }

  set AddIncidentAng(value: Incident) {
    this.incidentService.AddIncidentAng = value;
  }


  AddAction(){
    if(this.Action.statut != null && this.Action.description!=null && this.Action.numero != null  ){
    this.ListPlanAction.push(this.Action);
    this.ListPlanActionAng.push(this.ActionAng);
    this.Action= new PlanAction();
    this.ActionAng= new PlanAction();
  }
  }
  AddActionAng(){
    if(this.ActionAng.statut != null && this.ActionAng.description!=null && this.ActionAng.numero != null  ){
    this.ListPlanActionAng.push(this.ActionAng);
    this.ActionAng= new PlanAction();
  }
  }
  showCharte(){
    this.AddIncident.planActions=this.ListPlanAction;
    console.log("Incident info : "+JSON.stringify(this.AddIncident) );
    
  }
  get charteIncident3Bfr(): boolean {
    return this.charteService.charteIncident3Bfr;
  }

  set charteIncident3Bfr(value: boolean) {
    this.charteService.charteIncident3Bfr = value;
  }
}
