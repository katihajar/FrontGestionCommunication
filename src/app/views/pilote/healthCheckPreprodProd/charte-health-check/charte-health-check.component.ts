import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HealthChekPreprodProd } from 'src/app/controller/model/health-chek-preprod-prod';
import { ProcessusMetier } from 'src/app/controller/model/processus-metier';
import { User } from 'src/app/controller/model/user';
import { AuthService } from 'src/app/controller/service/auth.service';
import { CharteService } from 'src/app/controller/service/charte.service';
import { HealthCheckService } from 'src/app/controller/service/health-check.service';
import { ProcessusMetierService } from 'src/app/controller/service/processus-metier.service';

@Component({
  selector: 'app-charte-health-check',
  templateUrl: './charte-health-check.component.html',
  styleUrls: ['./charte-health-check.component.scss']
})
export class CharteHealthCheckComponent implements OnInit {
  listHealt:Array<HealthChekPreprodProd>= new Array<HealthChekPreprodProd>();
  listProcess:Array<ProcessusMetier>= new Array<ProcessusMetier>();
  uniqueDates = []; 
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private authService: AuthService,private charteService: CharteService,private healthService: HealthCheckService,private processService: ProcessusMetierService) { }

  getLastTenDays(): Date[] {
    const today = new Date(); // Current date
    const lastTenDays: Date[] = [];

    for (let i = 10; i > 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      lastTenDays.push(date);
    }

    return lastTenDays;
  }

  isMatchingDate(healthDate: any, targetDate: Date): boolean {
    const healthCheckDate = new Date(healthDate);
    return (
      healthCheckDate.getFullYear() === targetDate.getFullYear() &&
      healthCheckDate.getMonth() === targetDate.getMonth() &&
      healthCheckDate.getDate() === targetDate.getDate()
    );
  }
  
  hasMatchingProcess(etatProcessusMetierList: any[], processTitre: string): boolean {
    return etatProcessusMetierList.some(
      (etat: any) => etat.processusMetier.titre === processTitre
    );
  }
  ngOnInit(): void {
    this.listHealt = new Array<HealthChekPreprodProd>();
    this.listProcess= new Array<ProcessusMetier>();
    if (this.User.roles[0].name == 'ROLE_PILOTE') {
    this.healthService.FindLast10HealthCheck().subscribe((data)=>{
      // @ts-ignore
      this.listHealt = data.body;   
    });
    this.processService.FindAllProcessusMetierPilote().subscribe((data)=>{
      // @ts-ignore
      this.listProcess = data.body;   
    });
  } else{
    this.healthService.FindLast10HealthCheckRespo().subscribe((data)=>{
      // @ts-ignore
      this.listHealt = data.body;   
    });
    this.processService.FindAllProcessusMetierRespo().subscribe((data)=>{
      // @ts-ignore
      this.listProcess = data.body;   
    });
  }
  }

  get User(): User {
    return this.authService.User;
  }
  set User(value: User) {
    this.authService.User = value;
  }

  get charteHealthCheckPreprodProd(): boolean {
    return this.charteService.charteHealthCheckPreprodProd;
  }

  set charteHealthCheckPreprodProd(value: boolean) {
    this.charteService.charteHealthCheckPreprodProd = value;
  }
  get AddHealthCheck(): HealthChekPreprodProd{
    return this.healthService.AddHealthCheck;
  }

  set AddHealthCheck(value: HealthChekPreprodProd) {
    this.healthService.AddHealthCheck = value;
  }
}
