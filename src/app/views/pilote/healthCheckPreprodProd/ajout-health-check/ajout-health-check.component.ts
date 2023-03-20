import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Application } from 'src/app/controller/model/application';
import { EtatProcessusMetier } from 'src/app/controller/model/etat-processus-metier';
import { HealthChekPreprodProd } from 'src/app/controller/model/health-chek-preprod-prod';
import { HealthChekPreprodProdDetail } from 'src/app/controller/model/health-chek-preprod-prod-detail';
import { ProcessusMetier } from 'src/app/controller/model/processus-metier';
import { CharteService } from 'src/app/controller/service/charte.service';
import { HealthCheckService } from 'src/app/controller/service/health-check.service';

@Component({
  selector: 'app-ajout-health-check',
  templateUrl: './ajout-health-check.component.html',
  styleUrls: ['./ajout-health-check.component.scss']
})
export class AjoutHealthCheckComponent implements OnInit {

  ListApp: Array<Application>= new Array<Application>();
  ListFeu:any[]=[];
  ListImpactClient:any[]=[];
  ListStatut:any[]=[];
  ListProcessus: Array<ProcessusMetier>= new Array<ProcessusMetier>();
  date2: Date = new Date();
  date3: Date = new Date();
  helthchekdetail: HealthChekPreprodProdDetail= new HealthChekPreprodProdDetail();
  etatproc: EtatProcessusMetier= new EtatProcessusMetier();
  listHelthchekdetail: Array<HealthChekPreprodProdDetail>= new Array<HealthChekPreprodProdDetail>();
  listEtatproc: Array<EtatProcessusMetier>= new Array<EtatProcessusMetier>();
  constructor(private healthService: HealthCheckService,private charteService:CharteService,private router: Router,
    private confirmationService: ConfirmationService,private messageService:MessageService) { }
    clear(table: Table) {
      table.clear();
    }
  ngOnInit(): void {
    this.FindApp();
    this.FindProcessus();
    this.ListFeu= [
      { name: 'OK' },
      { name: 'En cours d\'éxecuxtion' },
      { name: 'Flux non critique KO' },
      { name: 'Flux critique KO' }
    ];
    this.ListStatut= [
      { name: 'Ko' },
      { name: 'En cours' },
      { name: 'En attente' }
    ];
    this.ListImpactClient= [
      { name: 'OUI' },
      { name: 'NON' },
    ];
  }

  get AddHealthCheck(): HealthChekPreprodProd{
    return this.healthService.AddHealthCheck;
  }

  set AddHealthCheck(value: HealthChekPreprodProd) {
    this.healthService.AddHealthCheck = value;
  }
  AddEtat(){
    if(this.etatproc.statut != '' && this.etatproc.processusMetier.titre!=''  ){
    this.listEtatproc.push(this.etatproc);
    this.etatproc = new EtatProcessusMetier();
  }
}
removeEtat(us: EtatProcessusMetier) {
  let i = this.listEtatproc.indexOf(us);
  this.listEtatproc.splice(i, 1);
}
AddDeatils(){
  if(this.helthchekdetail.statut != '' && this.helthchekdetail.application.nomApplication!='' && this.helthchekdetail.feu != '' && this.helthchekdetail.impactClient != '' && this.helthchekdetail.information != ''){
  this.listHelthchekdetail.push(this.helthchekdetail);
  this.helthchekdetail = new HealthChekPreprodProdDetail();
}
}

removeDeatils(us: HealthChekPreprodProdDetail) {
  let i = this.listHelthchekdetail.indexOf(us);
  this.listHelthchekdetail.splice(i, 1);
}

  FindProcessus(){
    this.healthService.FindAllProcessusMetier().subscribe((data)=>{
      // @ts-ignore
      this.ListProcessus= data.body;
    })
  }
  FindApp(){
    this.healthService.FindApp().subscribe((data)=>{
      // @ts-ignore
      this.ListApp= data.body;
    })
  }
}
