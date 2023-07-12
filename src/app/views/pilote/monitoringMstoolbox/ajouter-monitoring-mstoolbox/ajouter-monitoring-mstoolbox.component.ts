import { Component, OnInit, ViewChild } from '@angular/core';
import { DestinataireCommunication } from 'src/app/controller/model/destinataire-communication';
import { Implants } from 'src/app/controller/model/implants';
import { TransactionHandbid } from 'src/app/controller/model/transaction-handbid';
import { TransactionSmile } from 'src/app/controller/model/transaction-smile';
import { MonitoringMstoolboxService } from 'src/app/controller/service/monitoring-mstoolbox.service';
import { CharteMonitoringMstoolboxComponent } from '../charte-monitoring-mstoolbox/charte-monitoring-mstoolbox.component';
import { MonitoringMstoolbox } from 'src/app/controller/model/monitoring-mstoolbox';
import * as moment from 'moment';
import html2canvas from 'html2canvas';
import { MyOptions } from 'src/app/controller/model/myoption';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CharteService } from 'src/app/controller/service/charte.service';
import { DestinataireService } from 'src/app/controller/service/destinataire.service';
import { EmaildraftsService } from 'src/app/controller/service/emaildrafts.service';

@Component({
  selector: 'app-ajouter-monitoring-mstoolbox',
  templateUrl: './ajouter-monitoring-mstoolbox.component.html',
  styleUrls: ['./ajouter-monitoring-mstoolbox.component.scss']
})
export class AjouterMonitoringMstoolboxComponent implements OnInit{
  spinner:boolean=false;
  listImplants:  Array<Implants>= new Array<Implants>();
  implants:  Implants= new Implants();
  listTransactionHandbid:  Array<TransactionHandbid>= new Array<TransactionHandbid>();
  transactionHandbid:  TransactionHandbid= new TransactionHandbid();
  listTransactionSmile:  Array<TransactionSmile>= new Array<TransactionSmile>();
  transactionSmile:  TransactionSmile= new TransactionSmile();
  listDestinataire: Array<DestinataireCommunication> = new Array<DestinataireCommunication>();
  EmailObligatoire: any[] = [];
  EmailEnCC: any[] = [];
  imageDataUrl: string = String();
  Subject: string = String();
  dialogElement: any;
  @ViewChild(CharteMonitoringMstoolboxComponent, { static: false }) myDiv: any;
  constructor(private emailService: EmaildraftsService, private mstoolboxService: MonitoringMstoolboxService, private charteService: CharteService, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService, private destService: DestinataireService) {
  }
  clear(table: Table) {
    table.clear();
  }
  ngOnInit(): void {
    this.listImplants = new Array<Implants>();
    this.listTransactionHandbid = new Array<TransactionHandbid>();
    this.listTransactionSmile = new Array<TransactionSmile>();
    if(this.AddMonitoringMstoolbox.implantsList){
    this.listImplants = this.AddMonitoringMstoolbox.implantsList;
  }
  if(this.AddMonitoringMstoolbox.transactionHandbidList){
    this.listTransactionHandbid = this.AddMonitoringMstoolbox.transactionHandbidList;
  }
  if(this.AddMonitoringMstoolbox.transactionSmileList){
    this.listTransactionSmile = this.AddMonitoringMstoolbox.transactionSmileList;
  }
    this.destService.FindDestinataireHealthCheckProd().subscribe((data) => {
      // @ts-ignore
      this.listDestinataire = data.body;
      for (let i = 0; i < this.listDestinataire.length; i++) {
        if (this.listDestinataire[i].typeDest == 'Obligatoire' && this.listDestinataire[i].statutRespo == 'Valider') {
          this.EmailObligatoire.push(this.listDestinataire[i].email)
        } else if (this.listDestinataire[i].typeDest == 'en CC' && this.listDestinataire[i].statutRespo == 'Valider') {
          this.EmailEnCC.push(this.listDestinataire[i].email)
        }
      }
    })
  }

  get charteMonitoringMstoolbox(): boolean {
    return this.charteService.charteMonitoringMstoolbox;
  }

  set charteMonitoringMstoolbox(value: boolean) {
    this.charteService.charteMonitoringMstoolbox = value;
  }
  get AddMonitoringMstoolbox(): MonitoringMstoolbox {
    return this.mstoolboxService.AddMonitoringMstoolbox;
  }

