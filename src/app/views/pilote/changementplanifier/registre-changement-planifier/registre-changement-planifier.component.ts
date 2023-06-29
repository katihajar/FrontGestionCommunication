import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Application } from 'src/app/controller/model/application';
import { ChangementPlanifier } from 'src/app/controller/model/changement-planifier';
import { ContenuChangement } from 'src/app/controller/model/contenu-changement';
import { PiloteApplication } from 'src/app/controller/model/pilote-application';
import { ApplicationService } from 'src/app/controller/service/application.service';
import { ChangementService } from 'src/app/controller/service/changement.service';
import { CharteService } from 'src/app/controller/service/charte.service';
import translate from 'translate';
import * as FileSaver from 'file-saver';
import { AuthService } from 'src/app/controller/service/auth.service';
import { User } from 'src/app/controller/model/user';
const moment = require('moment');
import { cloneDeep } from 'lodash';
@Component({
  selector: 'app-registre-changement-planifier',
  templateUrl: './registre-changement-planifier.component.html',
  styleUrls: ['./registre-changement-planifier.component.scss']
})
export class RegistreChangementPlanifierComponent implements OnInit {
  loading: boolean = true;
  showPopUpChange: boolean = false;
  ListApp = new Array<Application>();
  listLangage: any[] = [];
  langage: string= String();
  selectLang:any='';
  statutChange: any[] = [];
  statutOperation: any[] = [];
  popUpLangue:boolean=false;
  listLangageCharte: any[] = [];
  ListType: any[] = [];
  ListPiloteApp = new Array<PiloteApplication>();
  ContenuAng = new ContenuChangement();
  filterChange:ChangementPlanifier=new ChangementPlanifier();
  searchActive:boolean=false;
  pageSize: number = 10;
  page: number = 0;
  first: number = 0;
  totalRecords: number = 0;
  currentPageReportTemplate: string = '';
  searchApp = new Array<Application>();
  listStatutDebut: any[] = [];
  constructor(private router: Router,private changeService: ChangementService, private charte: CharteService,private userService: AuthService,private cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService,private messageService:MessageService,private appService: ApplicationService) { }
    
    get User(): User {
      return this.userService.User;
    }
  
