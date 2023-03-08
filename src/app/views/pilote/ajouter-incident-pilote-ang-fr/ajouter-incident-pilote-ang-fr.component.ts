import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Incident } from 'src/app/controller/model/incident';
import { PlanAction } from 'src/app/controller/model/plan-action';
import { CharteService } from 'src/app/controller/service/charte.service';
import { IncidentService } from 'src/app/controller/service/incident.service';
import { CharteIncident3BfrAngComponent } from '../charte-incident3-bfr-ang/charte-incident3-bfr-ang.component';
const translate = require('translate');
import domToImage from 'dom-to-image';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-ajouter-incident-pilote-ang-fr',
  templateUrl: './ajouter-incident-pilote-ang-fr.component.html',
  styleUrls: ['./ajouter-incident-pilote-ang-fr.component.scss']
})
export class AjouterIncidentPiloteAngFrComponent implements OnInit {
  imageDataUrl: string= String();
  param: any;
  StatutPlan: any[] = [];
  StatutPlanAng: any[] = [];
  date1: Date = new Date();
  date2: Date = new Date();
  date3: Date = new Date();
  Action = new PlanAction();
  ActionAng = new PlanAction();

  num: number = Number(0);
  numAng: number = Number(0);
  @ViewChild(CharteIncident3BfrAngComponent,{static:false}) myDiv: any;
  constructor(private incidentService: IncidentService, private charteService: CharteService,
    private router: Router,private renderer: Renderer2, private el: ElementRef,private messageService: MessageService) {
  }
  clear(table: Table) {
    table.clear();
  }


  ngOnInit(): void {
    this.Action = new PlanAction();
    this.AddIncidentAng = new Incident();
    this.ActionAng = new PlanAction();
    this.ListPlanAction = new Array<PlanAction>();
    this.ListPlanActionAng = new Array<PlanAction>();
    this.num = 1;
    this.numAng = 1;
    this.StatutPlan = [
      { name: 'En cours' },
      { name: 'A Démarer' },
      { name: 'Clos' },
    ];
    this.StatutPlanAng = [
      { name: 'On going' },
      { name: 'To start' },
      { name: 'Closed' },
    ];
    this.ListPlanAction =this.AddIncident.planActionList;
    this.translateInput();
    if (this.AddIncident.statut == "Ouvert") {
      this.AddIncidentAng.statut = "Open";
    } else if (this.AddIncident.statut == "Résolu avec Suivi") {
      this.AddIncidentAng.statut = "Resolved with Monitoring";
    } else if (this.AddIncident.statut == "Clos") {
      this.AddIncidentAng.statut = "Closed";
    }
  }

