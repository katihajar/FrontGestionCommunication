import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Application } from 'src/app/controller/model/application';
import { Operation } from 'src/app/controller/model/operation';
import { PiloteApplication } from 'src/app/controller/model/pilote-application';
import { ApplicationService } from 'src/app/controller/service/application.service';
import { OperationService } from 'src/app/controller/service/operation.service';
import * as FileSaver from 'file-saver';
import { CharteService } from 'src/app/controller/service/charte.service';
import { AuthService } from 'src/app/controller/service/auth.service';
import { User } from 'src/app/controller/model/user';
import translate from 'translate';

@Component({
  selector: 'app-registre-operation',
  templateUrl: './registre-operation.component.html',
  styleUrls: ['./registre-operation.component.scss']
})
export class RegistreOperationComponent implements OnInit {
  loading: boolean = true;
  showPopUpOpert: boolean = false;
  ListApp = new Array<Application>();
  listLangage: any[] = [];
  langage: string= String();
  selectLang:any='';
  statutOperation: any[] = [];
  ListPiloteApp = new Array<PiloteApplication>();
  popUpLangue:boolean=false;
  listLangageCharte: any[] = [];
  constructor(private operationService: OperationService,private appService: ApplicationService,private charte: CharteService,
    private confirmationService: ConfirmationService, private router:Router,private messageService:MessageService,private userService: AuthService) { }
  clear(table: Table) {
    table.clear();
  }

  get User(): User {
    return this.userService.User;
  }

  set User(value: User) {
    this.userService.User = value;
  }
  FindOperation() {
    this.operationService.FindOperationByPilote().subscribe((data) => {
      // @ts-ignore
      this.ListOperationOfPilote = data.body;
      this.loading = false;
    })
  }
  ngOnInit(): void {
    this.FindOperation();
    this.FindApp();
    this.listLangage = [
      { name: 'Français' },
      { name: 'Français-Anglais' },
    ];
    this.statutOperation = [
      { name: 'Planifiée' },
      { name: 'Terminée' },
    ];
    this.listLangageCharte=[
      { name: 'Français' },
      { name: 'Français-Anglais' },
      { name: 'Anglais' }
    ];
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.ListOperationOfPilote.map(operattion => {
        return {
          application: operattion.application.nomApplication, 
          titre: operattion.titre,
          numeroIncident: operattion.numero,
          statut: operattion.statut,
          description: operattion.description,
          dateDebut: moment(operattion.dateDebut).format('DD-MM-YYYY'),
          dateFin: moment(operattion.dateFin).format('DD-MM-YYYY')
        };
      }));
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "operation");
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

Edite(op:Operation){
  this.AddOperation=op;
  this.showPopUpOpert = true;
}
translateInput() {
  translate(this.AddOperation.titre, { from: 'fr', to: 'en' }).then((result: string) => {
    this.AddOperationAng.titre = result;
  })
    .catch((error: any) => {
      console.error(error);
    });
  translate(this.AddOperation.description, { from: 'fr', to: 'en' }).then((result: string) => {
    this.AddOperationAng.description = result;
  })
    .catch((error: any) => {
      console.error(error);
    });
    translate(this.AddOperation.impactMetier, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddOperationAng.impactMetier = result;
    })
      .catch((error: any) => {
        console.error(error);
      });
    this.AddOperationAng.application = this.AddOperation.application;
    this.AddOperationAng.numero = this.AddOperation.numero;
    this.AddOperationAng.dateDebut = this.AddOperation.dateDebut;
    this.AddOperationAng.dateFin = this.AddOperation.dateFin;
}
ShowCharte(opr:Operation){
  this.AddOperation=opr;
    this.popUpLangue=true;
    this.AddOperationAng = new Operation();
    this.translateInput();
 
}
SelectLanguage(){
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
  get ListOperationOfPilote(): Array<Operation>{
    return this.operationService.ListOperationOfPilote;
  }

  set ListOperationOfPilote(value: Array<Operation>) {
    this.operationService.ListOperationOfPilote = value;
  }
  get AddOperation(): Operation{
    return this.operationService.AddOperation;
  }

  set AddOperation(value: Operation) {
    this.operationService.AddOperation = value;
  }
  get AddOperationAng(): Operation{
    return this.operationService.AddOperationAng;
  }

  set AddOperationAng(value: Operation) {
    this.operationService.AddOperationAng = value;
  }
  RouteFormAddIncident() {
    if(this.AddOperation.application.nomApplication !='' && this.AddOperation.statut!='' && this.langage !=''){
      this.AddOperationAng.application = this.AddOperation.application;
    if(this.langage == "Français"){
    this.showPopUpOpert = false;
    this.router.navigate(['/pilote/operation/save/Français']);
  }else if(this.langage == "Français-Anglais"){
    this.showPopUpOpert = false;
    this.router.navigate(['/pilote/operation/save/FrançaisAnglais']);
  }
    } else{
      this.messageService.add({severity:'warn', summary:'Warning', detail:'Insérer tous les champs'});
    }
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
  PopUpAdd() {
    this.AddOperation= new Operation();
    this.AddOperationAng= new Operation();
    this.showPopUpOpert = true;
  }
  onDialogHideLang(){
    this.FindOperation();
  }
  DeleteOperation(id:number){
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr(e) de vouloir continuer?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.operationService.DeleteOperation(id).subscribe((data) => {
          this.FindOperation();
          // @ts-ignore
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Operation supprimer avec succès'});
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
