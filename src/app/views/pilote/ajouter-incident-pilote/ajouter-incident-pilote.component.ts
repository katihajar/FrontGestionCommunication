import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
  Action= new PlanAction();
  num:number= Number(0);

  constructor(private incidentService: IncidentService, private messageService: MessageService,private charteService:CharteService,private router: Router) { }
  clear(table: Table) {
    table.clear();
  }

  get ListPlanAction(): Array<PlanAction>{

    return this.incidentService.ListPlanAction;
  }

  set ListPlanAction(value: Array<PlanAction>) {
    this.incidentService.ListPlanAction = value;
  }

  ngOnInit(): void {
    this.Action = new PlanAction();
    this.num=1;
    this.ListPlanAction =this.AddIncident.planActionList;
    this.StatutPlan= [
      {name: 'En cours'},
      {name: 'A Démarer'},
      {name: 'Clos'},
  ];
  this.StatutPlan= [
    {name: 'Français'},
    {name: 'Français-Anglais'},
    {name: 'Anglais'},
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
    this.AddIncident.planActionList=this.ListPlanAction;
    console.log("Incident info : "+JSON.stringify(this.AddIncident) );
    this.charteIncident3Bfr= true;
    
  }
  SaveIncident(){
    if(this.AddIncident.description != null && this.AddIncident.causePrincipale != null &&this.AddIncident.situationActuelle != null && this.AddIncident.prochaineCommunication !=null){
      this.incidentService.SaveIncident().subscribe((data) => {
             this.AddIncident=new Incident();
             this.ListPlanAction = new Array<PlanAction>();
             this.router.navigate(['/pilote/incident/registre']);
             this.messageService.add({severity:'success', summary: 'Success', detail: 'Incident Ajouter avec succès'});
            },error=>{
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement'});
      })
      }else{
        this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
      }
  }
  SendAndSaveIncident() {
    this.AddIncident.planActionList = this.ListPlanAction;
   this.SaveIncident();
  }
  get charteIncident3Bfr(): boolean {
    return this.charteService.charteIncident3Bfr;
  }

  set charteIncident3Bfr(value: boolean) {
    this.charteService.charteIncident3Bfr = value;
  }
}
