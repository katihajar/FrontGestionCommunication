import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharteService {
  private _charteIncident3BfrAng: boolean = false;
  private _charteIncident3Bfr: boolean = false;
  private _charteIncident3BAng: boolean = false; 
   private _charteIncidentBIfrAng: boolean = false;
  private _charteIncidentBIfr: boolean = false;
  private _charteIncidentBIAng: boolean = false;
private _charteIncidentMonetic: boolean = false;
private _charteIncidentMoneticAng: boolean = false;
private _charteIncidentMoneticAngFr: boolean = false;
private _charteOperationAngFr: boolean = false;
private _charteOperationFr: boolean = false;
private _charteOperationAng: boolean = false;

private _charteChangeAngFr: boolean = false;
private _charteChangeFr: boolean = false;
private _charteChangeAng: boolean = false;
private _charteHealthCheckPreprodProd: boolean = false;
private _charteHealthCheckBw: boolean = false;
private _newcharteHealthCheckBw: boolean = false;
private _chartePointVersion: boolean = false;
private _charteHealthCheckFlamingo: boolean = false;
private _charteChangeBiAng: boolean = false;
private _charteChangeBiAngFr: boolean = false;
private _charteChangeBiFr: boolean = false;
private _charteNuitApplicative: boolean = false;
  constructor() { }
  get charteNuitApplicative(): boolean {
    return this._charteNuitApplicative;
  }

  set charteNuitApplicative(value: boolean) {
    this._charteNuitApplicative = value;
  }
  get charteChangeBiAng(): boolean {
    return this._charteChangeBiAng;
  }

  set charteChangeBiAng(value: boolean) {
    this._charteChangeBiAng = value;
  }

  get charteChangeBiFr(): boolean {
    return this._charteChangeBiFr;
  }

  set charteChangeBiFr(value: boolean) {
    this._charteChangeBiFr = value;
  }

  get charteChangeBiAngFr(): boolean {
    return this._charteChangeBiAngFr;
  }

  set charteChangeBiAngFr(value: boolean) {
    this._charteChangeBiAngFr = value;
  }


  get newcharteHealthCheckBw(): boolean {
    return this._newcharteHealthCheckBw;
  }

  set newcharteHealthCheckBw(value: boolean) {
    this._newcharteHealthCheckBw = value;
  }
  get charteHealthCheckFlamingo(): boolean {
    return this._charteHealthCheckFlamingo;
  }

  set charteHealthCheckFlamingo(value: boolean) {
    this._charteHealthCheckFlamingo = value;
  }
  get chartePointVersion(): boolean {
    return this._chartePointVersion;
  }

  set chartePointVersion(value: boolean) {
    this._chartePointVersion = value;
  }
  get charteHealthCheckBw(): boolean {
    return this._charteHealthCheckBw;
  }

  set charteHealthCheckBw(value: boolean) {
    this._charteHealthCheckBw = value;
  }
  
  get charteHealthCheckPreprodProd(): boolean {
    return this._charteHealthCheckPreprodProd;
  }

  set charteHealthCheckPreprodProd(value: boolean) {
    this._charteHealthCheckPreprodProd = value;
  }

  get charteChangeAng(): boolean {
    return this._charteChangeAng;
  }

  set charteChangeAng(value: boolean) {
    this._charteChangeAng = value;
  }

  get charteChangeFr(): boolean {
    return this._charteChangeFr;
  }

  set charteChangeFr(value: boolean) {
    this._charteChangeFr = value;
  }

  get charteChangeAngFr(): boolean {
    return this._charteChangeAngFr;
  }

  set charteChangeAngFr(value: boolean) {
    this._charteChangeAngFr = value;
  }

  get charteOperationAng(): boolean {
    return this._charteOperationAng;
  }

  set charteOperationAng(value: boolean) {
    this._charteOperationAng = value;
  }

  get charteOperationAngFr(): boolean {
    return this._charteOperationAngFr;
  }

  set charteOperationAngFr(value: boolean) {
    this._charteOperationAngFr = value;
  }

  get charteOperationFr(): boolean {
    return this._charteOperationFr;
  }

  set charteOperationFr(value: boolean) {
    this._charteOperationFr = value;
  }



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

  get charteIncidentBIfrAng(): boolean {
    return this._charteIncidentBIfrAng;
  }

  set charteIncidentBIfrAng(value: boolean) {
    this._charteIncidentBIfrAng = value;
  }
  get charteIncidentBIAng(): boolean {
    return this._charteIncidentBIAng;
  }

  set charteIncidentBIAng(value: boolean) {
    this._charteIncidentBIAng = value;
  }

  get charteIncidentBIfr(): boolean {
    return this._charteIncidentBIfr;
  }

  set charteIncidentBIfr(value: boolean) {
    this._charteIncidentBIfr = value;
  }
}
