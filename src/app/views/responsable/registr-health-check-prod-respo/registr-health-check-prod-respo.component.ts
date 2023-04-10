import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Application } from 'src/app/controller/model/application';
import { HealthChekPreprodProd } from 'src/app/controller/model/health-chek-preprod-prod';
import { CharteService } from 'src/app/controller/service/charte.service';
import { HealthCheckRespoService } from 'src/app/controller/service/health-check-respo.service';
import { HealthCheckService } from 'src/app/controller/service/health-check.service';

@Component({
  selector: 'app-registr-health-check-prod-respo',
  templateUrl: './registr-health-check-prod-respo.component.html',
  styleUrls: ['./registr-health-check-prod-respo.component.scss']
})
export class RegistrHealthCheckProdRespoComponent implements OnInit {

  ListHealthCheck : Array<HealthChekPreprodProd>=new Array<HealthChekPreprodProd>();
  loading: boolean = true;
  ListType: any[] = [];
  popUpAjout:boolean = false;
  constructor(private healthService: HealthCheckRespoService,private health2 : HealthCheckService,private charteService:CharteService,private router: Router,
    private confirmationService: ConfirmationService,private messageService:MessageService) { }
    clear(table: Table) {
      table.clear();
    }
  
  ngOnInit(): void {
    this.AddHealthCheck = new HealthChekPreprodProd();
    this.FindHealth();
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
}
