import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChangementPlanifier } from 'src/app/controller/model/changement-planifier';
import { ChangementService } from 'src/app/controller/service/changement.service';
import { CharteService } from 'src/app/controller/service/charte.service';

@Component({
  selector: 'app-charte-changement-ang',
  templateUrl: './charte-changement-ang.component.html',
  styleUrls: ['./charte-changement-ang.component.scss']
})
export class CharteChangementAngComponent implements OnInit {
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private changeService: ChangementService, private charte: CharteService) { }

  ngOnInit(): void {
  }
  get charteChangeAng(): boolean {
    return this.charte.charteChangeAng;
  }
  
  set charteChangeAng(value: boolean) {
    this.charte.charteChangeAng = value;
  }
  

  get AddChangementAng(): ChangementPlanifier {
    return this.changeService.AddChangementAng;
  }

  set AddChangementAng(value: ChangementPlanifier) {
    this.changeService.AddChangementAng = value;
  }
  get AddChangement(): ChangementPlanifier {
    return this.changeService.AddChangement;
  }

  set AddChangement(value: ChangementPlanifier) {
    this.changeService.AddChangement = value;
  }
}
