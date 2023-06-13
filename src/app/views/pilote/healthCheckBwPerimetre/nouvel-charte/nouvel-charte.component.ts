import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HealthCheckBwPerimetre } from 'src/app/controller/model/health-check-bw-perimetre';
import { CharteService } from 'src/app/controller/service/charte.service';
import { HealthCheckBwPerimetreService } from 'src/app/controller/service/health-check-bw-perimetre.service';

@Component({
  selector: 'app-nouvel-charte',
  templateUrl: './nouvel-charte.component.html',
  styleUrls: ['./nouvel-charte.component.scss']
})
export class NouvelCharteComponent implements OnInit {
  size:number=0;
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private charteService: CharteService,private healthService: HealthCheckBwPerimetreService) { }


  ngOnInit(): void {
  }
  get newcharteHealthCheckBw(): boolean {
    return this.charteService.newcharteHealthCheckBw;
  }

  set newcharteHealthCheckBw(value: boolean) {
    this.charteService.newcharteHealthCheckBw = value;
  }
  get AddHealthCheckBw(): HealthCheckBwPerimetre{
    return this.healthService.AddHealthCheckBw;
  }

  set AddHealthCheckBw(value: HealthCheckBwPerimetre) {
    this.healthService.AddHealthCheckBw = value;
  }
}
