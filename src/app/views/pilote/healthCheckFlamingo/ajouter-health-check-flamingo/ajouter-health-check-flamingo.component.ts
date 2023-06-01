import { Component, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { MessageService } from 'primeng/api';
import { DestinataireCommunication } from 'src/app/controller/model/destinataire-communication';
import { FluxEAI } from 'src/app/controller/model/flux-eai';
import { FluxSalesOrder } from 'src/app/controller/model/flux-sales-order';
import { FluxSapEurope } from 'src/app/controller/model/flux-sap-europe';
import { FluxSapHarmonie } from 'src/app/controller/model/flux-sap-harmonie';
import { HealthCheckFlamingo } from 'src/app/controller/model/health-check-flamingo';
import { MyOptions } from 'src/app/controller/model/myoption';
import { CharteService } from 'src/app/controller/service/charte.service';
import { DestinataireService } from 'src/app/controller/service/destinataire.service';
import { HealthcheckFlamingoService } from 'src/app/controller/service/healthcheck-flamingo.service';
import { CharteHealthCheckFlamingoComponent } from '../charte-health-check-flamingo/charte-health-check-flamingo.component';
import * as moment from 'moment';
import { EmaildraftsService } from 'src/app/controller/service/emaildrafts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-health-check-flamingo',
  templateUrl: './ajouter-health-check-flamingo.component.html',
  styleUrls: ['./ajouter-health-check-flamingo.component.scss']
})
export class AjouterHealthCheckFlamingoComponent implements OnInit {
  spinner:boolean=false;
  dialogElement: any;
  date2:Date = new Date();
  ListFluxEAI: Array<FluxEAI> = new Array<FluxEAI>();
  ListFluxSapHarmonies: Array<FluxSapHarmonie> = new Array<FluxSapHarmonie>();
  ListfluxSalesOrder: Array<FluxSalesOrder> = new Array<FluxSalesOrder>();
  ListfluxSapEurope: Array<FluxSapEurope> = new Array<FluxSapEurope>();
  fluxEAI: FluxEAI = new FluxEAI();
  fluxSapHarmonies: FluxSapHarmonie = new FluxSapHarmonie();
  fluxSalesOrder: FluxSalesOrder = new FluxSalesOrder();
  fluxSapEurope: FluxSapEurope = new FluxSapEurope();
  listDestinataire: Array<DestinataireCommunication> = new Array<DestinataireCommunication>();
  EmailObligatoire: any[] = [];
  EmailEnCC: any[] = [];
  ListEtat:any[]=[];
  Subject: string = String();
  @ViewChild(CharteHealthCheckFlamingoComponent, { static: false }) myDiv: any;
  constructor(private healthFlamingoService: HealthcheckFlamingoService,private messageService: MessageService, 
    private router: Router,private emailService: EmaildraftsService,private destService: DestinataireService,private charteService:CharteService){}
  ngOnInit(): void {
    this.ListFluxEAI = this.AddHealthCheckFlamingo.fluxEAIList;
    this.ListFluxSapHarmonies = this.AddHealthCheckFlamingo.fluxSapHarmonies;
    this.ListfluxSalesOrder = this.AddHealthCheckFlamingo.fluxSalesOrderList;
    this.ListfluxSapEurope = this.AddHealthCheckFlamingo.fluxSapEuropeList;
    this.ListEtat = [
      { name: 'OK' },
      { name: 'KO' },
      { name: 'completed too late' }
    ];
    this.destService.FindDestinataireFlamingo().subscribe((data) => {
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
  get AddHealthCheckFlamingo(): HealthCheckFlamingo{
    return this.healthFlamingoService.AddHealthCheck;
  }

  set AddHealthCheckFlamingo(value: HealthCheckFlamingo) {
    this.healthFlamingoService.AddHealthCheck = value;
  }
  AddFluxEAI(){
    if(this.fluxEAI.commentaire!=''&& this.fluxEAI.process!=''&&this.fluxEAI.subProcess!=''&& this.fluxEAI.etat!=''){
    this.ListFluxEAI.push(this.fluxEAI);
    this.fluxEAI = new FluxEAI();
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Veuillez inserer tous les champs' });
    }
  }


  removeFluxEAI(us: FluxEAI) {
    let i = this.ListFluxEAI.indexOf(us);
    this.ListFluxEAI.splice(i, 1);
  }
  AddFluxSAPEurope(){
    if(this.fluxSapEurope.commentaire!=''&& this.fluxSapEurope.systeme!=''&& this.fluxSapEurope.etat!=''){
    this.ListfluxSapEurope.push(this.fluxSapEurope);
    this.fluxSapEurope = new FluxSapEurope();
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Veuillez inserer tous les champs' });
    }
  }


  removeFluxSAPEurope(us: FluxSapEurope) {
    let i = this.ListfluxSapEurope.indexOf(us);
    this.ListfluxSapEurope.splice(i, 1);
  }
  AddFluxSalesOrders (){
    if(this.fluxSalesOrder.commentaire!=''&& this.fluxSalesOrder.systeme!=''&& this.fluxSalesOrder.etat!=''){
    this.ListfluxSalesOrder.push(this.fluxSalesOrder);
    this.fluxSalesOrder = new FluxSalesOrder();
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Veuillez inserer tous les champs' });
    }
  }


  removeFluxSalesOrders(us: FluxSalesOrder) {
    let i = this.ListfluxSalesOrder.indexOf(us);
    this.ListfluxSalesOrder.splice(i, 1);
  }
  AddFluxHarmonie(){
    if(this.fluxSapHarmonies.commentaire!=''&& this.fluxSapHarmonies.systeme!=''&& this.fluxSapHarmonies.etat!=''){
    this.ListFluxSapHarmonies.push(this.fluxSapHarmonies);
    this.fluxSapHarmonies = new FluxSapHarmonie();
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Veuillez inserer tous les champs' });
    }
  }


  removeFluxHarmonie(us: FluxSapHarmonie) {
    let i = this.ListFluxSapHarmonies.indexOf(us);
    this.ListFluxSapHarmonies.splice(i, 1);
  }
  get charteHealthCheckFlamingo(): boolean {
    return this.charteService.charteHealthCheckFlamingo;
  }

  set charteHealthCheckFlamingo(value: boolean) {
    this.charteService.charteHealthCheckFlamingo = value;
  }
  charte() {
    this.AddHealthCheckFlamingo.fluxEAIList = this.ListFluxEAI;
    this.AddHealthCheckFlamingo.fluxSalesOrderList = this.ListfluxSalesOrder;
    this.AddHealthCheckFlamingo.fluxSapEuropeList = this.ListfluxSapEurope;
    this.AddHealthCheckFlamingo.fluxSapHarmonies = this.ListFluxSapHarmonies;
    this.charteHealthCheckFlamingo = true;
    console.log(this.AddHealthCheckFlamingo);
    
  }
  isSubmitDisabled() {
    return this.ListFluxEAI.length == 0 || this.ListfluxSalesOrder.length == 0 || this.ListFluxSapHarmonies.length == 0 || this.ListfluxSapEurope.length == 0 || this.AddHealthCheckFlamingo.dateFlux == null;
  }
  SaveHealth() {
    this.AddHealthCheckFlamingo.dateAjout = new Date();
    this.AddHealthCheckFlamingo.titre ='Health Check  Flamingo - '+moment(new Date()).format('dd/MM/YYYY');
    this.Subject = 'Monitoring des flux EAI - SAP de l\'application Flamingo - la date ' + moment(new Date()).format('dd/MM/YYYY');
    this.healthFlamingoService.SaveHealthCheck().subscribe((data) => {
      const content = `<div style="width: 900px;">${this.dialogElement.outerHTML}</div>`;
      this.emailService.authenticateAndRetrieveAccessToken(this.EmailObligatoire, this.EmailEnCC, this.Subject, content);      
      this.AddHealthCheckFlamingo = new HealthCheckFlamingo();
      this.ListFluxEAI = new Array<FluxEAI>();
      this.ListFluxEAI = new Array<FluxEAI>();
      this.ListFluxEAI = new Array<FluxEAI>();
      this.spinner =false;
      this.router.navigate(['/pilote/healthcheck/PreprodProd/registre']);

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Etat de santé Ajouter avec succès' });
    }, error => {
      this.spinner =false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement' });
    })

  }
  takeScreenshot() {
    this.charteHealthCheckFlamingo = true;
    setTimeout(() => {
      this.dialogElement = this.myDiv.filterComponent.nativeElement; 
        this.SaveHealth();
      this.charteHealthCheckFlamingo = false;


    }, 1000);
  }
  SendAndSaveHealth() {

    this.AddHealthCheckFlamingo.id = 0;
    this.AddHealthCheckFlamingo.fluxEAIList = this.ListFluxEAI;
    this.AddHealthCheckFlamingo.fluxSalesOrderList = this.ListfluxSalesOrder;
    this.AddHealthCheckFlamingo.fluxSapEuropeList = this.ListfluxSapEurope;
    this.AddHealthCheckFlamingo.fluxSapHarmonies = this.ListFluxSapHarmonies;
    this.spinner =true;
    this.takeScreenshot();
  }
}
