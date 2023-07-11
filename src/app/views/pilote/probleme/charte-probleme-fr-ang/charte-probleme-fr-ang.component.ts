import { Component, ElementRef, ViewChild } from '@angular/core';
import { Probleme } from 'src/app/controller/model/probleme';
import { CharteService } from 'src/app/controller/service/charte.service';
import { ProblemeService } from 'src/app/controller/service/probleme.service';

@Component({
  selector: 'app-charte-probleme-fr-ang',
  templateUrl: './charte-probleme-fr-ang.component.html',
  styleUrls: ['./charte-probleme-fr-ang.component.css']
})
export class CharteProblemeFrAngComponent {
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private problemeService: ProblemeService, private charte: CharteService) { }

  ngOnInit(): void {
  }
  get charteProblemefrAng(): boolean {
    return this.charte.charteProblemefrAng;
  }
  
  set charteProblemefrAng(value: boolean) {
    this.charte.charteProblemefrAng = value;
  }
  

  get AddProbleme(): Probleme {
    return this.problemeService.AddProbleme;
  }

  set AddProbleme(value: Probleme) {
    this.problemeService.AddProbleme = value;
  }
  get AddProblemeAng(): Probleme {
    return this.problemeService.AddProblemeAng;
  }

  set AddProblemeAng(value: Probleme) {
    this.problemeService.AddProblemeAng = value;
  }
}