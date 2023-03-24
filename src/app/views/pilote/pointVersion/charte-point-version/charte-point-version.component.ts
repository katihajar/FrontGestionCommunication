import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PointVersion } from 'src/app/controller/model/point-version';
import { CharteService } from 'src/app/controller/service/charte.service';
import { PointVersionService } from 'src/app/controller/service/point-version.service';

@Component({
  selector: 'app-charte-point-version',
  templateUrl: './charte-point-version.component.html',
  styleUrls: ['./charte-point-version.component.scss']
})
export class ChartePointVersionComponent implements OnInit {
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private pointService: PointVersionService,private charteService:CharteService,private sanitizer: DomSanitizer,
    private router:Router) { }

  ngOnInit(): void {
console.log('hnaaa '+this.AddPointVersion.image);

  }
  get chartePointVersion(): boolean {
    return this.charteService.chartePointVersion;
  }

  set chartePointVersion(value: boolean) {
    this.charteService.chartePointVersion = value;
  }
  get AddPointVersion(): PointVersion {
    return this.pointService.AddPointVersion;
  }

  set AddPointVersion(value: PointVersion) {
    this.pointService.AddPointVersion = value;
  }
}
