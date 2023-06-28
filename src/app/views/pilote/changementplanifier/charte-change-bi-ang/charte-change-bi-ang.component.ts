import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChangementPlanifier } from 'src/app/controller/model/changement-planifier';
import { ChangementService } from 'src/app/controller/service/changement.service';
import { CharteService } from 'src/app/controller/service/charte.service';

@Component({
  selector: 'app-charte-change-bi-ang',
  templateUrl: './charte-change-bi-ang.component.html',
  styleUrls: ['./charte-change-bi-ang.component.css']
})
export class CharteChangeBiAngComponent {
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private changeService: ChangementService, private charte: CharteService) { }

  ngOnInit(): void {
  }
  get charteChangeBiAng(): boolean {
    return this.charte.charteChangeBiAng;
  }
  
  set charteChangeBiAng(value: boolean) {
    this.charte.charteChangeBiAng = value;
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
