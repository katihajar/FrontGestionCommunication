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
  selector: 'app-ajout-health-check',
  templateUrl: './ajout-health-check.component.html',
  styleUrls: ['./ajout-health-check.component.scss']
})
export class AjoutHealthCheckComponent implements OnInit {
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
  }
  get AddHealthCheck(): HealthChekPreprodProd{
    return this.healthService.AddHealthCheck;
  }

  set AddHealthCheck(value: HealthChekPreprodProd) {
    this.healthService.AddHealthCheck = value;
  }

}