    set User(value: User) {
      this.userService.User = value;
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
  ngOnInit(): void {
    this.loadChangeLazy({ first: 0, rows: this.pageSize });
    this.FindApp();
    this.getAppforSearch();
    this.AddChangement = new ChangementPlanifier();
    this.listStatutDebut=[
      { name: 'Oui' },
      { name: 'Non' },
    ];
    this.ListType= [
      { name: 'PREPRODUCTION' },
      { name: 'PRODUCTION' },
    ];
    this.statutChange = [
      { name: 'Planifié' },
      { name: 'Terminé avec succès' },
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
    
  }
  clear() {
    this.searchActive=false;
    this.filterChange = new ChangementPlanifier();
    this.loadChangeLazy({ first: 0, rows: this.pageSize });
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.ListChangementOfPilote.map(change => {
        return {
          id:change.id,
          application: change.application.nomApplication, 
          version: change.version,
          titre: change.titre,
          statut: change.statut,
          impactMetier: change.impactMetier,
          detail:change.detail,
          dateDebut: moment(change.dateDebut).format('DD-MM-YYYY'),
          dateFin: moment(change.dateFin).format('DD-MM-YYYY')
        };
      }));
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "changement");
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

get charteChangeAng(): boolean {
  return this.charte.charteChangeAng;
}

set charteChangeAng(value: boolean) {
  this.charte.charteChangeAng = value;
}

get charteChangeFr(): boolean {
  return this.charte.charteChangeFr;
}

set charteChangeFr(value: boolean) {
  this.charte.charteChangeFr = value;
}

get charteChangeAngFr(): boolean {
  return this.charte.charteChangeAngFr;
}

set charteChangeAngFr(value: boolean) {
  this.charte.charteChangeAngFr = value;
}
get charteOperationAng(): boolean {
  return this.charte.charteOperationAng;
}

set charteOperationAng(value: boolean) {
  this.charte.charteOperationAng = value;
}
get charteOperationAngFr(): boolean {
  return this.charte.charteOperationAngFr;
}

set charteOperationAngFr(value: boolean) {
  this.charte.charteOperationAngFr = value;
}
get charteOperationFr(): boolean {
  return this.charte.charteOperationFr;
}

set charteOperationFr(value: boolean) {
  this.charte.charteOperationFr = value;
}
  get ListChangementOfPilote(): Array<ChangementPlanifier> {
    return this.changeService.ListChangementOfPilote;
  }

  set ListChangementOfPilote(value: Array<ChangementPlanifier>) {
    this.changeService.ListChangementOfPilote = value;
  }

  get AddChangement(): ChangementPlanifier {
    return this.changeService.AddChangement;
  }

  set AddChangement(value: ChangementPlanifier) {
    this.changeService.AddChangement = value;
  }
  get AddChangementAng(): ChangementPlanifier {
    return this.changeService.AddChangementAng;
  }

  set AddChangementAng(value: ChangementPlanifier) {
    this.changeService.AddChangementAng = value;
  }
  get ListContenuAng(): Array<ContenuChangement>{
    return this.changeService.ListContenuAng;
  }

  set ListContenuAng(value: Array<ContenuChangement>) {
    this.changeService.ListContenuAng = value;
  }

  get ListContenu(): Array<ContenuChangement>{

    return this.changeService.ListContenu;
  }

  set ListContenu(value: Array<ContenuChangement>) {
    this.changeService.ListContenu= value;
  }
  Edite(chng:ChangementPlanifier){
    this.AddChangement = cloneDeep(chng);
    this.changeService.FindContenuByChangement(chng.id).subscribe((data)=>{
      // @ts-ignore
      this.AddChangement.contenuChangementList = data.body;
      this.ListContenu =this.AddChangement.contenuChangementList;
    })
    this.showPopUpChange = true;
  }
  
  ShowCharte(chng:ChangementPlanifier){
    this.AddChangement=chng;
    this.changeService.FindContenuByChangement(chng.id).subscribe((data)=>{
      // @ts-ignore
      this.AddChangement.contenuChangementList = data.body;
      this.popUpLangue=true;
      this.AddChangementAng = new ChangementPlanifier();
      this.ListContenuAng = new Array<ContenuChangement>();
      this.translateInput();
      if (this.AddChangement.statut == "Planifié") {
        this.AddChangementAng.statut = "Scheduled";
      } else if (this.AddChangement.statut == "Terminé avec succès") {
        this.AddChangementAng.statut = "Completed successfully";
      } 
    })
  }
  PopUp() {
    this.AddChangement= new ChangementPlanifier();
    this.AddChangementAng= new ChangementPlanifier();
    this.showPopUpChange = true;
  }
  get charteChangeBiAngFr(): boolean {
    return this.charte.charteChangeBiAngFr;
  }
  
  set charteChangeBiAngFr(value: boolean) {
    this.charte.charteChangeBiAngFr = value;
  }
  get charteChangeBiAng(): boolean {
    return this.charte.charteChangeBiAng;
  }
  
  set charteChangeBiAng(value: boolean) {
    this.charte.charteChangeBiAng = value;
  }
  get charteChangeBiFr(): boolean {
    return this.charte.charteChangeBiFr;
  }
  
  set charteChangeBiFr(value: boolean) {
    this.charte.charteChangeBiAngFr = value;
  }
  SelectLanguage(){
    if(this.AddChangement.application.charteChangement == 'charte Changement Monetics' ){
    if(this.selectLang == "Français"){
      this.popUpLangue = false;
      this.charteChangeFr = true;
    }else if(this.selectLang == "Français-Anglais"){
      this.popUpLangue = false;
      this.charteChangeAngFr = true;
    }else if(this.selectLang == "Anglais"){
      this.popUpLangue = false;
      this.charteChangeAng = true;
    }
  }else if(this.AddChangement.application.charteChangement == 'charte Changement' ){
    if(this.selectLang == "Français"){
      this.popUpLangue = false;
      this.charteOperationFr = true;
    }else if(this.selectLang == "Français-Anglais"){
      this.popUpLangue = false;
      this.charteOperationAngFr = true;
    }else if(this.selectLang == "Anglais"){
      this.popUpLangue = false;
     this.charteOperationAng=true;
    }
  }else if(this.AddChangement.application.charteChangement == 'charte Changement BI' ){
    if(this.selectLang == "Français"){
      this.popUpLangue = false;
      this.charteChangeBiFr = true;
    }else if(this.selectLang == "Français-Anglais"){
      this.popUpLangue = false;
      this.charteChangeBiAngFr = true;
    }else if(this.selectLang == "Anglais"){
      this.popUpLangue = false;
      this.charteChangeBiAng = true;
    }
  }
  }
  translateInput() {
    if(this.AddChangement.titre){
      translate(this.AddChangement.titre, { from: 'fr', to: 'en' }).then((result: string) => {
        this.AddChangementAng.titre = result;
      })
        .catch((error: any) => {
          console.error(error);
        });}
        if(this.AddChangement.impactMetier){
      translate(this.AddChangement.impactMetier, { from: 'fr', to: 'en' }).then((result: string) => {
        this.AddChangementAng.impactMetier = result;
      })
        .catch((error: any) => {
          console.error(error);
        });}
        if(this.AddChangement.detail){
        translate(this.AddChangement.detail, { from: 'fr', to: 'en' }).then((result: string) => {
          this.AddChangementAng.detail = result;
        })
          .catch((error: any) => {
            console.error(error);
          });}
          if(this.AddChangement.planRollBack){
          translate(this.AddChangement.planRollBack, { from: 'fr', to: 'en' }).then((result: string) => {
            this.AddChangementAng.planRollBack = result;
          })
            .catch((error: any) => {
              console.error(error);
            });}
    this.AddChangementAng.version = this.AddChangement.version;
    this.AddChangementAng.dateDebut = this.AddChangement.dateDebut;
    this.AddChangementAng.dateFin = this.AddChangement.dateFin;
    this.AddChangementAng.prochaineCom = this.AddChangement.prochaineCom;

    for (let i = 0; i < this.AddChangement.contenuChangementList.length; i++) {
      translate(this.AddChangement.contenuChangementList[i].description, { from: 'fr', to: 'en' }).then((result: string) => {
        this.ContenuAng.description = result; 
      })
        .catch((error: any) => {
          console.error(error);
        }); 
        translate(this.AddChangement.contenuChangementList[i].titre, { from: 'fr', to: 'en' }).then((result: string) => {
          this.ContenuAng.titre = result; 
        })
          .catch((error: any) => {
            console.error(error);
          }); 
        this.ListContenuAng.push(this.ContenuAng);
    }
    this.AddChangementAng.contenuChangementList=this.ListContenuAng;
  }
disable(){
  if(this.AddChangement?.application?.charteChangement == 'charte Changement BI'){
 return (this.AddChangement.debut == '' || this.AddChangement.application.nomApplication == '' || this.AddChangement.statut=='' || this.langage =='' || this.AddChangement.type == '' ||this.AddChangement.debut == null || this.AddChangement.application.nomApplication == null || this.AddChangement.statut==null || this.langage ==null || this.AddChangement.type == null);
  }else{
    return this.AddChangement?.application?.nomApplication == '' || this.AddChangement.statut=='' || this.langage =='' || this.AddChangement.type == '' || this.AddChangement.application.nomApplication == null || this.AddChangement.statut==null || this.langage ==null || this.AddChangement.type == null;

  }
}
  RouteFormAddChange() {
    if(this.AddChangement.application.nomApplication != '' && this.AddChangement.statut!='' && this.langage !='' && this.AddChangement.type != ''){
    if(this.langage == "Français"){
    this.showPopUpChange = false;
    this.router.navigate(['/pilote/changement/save/Français']);
  }else if(this.langage == "Français-Anglais"){
    this.showPopUpChange = false;
    this.router.navigate(['/pilote/changement/save/FrançaisAnglais']);
  }
    }else{
      this.messageService.add({severity:'warn', summary:'Warning', detail:'Veuillez insérer tous les champs.'});
    }
  }
  loadChangeLazy(event: LazyLoadEvent): void {
    this.loading = true;
    this.changeService.FindChangementByPilote(this.page, this.pageSize).subscribe((data) => {      
      //@ts-ignore
      this.ListChangementOfPilote = data.body.content;
      //@ts-ignore
      this.totalRecords = data.body.totalElements;
      console.log( this.ListChangementOfPilote.length);
      
      this.currentPageReportTemplate = `Showing ${this.first + 1} to ${this.first + this.pageSize} of ${this.totalRecords} entries`;
      this.loading = false;
    });
  }
  lazyLoadHandler(event: LazyLoadEvent): void {
    if (event.first !== this.first || event.rows !== this.pageSize) {
        this.first = event.first ?? 0;
        this.pageSize = event.rows ?? 10;
        this.page = Math.floor(this.first / this.pageSize);
    if( this.searchActive==true){
          this.searchChange();

    }else{
      // Only trigger the loadIncidentsLazy function if the page or pageSize has changed
      this.loadChangeLazy(event);
    }
  }

  }

  searchChange(){
    this.loading = true;
    console.log(this.filterChange.dateDebut);
    if(!this.filterChange.dateDebut && !this.filterChange.dateFin && !this.filterChange.titre && !this.filterChange.application  && !this.filterChange.statut && !this.filterChange.version  ){
      console.log(this.filterChange.dateDebut);
      
      this.clear();
    }else{
    this.changeService.SearchChange(this.filterChange.dateDebut,this.filterChange.dateFin,this.filterChange,this.page, this.pageSize).subscribe((data)=>{
      this.searchActive=true;
      //@ts-ignore
      this.ListChangementOfPilote = data.body.content;
      //@ts-ignore
      this.totalRecords = data.body.totalElements;
      console.log( this.ListChangementOfPilote.length);
      console.log( data.body);
      this.currentPageReportTemplate = `Showing ${this.first + 1} to ${this.first + this.pageSize} of ${this.totalRecords} entries`;
      this.loading = false;
  
    })}
  }
  FindApp() {
    this.ListPiloteApp = new Array<PiloteApplication>;
    this.ListApp = new Array<Application>;
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
    });
    this.cdr.detectChanges();
  }
  onDialogHideLang(){
    this.loadChangeLazy({ first: 0, rows: this.pageSize });
  }
  DeleteChange(id:number){
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr(e) de vouloir continuer?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.changeService.DeleteChangement(id).subscribe((data) => {
          this.loadChangeLazy({ first: 0, rows: this.pageSize });
          // @ts-ignore
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Changement supprimer avec succès'});
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
