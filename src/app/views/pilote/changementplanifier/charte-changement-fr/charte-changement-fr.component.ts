import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChangementPlanifier } from 'src/app/controller/model/changement-planifier';
import { ChangementService } from 'src/app/controller/service/changement.service';
import { CharteService } from 'src/app/controller/service/charte.service';

@Component({
  selector: 'app-charte-changement-fr',
  templateUrl: './charte-changement-fr.component.html',
  styleUrls: ['./charte-changement-fr.component.scss']
})
export class CharteChangementFrComponent implements OnInit {
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private changeService: ChangementService, private charte: CharteService) { }

  ngOnInit(): void {
  }
  
  get charteChangeFr(): boolean {
    return this.charte.charteChangeFr;
  }
  
  set charteChangeFr(value: boolean) {
    this.charte.charteChangeFr = value;
  }
  get AddChangement(): ChangementPlanifier {
    return this.changeService.AddChangement;
  }

  set AddChangement(value: ChangementPlanifier) {
    this.changeService.AddChangement = value;
  }

}
