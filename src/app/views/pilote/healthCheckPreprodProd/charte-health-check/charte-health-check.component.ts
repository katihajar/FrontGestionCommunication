import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Application } from 'src/app/controller/model/application';
import { HealthChekPreprodProd } from 'src/app/controller/model/health-chek-preprod-prod';
import { CharteService } from 'src/app/controller/service/charte.service';
import { HealthCheckService } from 'src/app/controller/service/health-check.service';

@Component({
  selector: 'app-charte-health-check',
  templateUrl: './charte-health-check.component.html',
  styleUrls: ['./charte-health-check.component.scss']
})
export class CharteHealthCheckComponent implements OnInit {
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  ListApp: Array<Application>=new Array<Application>();
  constructor(private charteService: CharteService,private healthService: HealthCheckService) { }

  ngOnInit(): void {
    this.FindApp();
  }
  FindApp(){
    this.healthService.FindApp().subscribe((data)=>{
      // @ts-ignore
      this.ListApp= data.body;
    })
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
