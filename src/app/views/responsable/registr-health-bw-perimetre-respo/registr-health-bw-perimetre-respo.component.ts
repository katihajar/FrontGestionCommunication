import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { HealthCheckBwPerimetre } from 'src/app/controller/model/health-check-bw-perimetre';
import { HealthCheckBwPerimetreDetail } from 'src/app/controller/model/health-check-bw-perimetre-detail';
import { CharteService } from 'src/app/controller/service/charte.service';
import { HealthCheckBwPerimetreRespoService } from 'src/app/controller/service/health-check-bw-perimetre-respo.service';
import { HealthCheckBwPerimetreService } from 'src/app/controller/service/health-check-bw-perimetre.service';

@Component({
  selector: 'app-registr-health-bw-perimetre-respo',
  templateUrl: './registr-health-bw-perimetre-respo.component.html',
  styleUrls: ['./registr-health-bw-perimetre-respo.component.scss']
})
export class RegistrHealthBwPerimetreRespoComponent implements OnInit {

  loading: boolean = true;
  ListHealthCheckBw: Array<HealthCheckBwPerimetreDetail>= new Array<HealthCheckBwPerimetreDetail>();
  constructor(private healthService: HealthCheckBwPerimetreRespoService,private health2: HealthCheckBwPerimetreService,private charteService:CharteService,private router: Router,
    private confirmationService: ConfirmationService,private messageService:MessageService) { }
    clear(table: Table) {
      table.clear();
    }
  
  ngOnInit(): void {
    this.AddHealthCheckBw = new HealthCheckBwPerimetre();
    this.FindHealth();
  }


  FindHealth(){
    this.healthService.FindHealthCheckBw().subscribe((data) => {
      // @ts-ignore
      this.ListHealthCheckBw = data.body;
      this.loading = false;
    })
  }

  get AddHealthCheckBw(): HealthCheckBwPerimetre{
    return this.health2.AddHealthCheckBw;
  }

  set AddHealthCheckBw(value: HealthCheckBwPerimetre) {
    this.health2.AddHealthCheckBw = value;
  }


  get charteHealthCheckBw(): boolean {
    return this.charteService.charteHealthCheckBw;
  }

  set charteHealthCheckBw(value: boolean) {
    this.charteService.charteHealthCheckBw = value;
  }
  charte(helth:HealthCheckBwPerimetre){
    this.AddHealthCheckBw=helth;
    this.healthService.FindDetailByHealthCheckBw(helth.id).subscribe((data)=>{
            // @ts-ignore
      this.AddHealthCheckBw.healthCheckBwPerimetreDetailList=data.body;
    }); 

    this.charteHealthCheckBw = true;
  }
}
