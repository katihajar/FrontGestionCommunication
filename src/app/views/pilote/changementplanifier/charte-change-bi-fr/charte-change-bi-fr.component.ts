import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChangementPlanifier } from 'src/app/controller/model/changement-planifier';
import { ChangementService } from 'src/app/controller/service/changement.service';
import { CharteService } from 'src/app/controller/service/charte.service';

@Component({
  selector: 'app-charte-change-bi-fr',
  templateUrl: './charte-change-bi-fr.component.html',
  styleUrls: ['./charte-change-bi-fr.component.css']
})
export class CharteChangeBiFrComponent {
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private changeService: ChangementService, private charte: CharteService) { }

  ngOnInit(): void {
  }
  
  get charteChangeBiFr(): boolean {
    return this.charte.charteChangeBiFr;
  }
  
  set charteChangeBiFr(value: boolean) {
    this.charte.charteChangeBiFr = value;
  }
  get AddChangement(): ChangementPlanifier {
    return this.changeService.AddChangement;
  }

  set AddChangement(value: ChangementPlanifier) {
    this.changeService.AddChangement = value;
  }

}
