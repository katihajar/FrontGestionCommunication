import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChangementPlanifier } from 'src/app/controller/model/changement-planifier';
import { Operation } from 'src/app/controller/model/operation';
import { ChangementService } from 'src/app/controller/service/changement.service';
import { CharteService } from 'src/app/controller/service/charte.service';
import { OperationService } from 'src/app/controller/service/operation.service';

@Component({
  selector: 'app-charte-operation-fr-ang',
  templateUrl: './charte-operation-fr-ang.component.html',
  styleUrls: ['./charte-operation-fr-ang.component.scss']
})
export class CharteOperationFrAngComponent implements OnInit {
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private changeService: ChangementService,private charte: CharteService,
    private router:Router) { }

  ngOnInit(): void {
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
  get charteOperationAngFr(): boolean {
    return this.charte.charteOperationAngFr;
  }

  set charteOperationAngFr(value: boolean) {
    this.charte.charteOperationAngFr = value;
  }

}
