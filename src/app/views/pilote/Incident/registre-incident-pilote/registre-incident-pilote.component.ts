import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService} from 'primeng/api';
import { Table } from 'primeng/table';
import { Application } from 'src/app/controller/model/application';
import { Incident } from 'src/app/controller/model/incident';
import { PiloteApplication } from 'src/app/controller/model/pilote-application';
import { PlanAction } from 'src/app/controller/model/plan-action';
import { ApplicationService } from 'src/app/controller/service/application.service';
import { CharteService } from 'src/app/controller/service/charte.service';
import { IncidentService } from 'src/app/controller/service/incident.service';
import translate from 'translate';
import * as FileSaver from 'file-saver';
import { User } from 'src/app/controller/model/user';
import { AuthService } from 'src/app/controller/service/auth.service';
import { cloneDeep } from 'lodash';
const moment = require('moment');
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
  searchApp = new Array<Application>();
  ListPiloteApp = new Array<PiloteApplication>();
  showPopUpIncd: boolean = false;
  application: Application = new Application();
  listLangage: any[] = [];
  listLangageCharte: any[] = [];
  langage: string= String();
  viewCharte:boolean = false;
  popUpLangue:boolean=false;
  optionType:boolean=false;
  selectLang:any='';
  ListType:any[]=[];
  pageSize: number = 10;
  page: number = 0;
  first: number = 0;
  totalRecords: number = 0;
  currentPageReportTemplate: string = '';
  filterIncident:Incident=new Incident();
  statutIncidentFiltre: any[] = [];
  searchActive:boolean=false;
  constructor(private charteService:CharteService,private incidentService: IncidentService,private confirmationService: ConfirmationService,
     private router: Router, private appService: ApplicationService, private messageService:MessageService,private userService: AuthService) { 
     }
  clear() {
    this.searchActive = false;
    this.filterIncident= new Incident();
    this.loadIncidentsLazy({ first: 0, rows: this.pageSize });
  }
  get User(): User {
    return this.userService.User;
  }

  set User(value: User) {
    this.userService.User = value;
  }

  exportExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.ListIncidentOfPilote.map(incident => {
        return {
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
      })
    );

    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(excelData, 'incident_export_' + new Date().getTime() + '.xlsx');
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
    translate(this.AddIncident.detailResolution, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddIncidentAng.detailResolution = result;
    })
      .catch((error: any) => {
        console.error(error);
      });
      translate(this.AddIncident.actionPrise, { from: 'fr', to: 'en' }).then((result: string) => {
        this.AddIncidentAng.actionPrise = result;
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
  this.AddIncident=cloneDeep(inc);
  this.incidentService.FindPlanActionByIncident(inc.id).subscribe((data)=>{
    // @ts-ignore
    this.AddIncident.planActionList = data.body;
    this.ListPlanAction =this.AddIncident.planActionList;
    this.changeStatut();
  })
  this.showPopUpIncd = true;
}
loadIncidentsLazy(event: LazyLoadEvent): void {
  this.loading = true;
  this.incidentService.FindIncidentByPilote(this.page, this.pageSize).subscribe((data) => {
    //@ts-ignore
    this.ListIncidentOfPilote = data.body.content;
    //@ts-ignore
    this.totalRecords = data.body.totalElements;
    this.currentPageReportTemplate = `Showing ${this.first + 1} to ${this.first + this.pageSize} of ${this.totalRecords} entries`;
    this.loading = false;
  });
}
lazyLoadHandler(event: LazyLoadEvent): void {

  if( this.searchActive==true){
    if (event.first !== this.first || event.rows !== this.pageSize) {
      this.first = event.first ?? 0;
      this.pageSize = event.rows ?? 10;
      this.page = Math.floor(this.first / this.pageSize);
    this.searchIncident();
    }
  }else{
  if (event.first !== this.first || event.rows !== this.pageSize) {
    this.first = event.first ?? 0;
    this.pageSize = event.rows ?? 10;
    this.page = Math.floor(this.first / this.pageSize);
    // Only trigger the loadIncidentsLazy function if the page or pageSize has changed
    this.loadIncidentsLazy(event);
  }}
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
    }else if(this.AddIncident.application.charteIncident == 'charte Incident BI'){
      this.charteIncidentBIfr = true;
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
    }else if(this.AddIncident.application.charteIncident == 'charte Incident BI'){
      this.charteIncidentBIfrAng = true;
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
    }else if(this.AddIncident.application.charteIncident == 'charte Incident BI'){
      this.charteIncidentBIAng = true;
      this.selectLang='';
    }
  }
}

  ngOnInit(): void {
    this.loadIncidentsLazy({ first: 0, rows: this.pageSize });
    this.FindApp();
    this.getAppforSearch();
    this.AddIncident = new Incident();
    this.ListType= [
      { name: 'PREPRODUCTION' },
      { name: 'PRODUCTION' },
    ];
  
    this.listLangage = [
      { name: 'Français' },
      { name: 'Français-Anglais' },
    ];
    this.listLangageCharte=[
      { name: 'Français' },
      { name: 'Français-Anglais' },
      { name: 'Anglais' }
    ];
    this.statutIncidentFiltre = [
      { name: 'Ouvert' },
      { name: 'Résolu avec Suivi' },
      { name: 'Clos' },
    ];
  }
  
  changeStatut(){
    if(this.AddIncident.application.charteIncident == 'charte Incident'){
      this.optionType=false;
      this.statutIncident = [
        { name: 'Ouvert' },
        { name: 'Résolu avec Suivi' },
        { name: 'Clos' },
      ];
    }else if(this.AddIncident.application.charteIncident == 'charte Incident Monetics' || this.AddIncident.application.charteIncident == 'charte Incident BI'){
      this.optionType=true;
      this.statutIncident = [
        { name: 'Ouvert' },
        { name: 'Clos' },
      ];
    }
  }
