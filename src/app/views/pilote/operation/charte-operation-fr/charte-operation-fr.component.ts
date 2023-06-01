import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChangementPlanifier } from 'src/app/controller/model/changement-planifier';
import { Operation } from 'src/app/controller/model/operation';
import { ChangementService } from 'src/app/controller/service/changement.service';
import { CharteService } from 'src/app/controller/service/charte.service';
import { OperationService } from 'src/app/controller/service/operation.service';

@Component({
  selector: 'app-charte-operation-fr',
  templateUrl: './charte-operation-fr.component.html',
  styleUrls: ['./charte-operation-fr.component.scss']
})
export class CharteOperationFrComponent implements OnInit {
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private changeService: ChangementService,private charte:CharteService,
    private router:Router) { }


  ngOnInit(): void {
  }

  get AddChangement(): ChangementPlanifier {
    return this.changeService.AddChangement;
  }

  set AddChangement(value: ChangementPlanifier) {
    this.changeService.AddChangement = value;
  }
  get charteOperationFr(): boolean {
    return this.charte.charteOperationFr;
  }

  set charteOperationFr(value: boolean) {
    this.charte.charteOperationFr = value;
  }
}
