import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Operation } from 'src/app/controller/model/operation';
import { CharteService } from 'src/app/controller/service/charte.service';
import { OperationService } from 'src/app/controller/service/operation.service';

@Component({
  selector: 'app-charte-operation-fr',
  templateUrl: './charte-operation-fr.component.html',
  styleUrls: ['./charte-operation-fr.component.scss']
})
export class CharteOperationFrComponent implements OnInit {
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private operationService: OperationService,private charte:CharteService,
    private router:Router) { }


  ngOnInit(): void {
  }
  get AddOperation(): Operation{
    return this.operationService.AddOperation;
  }

  set AddOperation(value: Operation) {
    this.operationService.AddOperation = value;
  }
  get charteOperationFr(): boolean {
    return this.charte.charteOperationFr;
  }

  set charteOperationFr(value: boolean) {
    this.charte.charteOperationFr = value;
  }
}
