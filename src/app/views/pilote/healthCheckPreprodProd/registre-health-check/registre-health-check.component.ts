import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Application } from 'src/app/controller/model/application';
import { EtatProcessusMetier } from 'src/app/controller/model/etat-processus-metier';
import { HealthChekPreprodProd } from 'src/app/controller/model/health-chek-preprod-prod';
import { HealthChekPreprodProdDetail } from 'src/app/controller/model/health-chek-preprod-prod-detail';
import { CharteService } from 'src/app/controller/service/charte.service';
import { HealthCheckService } from 'src/app/controller/service/health-check.service';
const moment = require('moment');

@Component({
  selector: 'app-registre-health-check',
  templateUrl: './registre-health-check.component.html',
  styleUrls: ['./registre-health-check.component.scss']
})
export class RegistreHealthCheckComponent implements OnInit {
  loading: boolean = true;
  ListType: any[] = [];
  popUpAjout:boolean = false;
  constructor(private healthService: HealthCheckService,private charteService:CharteService,private router: Router,
    private confirmationService: ConfirmationService,private messageService:MessageService) { }
    clear(table: Table) {
      table.clear();
    }
  
  ngOnInit(): void {
    this.AddHealthCheck = new HealthChekPreprodProd();
    this.FindHealth();
    this.ListType= [
      { name: 'PREPRODUCTION' },
      { name: 'PRODUCTION' },
    ];
  }
PopAjout(){
  this.AddHealthCheck = new HealthChekPreprodProd();
  this.popUpAjout= true;
}
  RouterAjout(){
    if(this.AddHealthCheck.type != ''){
      this.router.navigate(['/pilote/healthcheck/PreprodProd/save']);
    }else{
      this.messageService.add({severity:'warn', summary:'Warning', detail:'Selectionner le Type'});
    }
  }

  onDialogHideLang(){
    this.AddHealthCheck = new HealthChekPreprodProd();
  }

  FindHealth(){
    this.healthService.FindHealthCheckByPilote().subscribe((data) => {
      // @ts-ignore
      this.ListHealthCheck = data.body;
      this.loading = false;
    })
  }
  Edite(helth:HealthChekPreprodProd){
    this.AddHealthCheck=helth;
    this.healthService.FindDetailByHealthCheck(helth.id).subscribe((data)=>{
      // @ts-ignore
      this.AddHealthCheck.healthChekPreprodProdDetailList=data.body;
    }); 
    this.healthService.FindEtatProcessusByHealthCheck(helth.id).subscribe((data)=>{
      // @ts-ignore
      this.AddHealthCheck.etatProcessusMetierList=data.body;
    });
    this.healthService.FindStatutAppByHealthCheck(helth.id).subscribe((data)=>{
      // @ts-ignore
      this.AddHealthCheck.statutApplicationList=data.body;

    }); 
    this.popUpAjout=true;

  }
  get AddHealthCheck(): HealthChekPreprodProd{
    return this.healthService.AddHealthCheck;
  }

  set AddHealthCheck(value: HealthChekPreprodProd) {
    this.healthService.AddHealthCheck = value;
  }

  get ListEtatProcess(): Array<EtatProcessusMetier>{
    return this.healthService.ListEtatProcess;
  }

  set ListEtatProcess(value: Array<EtatProcessusMetier>) {
    this.healthService.ListEtatProcess = value;
  }


  get ListHealthDetail(): Array<HealthChekPreprodProdDetail>{
    return this.healthService.ListHealthDetail;
  }

  set ListHealthDetail(value: Array<HealthChekPreprodProdDetail>) {
    this.healthService.ListHealthDetail = value;
  }

  get ListHealthCheck(): Array<HealthChekPreprodProd>{
    return this.healthService.ListHealthCheck;
  }

  set ListHealthCheck(value: Array<HealthChekPreprodProd>) {
    this.healthService.ListHealthCheck = value;
  }
  get charteHealthCheckPreprodProd(): boolean {
    return this.charteService.charteHealthCheckPreprodProd;
  }

  set charteHealthCheckPreprodProd(value: boolean) {
    this.charteService.charteHealthCheckPreprodProd = value;
  }
  charte(helth:HealthChekPreprodProd){
    this.AddHealthCheck=helth;
    this.healthService.FindDetailByHealthCheck(helth.id).subscribe((data)=>{
      // @ts-ignore
      this.AddHealthCheck.healthChekPreprodProdDetailList=data.body;
    }); 
    this.healthService.FindEtatProcessusByHealthCheck(helth.id).subscribe((data)=>{
      // @ts-ignore
      this.AddHealthCheck.etatProcessusMetierList=data.body;
    });
    this.healthService.FindStatutAppByHealthCheck(helth.id).subscribe((data)=>{
      // @ts-ignore
      this.AddHealthCheck.statutApplicationList=data.body;
    }); 
       this.charteHealthCheckPreprodProd = true;
  }
  DeleteHealthCheck(id:number){
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr(e) de vouloir continuer?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.healthService.DeleteHealthCheck(id).subscribe((data) => {
          this.FindHealth();
          // @ts-ignore
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Etat de Santé supprimer avec succès'});
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