searchIncident(){
  this.loading = true;
  console.log(this.filterIncident.dateDebut);
  if(this.filterIncident.application.id==null){
    this.filterIncident.application.id =0;
  }
  if(!this.filterIncident.description && !this.filterIncident.dateDebut && !this.filterIncident.dateFin && !this.filterIncident.titreIncident && this.filterIncident.application.id==0 && !this.filterIncident.statut  ){
    this.clear();
  }else{
  this.incidentService.SearchInci(this.filterIncident.dateDebut,this.filterIncident.dateFin,this.filterIncident,this.page, this.pageSize).subscribe((data)=>{
    console.log(data);
    this.searchActive=true;
    //@ts-ignore
    this.ListIncidentOfPilote = data.body.content;
    //@ts-ignore
    this.totalRecords = data.body.totalElements;
    this.currentPageReportTemplate = `Showing ${this.first + 1} to ${this.first + this.pageSize} of ${this.totalRecords} entries`;
    this.loading = false;

  })}
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
  get charteIncidentBIfr(): boolean {
    return this.charteService.charteIncidentBIfr;
  }

  set charteIncidentBIfr(value: boolean) {
    this.charteService.charteIncidentBIfr = value;
  }
  get charteIncidentBIfrAng(): boolean {
    return this.charteService.charteIncidentBIfrAng;
  }

  set charteIncidentBIfrAng(value: boolean) {
    this.charteService.charteIncidentBIfrAng = value;
  }
  get charteIncidentBIAng(): boolean {
    return this.charteService.charteIncidentBIAng;
  }

  set charteIncidentBIAng(value: boolean) {
    this.charteService.charteIncidentBIAng = value;
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
        let app = new Array<Application>;
        app.push(this.ListPiloteApp[i].application);
        for(let i= 0; i<app.length; i++){
          if(app[i].nomApplication != 'Health Check Bw Perimetre' && app[i].nomApplication != 'health check ProdPredprod'){
            this.ListApp.push(app[i]);
          }
        }
      }
    })
  }
  getAppforSearch(){
    this.appService.FindApplicationBylotforPilote().subscribe((data) => {
      let app = new Array<Application>;
      // @ts-ignore
       app = data.body;
      for(let i= 0; i<app.length; i++){
        if(app[i].nomApplication != 'Health Check Bw Perimetre' && app[i].nomApplication != 'health check ProdPredprod'){
          this.searchApp.push(app[i]);
        }
      }
  })
  }
  onDialogHideLang(){
    this.loadIncidentsLazy({ first: 0, rows: this.pageSize });
    }
  DeleteIncident(id:number){
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr(e) de vouloir continuer?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.incidentService.DeleteIncident(id).subscribe((data) => {
          this.loadIncidentsLazy({ first: 0, rows: this.pageSize });          // @ts-ignore
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
