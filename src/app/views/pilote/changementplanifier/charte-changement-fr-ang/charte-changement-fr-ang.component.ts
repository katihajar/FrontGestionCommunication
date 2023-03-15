import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Moment } from 'moment';
import { ChangementPlanifier } from 'src/app/controller/model/changement-planifier';
import { ChangementService } from 'src/app/controller/service/changement.service';
import { CharteService } from 'src/app/controller/service/charte.service';


@Component({
  selector: 'app-charte-changement-fr-ang',
  templateUrl: './charte-changement-fr-ang.component.html',
  styleUrls: ['./charte-changement-fr-ang.component.scss']
})
export class CharteChangementFrAngComponent implements OnInit {
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private changeService: ChangementService, private charte: CharteService) {
   }
  
  ngOnInit(): void {
  }
 
  get charteChangeAngFr(): boolean {
    return this.charte.charteChangeAngFr;
  }
  
  set charteChangeAngFr(value: boolean) {
    this.charte.charteChangeAngFr = value;
  }
  get AddChangement(): ChangementPlanifier {
    return this.changeService.AddChangement;
  }

  set AddChangement(value: ChangementPlanifier) {
    this.changeService.AddChangement = value;
  }
  get AddChangementAng(): ChangementPlanifier {
    return this.changeService.AddChangementAng;
  }

  set AddChangementAng(value: ChangementPlanifier) {
    this.changeService.AddChangementAng = value;
  }
}
