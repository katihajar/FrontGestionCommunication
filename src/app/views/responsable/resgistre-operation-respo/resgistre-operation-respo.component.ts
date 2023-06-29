import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Table } from 'primeng/table';
import { Application } from 'src/app/controller/model/application';
import { Operation } from 'src/app/controller/model/operation';
import { PiloteApplication } from 'src/app/controller/model/pilote-application';
import { ApplicationRespoService } from 'src/app/controller/service/application-respo.service';
import { ApplicationService } from 'src/app/controller/service/application.service';
import { CharteService } from 'src/app/controller/service/charte.service';
import { OperationService } from 'src/app/controller/service/operation.service';
import translate from 'translate';

@Component({
  selector: 'app-resgistre-operation-respo',
  templateUrl: './resgistre-operation-respo.component.html',
  styleUrls: ['./resgistre-operation-respo.component.scss']
})
export class ResgistreOperationRespoComponent implements OnInit {

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
  ListOperationOfRespo = new Array<Operation>();
  constructor(private operationService: OperationService,private appService: ApplicationRespoService,private charte: CharteService,
    private confirmationService: ConfirmationService, private router:Router,private messageService:MessageService) { }
  clear(table: Table) {
    table.clear();
  }
  FindOperation() {
    this.operationService.FindOperationByRespo().subscribe((data) => {
      // @ts-ignore
      this.ListOperationOfRespo = data.body;
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
      { name: 'Planifier' },
      { name: 'Terminer' },
    ];
    this.listLangageCharte=[
      { name: 'Français' },
      { name: 'Français-Anglais' },
      { name: 'Anglais' }
    ];
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.ListOperationOfRespo.map(operattion => {
        return {
          id:operattion.id,
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

  FindApp() {
    this.appService.FindApplicationByRespo().subscribe((data) => {
      // @ts-ignore
      this.ListApp = data.body;
    })
  }

  onDialogHideLang(){
    this.FindOperation();
  }

}
