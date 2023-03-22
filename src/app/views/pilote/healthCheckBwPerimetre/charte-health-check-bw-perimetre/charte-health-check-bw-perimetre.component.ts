import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HealthCheckBwPerimetre } from 'src/app/controller/model/health-check-bw-perimetre';
import { CharteService } from 'src/app/controller/service/charte.service';
import { HealthCheckBwPerimetreService } from 'src/app/controller/service/health-check-bw-perimetre.service';

@Component({
  selector: 'app-charte-health-check-bw-perimetre',
  templateUrl: './charte-health-check-bw-perimetre.component.html',
  styleUrls: ['./charte-health-check-bw-perimetre.component.scss']
})
export class CharteHealthCheckBwPerimetreComponent implements OnInit {

  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private charteService: CharteService,private healthService: HealthCheckBwPerimetreService) { }


  ngOnInit(): void {
  }
  get charteHealthCheckBw(): boolean {
    return this.charteService.charteHealthCheckBw;
  }

  set charteHealthCheckBw(value: boolean) {
    this.charteService.charteHealthCheckBw = value;
  }
  get AddHealthCheckBw(): HealthCheckBwPerimetre{
    return this.healthService.AddHealthCheckBw;
  }

  set AddHealthCheckBw(value: HealthCheckBwPerimetre) {
    this.healthService.AddHealthCheckBw = value;
  }
}