  set AddMonitoringMstoolbox(value: MonitoringMstoolbox) {
    this.mstoolboxService.AddMonitoringMstoolbox = value;
  }
  AddImplants() {
    if (this.implants.numeroImplants) {
      const match = this.listImplants.find(implant => implant.numeroImplants === this.implants.numeroImplants);
      if (match) {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Vous avez déja insérer ce code d\'implant' });
      } else {
        this.listImplants.push(this.implants);
        this.implants = new Implants();
      }
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Insérer le code' });
    }
  }
  removeImplants(us: Implants) {
    let i = this.listImplants.indexOf(us);
    this.listImplants.splice(i, 1);
  }
  AddTransactionHandbid() {
    if (this.transactionHandbid.date) {
      const match = this.listTransactionHandbid.find(transaction => {
        const transactionDate = moment(transaction.date).format('YYYY-MM-DD');
        const inputDate = moment(this.transactionHandbid.date).format('YYYY-MM-DD');
        return transactionDate === inputDate;
      });
      if (match) {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Vous avez déja insérer une transaction dans cette date' });
      } else {
        this.listTransactionHandbid.push(this.transactionHandbid);
        this.transactionHandbid = new TransactionHandbid();
      }
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Insérer le code' });
    }
  }
  removeTransactionHandbid(us: TransactionHandbid) {
    let i = this.listTransactionHandbid.indexOf(us);
    this.listTransactionHandbid.splice(i, 1);
  }
  AddTransactionSmile() {
    if (this.transactionSmile.date) {
      const match = this.listTransactionSmile.find(transaction => {
        const transactionDate = moment(transaction.date).format('YYYY-MM-DD');
        const inputDate = moment(this.transactionSmile.date).format('YYYY-MM-DD');
        return transactionDate === inputDate;
      });
      if (match) {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Vous avez déja insérer une transaction dans cette date' });
      } else {
        this.listTransactionSmile.push(this.transactionSmile);
        this.transactionSmile = new TransactionSmile();
      }
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Insérer le code' });
    }
  }
  removeTransactionSmile(us: TransactionSmile) {
    let i = this.listTransactionSmile.indexOf(us);
    this.listTransactionSmile.splice(i, 1);
  }
  charte() {
    this.AddMonitoringMstoolbox.implantsList = this.listImplants;
    this.AddMonitoringMstoolbox.transactionHandbidList = this.listTransactionHandbid;
    this.AddMonitoringMstoolbox.transactionSmileList = this.listTransactionSmile;
    this.charteMonitoringMstoolbox = true;
  }
  Save() {
    this.AddMonitoringMstoolbox.titre = '[Monitoring MSTOOLBOX] Transactions HANDIBIP/SMILEE ' + moment(this.AddMonitoringMstoolbox.dateAjout).format('DD/MM/YYYY') + ',' + moment(this.AddMonitoringMstoolbox.dateAjout).format('HH:mm');
    this.Subject = '[Monitoring MSTOOLBOX] Transactions HANDIBIP/SMILEE ' + moment(this.AddMonitoringMstoolbox.dateAjout).format('DD/MM/YYYY');
    this.mstoolboxService.SaveMonitoring().subscribe((data) => {
      const content = `<div style="width: 650px;">${this.dialogElement.innerHTML}</div>`;
      this.emailService.authenticateAndRetrieveAccessToken(this.EmailObligatoire, this.EmailEnCC, this.Subject, content);      
      this.AddMonitoringMstoolbox = new MonitoringMstoolbox();
      this.listImplants = new Array<Implants>();
      this.listTransactionHandbid = new Array<TransactionHandbid>();
      this.listTransactionSmile = new Array<TransactionSmile>();
      this.spinner =false;
      this.router.navigate(['/pilote/healthcheck/PreprodProd/registre']);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Monitoring MSTOOLBOX Ajouter avec succès' });
    }, error => {
      this.spinner =false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement' });
    })

  }
  takeScreenshot() {
    this.charteMonitoringMstoolbox = true;
    setTimeout(() => {
      this.dialogElement = this.myDiv.filterComponent.nativeElement;
      const options: MyOptions = {
        scale: 2,
        logging: true,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
      };
      html2canvas(this.dialogElement, options).then((canvas) => {
        this.imageDataUrl = canvas.toDataURL();
        this.Save();
      });
      this.charteMonitoringMstoolbox = false;
    }, 1000);
  }
  SendAndSave() {
    this.AddMonitoringMstoolbox.id = 0;
    this.AddMonitoringMstoolbox.implantsList = this.listImplants;
    this.AddMonitoringMstoolbox.transactionHandbidList = this.listTransactionHandbid;
    this.AddMonitoringMstoolbox.transactionSmileList = this.listTransactionSmile;
    if (this.AddMonitoringMstoolbox.implantsList?.length != 0 && this.AddMonitoringMstoolbox.transactionHandbidList?.length != 0  && this.AddMonitoringMstoolbox.transactionSmileList?.length != 0) {    
          this.AddMonitoringMstoolbox.dateAjout = new Date();
          this.spinner =true;
          this.takeScreenshot();
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Insérer tout la liste des flux' });
    }
  }
  isSubmitDisabled(){
    return this.AddMonitoringMstoolbox.dateImplants == null ||this.AddMonitoringMstoolbox.implantsList?.length == 0 || this.AddMonitoringMstoolbox.transactionHandbidList?.length == 0  || this.AddMonitoringMstoolbox.transactionSmileList?.length == 0
  }
}
