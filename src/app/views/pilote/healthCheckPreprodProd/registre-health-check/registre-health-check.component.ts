import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EtatProcessusMetier } from 'src/app/controller/model/etat-processus-metier';
import { HealthChekPreprodProd } from 'src/app/controller/model/health-chek-preprod-prod';
import { HealthChekPreprodProdDetail } from 'src/app/controller/model/health-chek-preprod-prod-detail';
import { CharteService } from 'src/app/controller/service/charte.service';
import { HealthCheckService } from 'src/app/controller/service/health-check.service';

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
    this.FindHealth();
    this.ListType= [
      { name: 'PREPRODUCTION' },
      { name: 'PRODUCTION' },
    ];
  }
  RouterAjout(){
    this.router.navigate(['/pilote/healthcheck/PreprodProd/save']);
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
}
