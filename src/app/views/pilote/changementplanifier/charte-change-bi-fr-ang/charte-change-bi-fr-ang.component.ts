import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChangementPlanifier } from 'src/app/controller/model/changement-planifier';
import { ChangementService } from 'src/app/controller/service/changement.service';
import { CharteService } from 'src/app/controller/service/charte.service';

@Component({
  selector: 'app-charte-change-bi-fr-ang',
  templateUrl: './charte-change-bi-fr-ang.component.html',
  styleUrls: ['./charte-change-bi-fr-ang.component.css']
})
export class CharteChangeBiFrAngComponent {
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private changeService: ChangementService, private charte: CharteService) {
   }
  
  ngOnInit(): void {
  }
 
  get charteChangeBiAngFr(): boolean {
    return this.charte.charteChangeBiAngFr;
  }
  
  set charteChangeBiAngFr(value: boolean) {
    this.charte.charteChangeBiAngFr = value;
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
