import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Application } from 'src/app/controller/model/application';
import { HealthCheckBwPerimetre } from 'src/app/controller/model/health-check-bw-perimetre';
import { HealthCheckBwPerimetreDetail } from 'src/app/controller/model/health-check-bw-perimetre-detail';
import { HealthCheckFlamingo } from 'src/app/controller/model/health-check-flamingo';
import { HealthChekPreprodProd } from 'src/app/controller/model/health-chek-preprod-prod';
import { CharteService } from 'src/app/controller/service/charte.service';
import { HealthCheckBwPerimetreRespoService } from 'src/app/controller/service/health-check-bw-perimetre-respo.service';
import { HealthCheckBwPerimetreService } from 'src/app/controller/service/health-check-bw-perimetre.service';
import { HealthCheckRespoService } from 'src/app/controller/service/health-check-respo.service';
import { HealthCheckService } from 'src/app/controller/service/health-check.service';
import { HealthcheckFlamingoRespoService } from 'src/app/controller/service/healthcheck-flamingo-respo.service';
import { HealthcheckFlamingoService } from 'src/app/controller/service/healthcheck-flamingo.service';

@Component({
  selector: 'app-registr-health-check-prod-respo',
  templateUrl: './registr-health-check-prod-respo.component.html',
  styleUrls: ['./registr-health-check-prod-respo.component.scss']
})
export class RegistrHealthCheckProdRespoComponent implements OnInit {
  ListHealthCheckBw: Array<HealthCheckBwPerimetreDetail>= new Array<HealthCheckBwPerimetreDetail>();
  ListHealthCheck : Array<HealthChekPreprodProd>=new Array<HealthChekPreprodProd>();
  ListHealthCheckFlamingo: Array<HealthCheckFlamingo>= new  Array<HealthCheckFlamingo>();
  loading: boolean = true;
  loading2: boolean = true;
  loadingFlamingo: boolean = true;
  ListType: any[] = [];
  popUpAjout:boolean = false;
  constructor(private healthBW: HealthCheckBwPerimetreService,private healthBWService: HealthCheckBwPerimetreRespoService,private healthService: HealthCheckRespoService,private health2 : HealthCheckService,private charteService:CharteService,private router: Router,
    private healthFlamingoPiloteService: HealthcheckFlamingoService,private healthFlamingoService: HealthcheckFlamingoRespoService,private confirmationService: ConfirmationService,private messageService:MessageService) { }
    clear(table: Table) {
      table.clear();
    }
  
  ngOnInit(): void {
    this.AddHealthCheckBw = new HealthCheckBwPerimetre();
    this.FindHealthBW();
    this.AddHealthCheck = new HealthChekPreprodProd();
    this.FindHealth();
    this.AddHealthCheckFlamingo = new HealthCheckFlamingo();
    this.FindHealthFlamingo();
  }

  FindHealth(){
    this.healthService.FindHealthCheck().subscribe((data) => {
      // @ts-ignore
      this.ListHealthCheck = data.body;
      this.loading = false;
    })
  }

  get AddHealthCheck(): HealthChekPreprodProd{
    return this.health2.AddHealthCheck;
  }

  set AddHealthCheck(value: HealthChekPreprodProd) {
    this.health2.AddHealthCheck = value;
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
  FindHealthBW(){
    this.healthBWService.FindHealthCheckBw().subscribe((data) => {
      // @ts-ignore
      this.ListHealthCheckBw = data.body;
      this.loading = false;
    })
  }

  get AddHealthCheckBw(): HealthCheckBwPerimetre{
    return this.healthBW.AddHealthCheckBw;
  }

  set AddHealthCheckBw(value: HealthCheckBwPerimetre) {
    this.healthBW.AddHealthCheckBw = value;
  }


  get charteHealthCheckBw(): boolean {
    return this.charteService.charteHealthCheckBw;
  }

  set charteHealthCheckBw(value: boolean) {
    this.charteService.charteHealthCheckBw = value;
  }
  charteBW(helth:HealthCheckBwPerimetre){
    this.AddHealthCheckBw=helth;
    this.healthBWService.FindDetailByHealthCheckBw(helth.id).subscribe((data)=>{
            // @ts-ignore
      this.AddHealthCheckBw.healthCheckBwPerimetreDetailList=data.body;
    }); 

    this.charteHealthCheckBw = true;
  }
  /////Flamingo

  get AddHealthCheckFlamingo(): HealthCheckFlamingo {
    return this.healthFlamingoPiloteService.AddHealthCheck;
  }

  set AddHealthCheckFlamingo(value: HealthCheckFlamingo) {
    this.healthFlamingoPiloteService.AddHealthCheck = value;
  }
  FindHealthFlamingo() {
    this.healthFlamingoService.FindHealthCheckByRespo().subscribe((data) => {
      // @ts-ignore
      this.ListHealthCheckFlamingo = data.body;
      console.log(data.body);

      this.loadingFlamingo = false;
    });
  }

  charteFlamingo(helth: HealthCheckFlamingo) {
    this.AddHealthCheckFlamingo = helth;
    this.healthFlamingoService
      .FindFluxEAIByHealthCheck(helth.id)
      .subscribe((data) => {
        // @ts-ignore
        this.AddHealthCheckFlamingo.fluxEAIList = data.body;
        this.healthFlamingoService
          .FindFluxSalesOrderEAIByHealthCheck(helth.id)
          .subscribe((data) => {
            // @ts-ignore
            this.AddHealthCheckFlamingo.fluxSalesOrderList = data.body;
            this.healthFlamingoService
              .FindFluxSapEuropeByHealthCheck(helth.id)
              .subscribe((data) => {
                // @ts-ignore
                this.AddHealthCheckFlamingo.fluxSapEuropeList = data.body;
                this.healthFlamingoService
                  .FindFluxSapHarmonieByHealthCheck(helth.id)
                  .subscribe((data) => {
                    // @ts-ignore
                    this.AddHealthCheckFlamingo.fluxSapHarmonies = data.body;
                  });
              });
          });
      });

    this.charteHealthCheckFlamingo = true;
  } 
   get charteHealthCheckFlamingo(): boolean {
    return this.charteService.charteHealthCheckFlamingo;
  }

  set charteHealthCheckFlamingo(value: boolean) {
    this.charteService.charteHealthCheckFlamingo = value;
  }
}
