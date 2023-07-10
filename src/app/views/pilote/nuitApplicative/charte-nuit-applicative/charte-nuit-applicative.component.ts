import { Component, ElementRef, ViewChild } from '@angular/core';
import { NuitApplicative } from 'src/app/controller/model/nuit-applicative';
import { AuthService } from 'src/app/controller/service/auth.service';
import { CharteService } from 'src/app/controller/service/charte.service';
import { NuitApplicativeService } from 'src/app/controller/service/nuit-applicative.service';

@Component({
  selector: 'app-charte-nuit-applicative',
  templateUrl: './charte-nuit-applicative.component.html',
  styleUrls: ['./charte-nuit-applicative.component.scss']
})
export class CharteNuitApplicativeComponent {
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private authService: AuthService,private charteService: CharteService,private nuitService: NuitApplicativeService) { }
  
  get charteNuitApplicative(): boolean {
    return this.charteService.charteNuitApplicative;
  }
  set charteNuitApplicative(value: boolean) {
    this.charteService.charteNuitApplicative = value;
  }
  get AddNuitApplicative(): NuitApplicative{
    return this.nuitService.AddNuitApplicative;
  }
  set AddNuitApplicative(value: NuitApplicative) {
    this.nuitService.AddNuitApplicative = value;
  }
}
