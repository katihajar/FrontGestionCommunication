import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharteService {
  private _charteIncident3BfrAng: boolean = false;
  private _charteIncident3Bfr: boolean = false;
  private _charteIncident3BAng: boolean = false;
private _charteIncidentMonetic: boolean = false;
private _charteIncidentMoneticAng: boolean = false;
private _charteIncidentMoneticAngFr: boolean = false;

  constructor() { }

  get charteIncidentMoneticAngFr(): boolean {
    return this._charteIncidentMoneticAngFr;
  }

  set charteIncidentMoneticAngFr(value: boolean) {
    this._charteIncidentMoneticAngFr = value;
  }

  get charteIncidentMoneticAng(): boolean {
    return this._charteIncidentMoneticAng;
  }

  set charteIncidentMoneticAng(value: boolean) {
    this._charteIncidentMoneticAng = value;
  }

  get charteIncidentMonetic(): boolean {
    return this._charteIncidentMonetic;
  }

  set charteIncidentMonetic(value: boolean) {
    this._charteIncidentMonetic = value;
  }
 
  get charteIncident3BfrAng(): boolean {
    return this._charteIncident3BfrAng;
  }

  set charteIncident3BfrAng(value: boolean) {
    this._charteIncident3BfrAng = value;
  }
  get charteIncident3BAng(): boolean {
    return this._charteIncident3BAng;
  }

  set charteIncident3BAng(value: boolean) {
    this._charteIncident3BAng = value;
  }

  get charteIncident3Bfr(): boolean {
    return this._charteIncident3Bfr;
  }

  set charteIncident3Bfr(value: boolean) {
    this._charteIncident3Bfr = value;
  }
}
