import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharteService {
  private _charteIncident3BfrAng: boolean = false;
  private _charteIncident3Bfr: boolean = false;


  constructor() { }

  get charteIncident3BfrAng(): boolean {
    return this._charteIncident3BfrAng;
  }

  set charteIncident3BfrAng(value: boolean) {
    this._charteIncident3BfrAng = value;
  }

  get charteIncident3Bfr(): boolean {
    return this._charteIncident3Bfr;
  }

  set charteIncident3Bfr(value: boolean) {
    this._charteIncident3Bfr = value;
  }
}
