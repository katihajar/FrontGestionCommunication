import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Application } from 'src/app/controller/model/application';
import { ChangementPlanifier } from 'src/app/controller/model/changement-planifier';
import { ContenuChangement } from 'src/app/controller/model/contenu-changement';
import { PiloteApplication } from 'src/app/controller/model/pilote-application';
import { ApplicationService } from 'src/app/controller/service/application.service';
import { ChangementService } from 'src/app/controller/service/changement.service';
import { CharteService } from 'src/app/controller/service/charte.service';
const translate = require('translate');
import * as FileSaver from 'file-saver';
const moment = require('moment');
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
  constructor(private router: Router,private changeService: ChangementService, private charte: CharteService,
    private confirmationService: ConfirmationService,private messageService:MessageService,private appService: ApplicationService) { }

  ngOnInit(): void {
    this.FindChange();
    this.FindApp();
    this.AddChangement = new ChangementPlanifier();
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
  clear(table: Table) {
    table.clear();
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
    this.AddChangement=chng;
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
  SelectLanguage(){
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
  }
  translateInput() {
    translate(this.AddChangement.titre, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddChangementAng.titre = result;
    })
      .catch((error: any) => {
        console.error(error);
      });
    translate(this.AddChangement.impactMetier, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddChangementAng.impactMetier = result;
    })
      .catch((error: any) => {
        console.error(error);
      });
      translate(this.AddChangement.detail, { from: 'fr', to: 'en' }).then((result: string) => {
        this.AddChangementAng.detail = result;
      })
        .catch((error: any) => {
          console.error(error);
        });
    this.AddChangementAng.version = this.AddChangement.version;
    this.AddChangementAng.dateDebut = this.AddChangement.dateDebut;
    this.AddChangementAng.dateFin = this.AddChangement.dateFin;
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
  FindChange() {
    this.changeService.FindChangementByPilote().subscribe((data) => {
      // @ts-ignore
      this.ListChangementOfPilote = data.body;
      this.loading = false;
    })
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
  onDialogHideLang(){
    this.FindChange();
  }
  DeleteChange(id:number){
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr(e) de vouloir continuer?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.changeService.DeleteChangement(id).subscribe((data) => {
          this.FindChange();
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
