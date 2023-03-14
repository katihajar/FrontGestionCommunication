import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import { Table } from 'primeng/table';
import { Application } from 'src/app/controller/model/application';
import { Incident } from 'src/app/controller/model/incident';
import { PiloteApplication } from 'src/app/controller/model/pilote-application';
import { PlanAction } from 'src/app/controller/model/plan-action';
import { ApplicationService } from 'src/app/controller/service/application.service';
import { CharteService } from 'src/app/controller/service/charte.service';
import { IncidentService } from 'src/app/controller/service/incident.service';
const translate = require('translate');
import * as FileSaver from 'file-saver';
const moment = require('moment');

@Component({
  selector: 'app-registre-incident-pilote',
  templateUrl: './registre-incident-pilote.component.html',
  styleUrls: ['./registre-incident-pilote.component.scss']
})
export class RegistreIncidentPiloteComponent implements OnInit {
  ActionAng = new PlanAction();
  loading: boolean = true;
  statutIncident: any[] = [];
  ListApp = new Array<Application>();
  ListPiloteApp = new Array<PiloteApplication>();
  showPopUpIncd: boolean = false;
  application: Application = new Application();
  listLangage: any[] = [];
  listLangageCharte: any[] = [];
  langage: string= String();
  viewCharte:boolean = false;
  popUpLangue:boolean=false;
  selectLang:any='';
  constructor(private charteService:CharteService,private incidentService: IncidentService,private confirmationService: ConfirmationService,
     private router: Router, private appService: ApplicationService, private messageService:MessageService) { }
  clear(table: Table) {
    table.clear();
  }


  exportExcel() {
    import("xlsx").then(xlsx => {
      console.log(typeof Date.prototype.toLocaleDateString);
      console.log(new Incident().dateDebut instanceof Date);
      const worksheet = xlsx.utils.json_to_sheet(this.ListIncidentOfPilote.map(incident => {
        return {
          id:incident.id,
          application: incident.application.nomApplication, 
          titreIncident: incident.titreIncident,
          numeroIncident: incident.numeroIncident,
          statut: incident.statut,
          description: incident.description,
          situationActuelle: incident.situationActuelle,
          impact: incident.impact,
          causePrincipale: incident.causePrincipale,
          solutionContournement: incident.solutionContournement,
          dateDebut: moment(incident.dateDebut).format('DD-MM-YYYY'),
          dateFin: moment(incident.dateFin).format('DD-MM-YYYY')
        };
      }));
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "products");
    });
  }

saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}


  RouteFormAddIncident() {
    if(this.AddIncident.application.nomApplication != '' && this.AddIncident.statut!='' && this.langage !=''){
    if(this.langage == "Français"){
    this.showPopUpIncd = false;
    this.router.navigate(['/pilote/incident/save/Français']);
  }else if(this.langage == "Français-Anglais"){
    this.showPopUpIncd = false;
    this.router.navigate(['/pilote/incident/save/FrançaisAnglais']);
  }
    }else{
      this.messageService.add({severity:'warn', summary:'Warning', detail:'Veuillez insérer tous les champs.'});
    }
  }
ShowCharte(inc:Incident){
  this.AddIncident=inc;
  this.incidentService.FindPlanActionByIncident(inc.id).subscribe((data)=>{
    // @ts-ignore
    this.AddIncident.planActionList = data.body;
    this.popUpLangue=true;
    this.AddIncidentAng = new Incident();
    this.ListPlanActionAng = new Array<PlanAction>();
    this.translateInput();
    if (this.AddIncident.statut == "Ouvert") {
      this.AddIncidentAng.statut = "Open";
    } else if (this.AddIncident.statut == "Résolu avec Suivi") {
      this.AddIncidentAng.statut = "Resolved with Monitoring";
    } else if (this.AddIncident.statut == "Clos") {
      this.AddIncidentAng.statut = "Closed";
    }
  })
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
  for (let i = 0; i < this.AddIncident.planActionList.length; i++) {
    translate(this.AddIncident.planActionList[i].description, { from: 'fr', to: 'en' }).then((result: string) => {
      this.ActionAng.description = result; // Output: "Bonjour le monde"
      if (this.AddIncident.planActionList[i].statut === "En cours") {
        this.ActionAng.statut = "On going";
        this.ActionAng.numero = this.AddIncident.planActionList[i].numero;
        this.ListPlanActionAng.push(this.ActionAng);
        this.ActionAng = new PlanAction();
      } else if (this.AddIncident.planActionList[i].statut === "A Démarer") {
        this.ActionAng.statut = "To start";
        this.ActionAng.numero = this.AddIncident.planActionList[i].numero;
        this.ListPlanActionAng.push(this.ActionAng);
        this.ActionAng = new PlanAction();
      } else if (this.AddIncident.planActionList[i].statut = "Clos") {
        this.ActionAng.statut = "Closed";
        this.ActionAng.numero = this.AddIncident.planActionList[i].numero;
        this.ListPlanActionAng.push(this.ActionAng);
        this.ActionAng = new PlanAction();
      };
    })
      .catch((error: any) => {
        console.error(error);
      }); 
  }
  this.AddIncidentAng.planActionList=this.ListPlanActionAng;
}
Edite(inc:Incident){
  this.AddIncident=inc;
  this.incidentService.FindPlanActionByIncident(inc.id).subscribe((data)=>{
    // @ts-ignore
    this.AddIncident.planActionList = data.body;
    this.ListPlanAction =this.AddIncident.planActionList;
  })
  this.showPopUpIncd = true;
}

