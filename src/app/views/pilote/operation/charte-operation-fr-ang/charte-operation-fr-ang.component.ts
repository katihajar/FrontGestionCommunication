import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Operation } from 'src/app/controller/model/operation';
import { CharteService } from 'src/app/controller/service/charte.service';
import { OperationService } from 'src/app/controller/service/operation.service';

@Component({
  selector: 'app-charte-operation-fr-ang',
  templateUrl: './charte-operation-fr-ang.component.html',
  styleUrls: ['./charte-operation-fr-ang.component.scss']
})
export class CharteOperationFrAngComponent implements OnInit {
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private operationService: OperationService,private charte: CharteService,
    private router:Router) { }

  ngOnInit(): void {
  }
  get AddOperation(): Operation{
    return this.operationService.AddOperation;
  }

  set AddOperation(value: Operation) {
    this.operationService.AddOperation = value;
  }
  get AddOperationAng(): Operation{
    return this.operationService.AddOperationAng;
  }

  set AddOperationAng(value: Operation) {
    this.operationService.AddOperationAng = value;
  }
  get charteOperationAngFr(): boolean {
    return this.charte.charteOperationAngFr;
  }

  set charteOperationAngFr(value: boolean) {
    this.charte.charteOperationAngFr = value;
  }

}
