import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Incident } from '../model/incident';
import { PlanAction } from '../model/plan-action';
import { AuthService } from './auth.service';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private urlPilote = environment.baseUrlPilote;
  private _ListIncidentOfPilote: Array<Incident> = new Array<Incident>();
  private _ListPlandActionIncident: Array<PlanAction> = new Array<PlanAction>();
  private _AddIncident: Incident = new Incident();
  private _AddIncidentAng: Incident = new Incident();
  constructor(private http: HttpClient,private auth: AuthService) { }
  get AddIncidentAng(): Incident{
    if(this._AddIncidentAng == null){
      this._AddIncidentAng = new Incident();
    }
    return this._AddIncidentAng;
  }

  set AddIncidentAng(value: Incident) {
    this._AddIncidentAng = value;
  }

  get AddIncident(): Incident{
    if(this._AddIncident == null){
      this._AddIncident = new Incident();
    }
    return this._AddIncident;
  }

  set AddIncident(value: Incident) {
    this._AddIncident = value;
  }


  get ListIncidentOfPilote(): Array<Incident>{
    if(this._ListIncidentOfPilote == null){
      this._ListIncidentOfPilote = new Array<Incident>();
    }
    return this._ListIncidentOfPilote;
  }

  set ListIncidentOfPilote(value: Array<Incident>) {
    this._ListIncidentOfPilote = value;
  }

  get ListPlandActionIncident(): Array<PlanAction>{
    if(this._ListPlandActionIncident == null){
      this._ListPlandActionIncident = new Array<PlanAction>();
    }
    return this._ListPlandActionIncident;
  }

  set ListPlandActionIncident(value: Array<PlanAction>) {
    this._ListPlandActionIncident = value;
  }

  public FindIncidentByPilote(): Observable<HttpResponse<Array<Incident>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Incident>>(
      this.urlPilote + 'incident/user/'+this.auth.User.username,
      { observe: 'response', headers }
    );    
  }
}
