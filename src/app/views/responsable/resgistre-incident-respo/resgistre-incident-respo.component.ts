import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';
import { ConfirmationService, MessageService, ConfirmEventType, LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Application } from 'src/app/controller/model/application';
import { Incident } from 'src/app/controller/model/incident';
import { PlanAction } from 'src/app/controller/model/plan-action';
import { ApplicationRespoService } from 'src/app/controller/service/application-respo.service';
import { CharteService } from 'src/app/controller/service/charte.service';
import { IncidentRespoService } from 'src/app/controller/service/incident-respo.service';
import { IncidentService } from 'src/app/controller/service/incident.service';
const translate = require('translate');

@Component({
  selector: 'app-resgistre-incident-respo',
  templateUrl: './resgistre-incident-respo.component.html',
  styleUrls: ['./resgistre-incident-respo.component.scss']
})
export class ResgistreIncidentRespoComponent implements OnInit {
  @ViewChild('dt1', { static: true })
  dt1!: Table;
  ListIncidentOfRespo = new Array<Incident>();
  ActionAng = new PlanAction();
  loading: boolean = true;
  statutIncident: any[] = [];
  ListApp = new Array<Application>();
  ListPiloteApp = new Array<Application>();
  showPopUpIncd: boolean = false;
  application: Application = new Application();
  listLangage: any[] = [];
  listLangageCharte: any[] = [];
  langage: string= String();
  viewCharte:boolean = false;
  popUpLangue:boolean=false;
  selectLang:any='';
  pageSize: number = 10;
  first: number = 0;
  totalRecords: number = 0;
  currentPageReportTemplate: string = '';
  sortField: string = String();
  sortOrder: number = 0;
  page: number = 0;
  searchActive:boolean=false;
  filterIncident:Incident= new Incident();
  constructor(private charteService:CharteService,private incidentServiceReso: IncidentRespoService,private incidentService: IncidentService,private confirmationService: ConfirmationService,
     private router: Router, private appService: ApplicationRespoService, private messageService:MessageService) { }
     clear() {
      this.searchActive= false;
      this.loadIncidentsLazy({ first: 0, rows: this.pageSize });
    }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.ListIncidentOfRespo.map(incident => {
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
      this.saveAsExcelFile(excelBuffer, "incident");
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



ShowCharte(inc:Incident){
  this.AddIncident=inc;
  this.incidentServiceReso.FindPlanActionByIncident(inc.id).subscribe((data)=>{
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
searchIncident(){  
  this.loading = true;
  console.log(this.filterIncident.statut);
  if(!this.filterIncident.dateDebut && !this.filterIncident.dateFin && !this.filterIncident.titreIncident && !this.filterIncident.application && (!this.filterIncident.statut || this.filterIncident.statut==null) ){
    console.log('here');
    this.clear();
  }else{
  this.incidentServiceReso.SearchInci(this.filterIncident.dateDebut,this.filterIncident.dateFin,this.filterIncident,this.page, this.pageSize).subscribe((data)=>{
    console.log(data);
    this.searchActive=true;
    //@ts-ignore
    this.ListIncidentOfRespo = data.body.content;
    //@ts-ignore
    this.totalRecords = data.body.totalElements;
    this.currentPageReportTemplate = `Showing ${this.first + 1} to ${this.first + this.pageSize} of ${this.totalRecords} entries`;
    this.loading = false;

  })}
}
loadIncidentsLazy(event: LazyLoadEvent): void {
  this.loading = true;

  this.incidentServiceReso.FindIncidentByRespo(this.page, this.pageSize).subscribe((data) => {
    //@ts-ignore
    this.ListIncidentOfRespo = data.body.content;
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
    this.loadIncidentsLazy(event);
  }}
}
  ngOnInit(): void {
    this.loadIncidentsLazy({ first: 0, rows: this.pageSize });
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
    this.appService.FindApplicationByRespo().subscribe((data) => {
      let app = new Array<Application>;
      // @ts-ignore
      app = data.body;
      for(let i= 0; i<app.length; i++){
        if(app[i].nomApplication != 'Health Check Bw Perimetre' && app[i].nomApplication != 'health check ProdPredprod'){
          this.ListApp.push(app[i]);
        }
      }
    })
  }
  
 
  onDialogHideLang(){
    this.loadIncidentsLazy({ first: 0, rows: this.pageSize });
  }


}
