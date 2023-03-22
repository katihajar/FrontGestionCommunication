import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EtatProcessusMetier } from 'src/app/controller/model/etat-processus-metier';
import { HealthCheckBwPerimetre } from 'src/app/controller/model/health-check-bw-perimetre';
import { HealthCheckBwPerimetreDetail } from 'src/app/controller/model/health-check-bw-perimetre-detail';
import { HealthChekPreprodProd } from 'src/app/controller/model/health-chek-preprod-prod';
import { HealthChekPreprodProdDetail } from 'src/app/controller/model/health-chek-preprod-prod-detail';
import { CharteService } from 'src/app/controller/service/charte.service';
import { HealthCheckBwPerimetreService } from 'src/app/controller/service/health-check-bw-perimetre.service';

@Component({
  selector: 'app-registrehealth-check-bw-perimetre',
  templateUrl: './registrehealth-check-bw-perimetre.component.html',
  styleUrls: ['./registrehealth-check-bw-perimetre.component.scss']
})
export class RegistrehealthCheckBwPerimetreComponent implements OnInit {

  loading: boolean = true;
  constructor(private healthService: HealthCheckBwPerimetreService,private charteService:CharteService,private router: Router,
    private confirmationService: ConfirmationService,private messageService:MessageService) { }
    clear(table: Table) {
      table.clear();
    }
  
  ngOnInit(): void {
    this.AddHealthCheckBw = new HealthCheckBwPerimetre();
    this.FindHealth();
  }
  RouterAjout(){
    this.AddHealthCheckBw.dateAjout = new Date();
    this.AddHealthCheckBw.titre ='Health Check  BW perimeter -'+moment(this.AddHealthCheckBw.dateAjout).format('DD/MM/YYYY');
   this.router.navigate(['/pilote/healthcheck/Bw/save']);
  }

  FindHealth(){
    this.healthService.FindHealthCheckBwByPilote().subscribe((data) => {
      // @ts-ignore
      this.ListHealthCheckBw = data.body;
      this.loading = false;
    })
  }
  Edite(helth:HealthCheckBwPerimetre){
    this.AddHealthCheckBw=helth;
    this.healthService.FindDetailByHealthCheckBw(helth.id).subscribe((data)=>{
            // @ts-ignore
      this.AddHealthCheckBw.healthCheckBwPerimetreDetailList=data.body;
      this.router.navigate(['/pilote/healthcheck/Bw/save']);
    }); 

  }
  get AddHealthCheckBw(): HealthCheckBwPerimetre{
    return this.healthService.AddHealthCheckBw;
  }

  set AddHealthCheckBw(value: HealthCheckBwPerimetre) {
    this.healthService.AddHealthCheckBw = value;
  }

  get ListHealthBwDetail(): Array<HealthCheckBwPerimetreDetail>{
    return this.healthService.ListHealthBwDetail;
  }

  set ListHealthBwDetail(value: Array<HealthCheckBwPerimetreDetail>) {
    this.healthService.ListHealthBwDetail = value;
  }

  get ListHealthCheckBw(): Array<HealthCheckBwPerimetre>{
    return this.healthService.ListHealthCheckBw;
  }

  set ListHealthCheckBw(value: Array<HealthCheckBwPerimetre>) {
    this.healthService.ListHealthCheckBw = value;
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
  DeleteHealthCheck(id:number){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.healthService.DeleteHealthCheckBw(id).subscribe((data) => {
          this.FindHealth();
          // @ts-ignore
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Etat de Santé Bw Perimetre supprimer avec succès'});
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