  translateInput() {
    translate(this.AddIncident.titreIncident, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddIncidentAng.titreIncident = result;
    })
      .catch((error: any) => {
        console.error(error);
      });
    translate(this.AddIncident.description, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddIncidentAng.description = result;
    })
      .catch((error: any) => {
        console.error(error);
      });
    translate(this.AddIncident.situationActuelle, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddIncidentAng.situationActuelle = result;
    })
      .catch((error: any) => {
        console.error(error);
      });
    translate(this.AddIncident.impact, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddIncidentAng.impact = result;
    })
      .catch((error: any) => {
        console.error(error);
      });
    translate(this.AddIncident.causePrincipale, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddIncidentAng.causePrincipale = result;
    })
      .catch((error: any) => {
        console.error(error);
      });
    translate(this.AddIncident.solutionContournement, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddIncidentAng.solutionContournement = result;
    })
      .catch((error: any) => {
        console.error(error);
      });

    this.AddIncidentAng.numeroIncident = this.AddIncident.numeroIncident;
    this.AddIncidentAng.dateDebut = this.AddIncident.dateDebut;
    this.AddIncidentAng.dateFin = this.AddIncident.dateFin;
    this.AddIncidentAng.prochaineCommunication = this.AddIncident.prochaineCommunication;
    this.AddIncidentAng.application = this.AddIncident.application;
    for (let i = 0; i < this.ListPlanAction.length; i++) {
      translate(this.ListPlanAction[i].description, { from: 'fr', to: 'en' }).then((result: string) => {
        this.ActionAng.description = result; // Output: "Bonjour le monde"
        if (this.ListPlanAction[i].statut === "En cours") {
          this.ActionAng.statut = "On going";
          this.ActionAng.numero = this.ListPlanAction[i].numero;
        } else if (this.ListPlanAction[i].statut === "A Démarer") {
          this.ActionAng.numero = this.ListPlanAction[i].numero;
          this.ActionAng.statut = "To start";
        } else if (this.ListPlanAction[i].statut = "Clos") {
          this.ActionAng.numero = this.ListPlanAction[i].numero;
          this.ActionAng.statut = "Closed";
        };
        this.ListPlanActionAng.push(this.ActionAng);
        this.ActionAng = new PlanAction();
        this.numAng = this.num;
      })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }
  removeListPlanAction(us: PlanAction) {
    let i = this.ListPlanAction.indexOf(us);
    this.ListPlanAction.splice(i, 1);
    this.numAng = this.numAng - 1;
  }
  removeListPlanActionAng(us: PlanAction) {
    let i = this.ListPlanActionAng.indexOf(us);
    this.ListPlanActionAng.splice(i, 1);
    this.num = this.num - 1;
  }

  get AddIncident(): Incident {
    return this.incidentService.AddIncident;
  }

  set AddIncident(value: Incident) {
    this.incidentService.AddIncident = value;
  }

  get AddIncidentAng(): Incident {
    return this.incidentService.AddIncidentAng;
  }

  set AddIncidentAng(value: Incident) {
    this.incidentService.AddIncidentAng = value;
  }

  get ListPlanActionAng(): Array<PlanAction>{
    return this.incidentService.ListPlanActionAng;
  }

  set ListPlanActionAng(value: Array<PlanAction>) {
    this.incidentService.ListPlanActionAng = value;
  }

  get ListPlanAction(): Array<PlanAction>{

    return this.incidentService.ListPlanAction;
  }

  set ListPlanAction(value: Array<PlanAction>) {
    this.incidentService.ListPlanAction = value;
  }


  AddAction() {
    if (this.Action.statut != null && this.Action.description != null && this.Action.numero != null) {
      this.Action.numero = this.num;
      this.ListPlanAction.push(this.Action);
      this.Action = new PlanAction();
      this.num = this.num + 1;
    }
  }
  AddActionAng() {
    if (this.ActionAng.statut != null && this.ActionAng.description != null && this.ActionAng.numero != null) {
      this.Action.numero = this.numAng;
      this.ListPlanActionAng.push(this.ActionAng);
      this.ActionAng = new PlanAction();
      this.numAng = this.numAng + 1;
    }
  }

  get charteIncident3BfrAng(): boolean {
    return this.charteService.charteIncident3BfrAng;
  }

  set charteIncident3BfrAng(value: boolean) {
    this.charteService.charteIncident3BfrAng = value;
  }
  showCharte() {
    this.AddIncident.planActionList = this.ListPlanAction;
    this.AddIncidentAng.planActionList = this.ListPlanActionAng;
    this.charteIncident3BfrAng = true;
  }
  SaveIncident(){
    if(this.AddIncident.description != null && this.AddIncident.causePrincipale != null &&this.AddIncident.situationActuelle != null && this.AddIncident.prochaineCommunication !=null){
      this.incidentService.SaveIncident().subscribe((data) => {
             this.AddIncident=new Incident();
             this.ListPlanAction = new Array<PlanAction>();
             this.ListPlanActionAng = new Array<PlanAction>();
             this.router.navigate(['/pilote/incident/registre']);
             this.messageService.add({severity:'success', summary: 'Success', detail: 'Incident Ajouter avec succès'});
            },error=>{
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement verifier le titre d \'incident'});
      })
      }else{
        this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
      }
    
  }
  SendAndSaveIncident() {
       this.AddIncident.planActionList = this.ListPlanAction;
      this.AddIncidentAng.planActionList = this.ListPlanActionAng;
      this.SaveIncident();
      // this.charteIncident3BfrAng = true;
      // const node=this.myDiv.filterComponent.nativeElement;
      // const divHtml = this.myDiv.filterComponent.nativeElement.outerHTML;
      // console.log(divHtml);
      // domToImage.toPng(node).then((dataUrl: string) => {
      //   this.imageDataUrl = dataUrl;
      // });
      // this.charteIncident3BfrAng = false;
      // const div='<h1>hellooo</h1>'
      // const emailUrl = `mailto:?subject=Subject&body=${encodeURIComponent(divHtml)}&Content-Type=text/html`;
      //window.location.href = emailUrl;
  }


}