SelectLanguage(){
  if(this.selectLang == "Français"){
    this.popUpLangue = false;
    if(this.AddIncident.application.charteIncident == 'charte Incident'){
      this.charteIncident3Bfr= true;
      this.selectLang='';
    }else if(this.AddIncident.application.charteIncident == 'charte Incident Monetics'){
      this.charteIncidentMonetic = true;
      this.selectLang='';
    }
  }else if(this.selectLang == "Français-Anglais"){
    this.popUpLangue = false;
    if(this.AddIncident.application.charteIncident == 'charte Incident'){
      this.charteIncident3BfrAng= true;
      this.selectLang='';
    }else if(this.AddIncident.application.charteIncident == 'charte Incident Monetics'){
      this.charteIncidentMoneticAngFr = true;
      this.selectLang='';
    }
  }else if(this.selectLang == "Anglais"){
    this.popUpLangue = false;
    if(this.AddIncident.application.charteIncident == 'charte Incident'){
      this.charteIncident3BAng= true;
      this.selectLang='';
    }else if(this.AddIncident.application.charteIncident == 'charte Incident Monetics'){
      this.charteIncidentMoneticAng = true;
      this.selectLang='';
    }
  }
}
  FindIncident() {
    this.incidentService.FindIncidentByPilote().subscribe((data) => {
      // @ts-ignore
      this.ListIncidentOfPilote = data.body;
      this.loading = false;
    })
  }
  ngOnInit(): void {
    this.FindIncident();
    this.FindApp();
    this.AddIncident = new Incident();
    
    this.statutIncident = [
      { name: 'Ouvert' },
      { name: 'Résolu avec Suivi' },
      { name: 'Clos' },
    ];
    this.listLangage = [
      { name: 'Français' },
      { name: 'Français-Anglais' },
    ];
    this.listLangageCharte=[
      { name: 'Français' },
      { name: 'Français-Anglais' },
      { name: 'Anglais' }
    ]
  }
  PopUp() {
    this.AddIncident= new Incident();
    this.AddIncidentAng= new Incident();
    this.showPopUpIncd = true;
  }
  get ListIncidentOfPilote(): Array<Incident> {
    return this.incidentService.ListIncidentOfPilote;
  }

  set ListIncidentOfPilote(value: Array<Incident>) {
    this.incidentService.ListIncidentOfPilote = value;
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
  get charteIncident3Bfr(): boolean {
    return this.charteService.charteIncident3Bfr;
  }

  set charteIncident3Bfr(value: boolean) {
    this.charteService.charteIncident3Bfr = value;
  }
  get charteIncidentMonetic(): boolean {
    return this.charteService.charteIncidentMonetic;
  }

  set charteIncidentMonetic(value: boolean) {
    this.charteService.charteIncidentMonetic = value;
  }
  get charteIncident3BfrAng(): boolean {
    return this.charteService.charteIncident3BfrAng;
  }

  set charteIncident3BfrAng(value: boolean) {
    this.charteService.charteIncident3BfrAng = value;
  }
  get charteIncident3BAng(): boolean {
    return this.charteService.charteIncident3BAng;
  }

  set charteIncident3BAng(value: boolean) {
    this.charteService.charteIncident3BAng = value;
  }
  get charteIncidentMoneticAng(): boolean {
    return this.charteService.charteIncidentMoneticAng;
  }

  set charteIncidentMoneticAng(value: boolean) {
    this.charteService.charteIncidentMoneticAng = value;
  }
  get charteIncidentMoneticAngFr(): boolean {
    return this.charteService.charteIncidentMoneticAngFr;
  }

  set charteIncidentMoneticAngFr(value: boolean) {
    this.charteService.charteIncidentMoneticAngFr = value;
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


  FindApp() {
    this.appService.FindApplicationByPilote().subscribe((data) => {
      // @ts-ignore
      this.ListPiloteApp = data.body;
      for (let i = 0; i < this.ListPiloteApp.length; i++) {
        this.ListApp.push(this.ListPiloteApp[i].application);
      }
    })
  }
  onDialogHideLang(){
    this.FindIncident();
  }
  DeleteIncident(id:number){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.incidentService.DeleteIncident(id).subscribe((data) => {
          this.FindIncident();
          // @ts-ignore
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Incident supprimer avec succès'});
        },error=>{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de la suppression'});
    });
      },
      reject: (type:any) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'error', summary:'Rejected', detail:'Suppression Rejeter'});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({severity:'warn', summary:'Cancelled', detail:'Suppression Annuler'});
              break;
          }
      }
  });
   
  }
}
