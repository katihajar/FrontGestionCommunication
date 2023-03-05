import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharteService {
  private _charteIncident3BfrAng: boolean = false;

  constructor() { }

  get charteIncident3BfrAng(): boolean {
    return this._charteIncident3BfrAng;
  }

  set charteIncident3BfrAng(value: boolean) {
    this._charteIncident3BfrAng = value;
  }
}
