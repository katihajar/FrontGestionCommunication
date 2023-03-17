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
  private _AddIncident: Incident = new Incident();
  private _AddIncidentAng: Incident = new Incident();
  private _ListPlanAction = new Array<PlanAction>();
  private _ListPlanActionAng = new Array<PlanAction>();
  constructor(private http: HttpClient,private auth: AuthService) { }

  get ListPlanActionAng(): Array<PlanAction>{
    if(this._ListPlanActionAng == null){
      this._ListPlanActionAng = new Array<PlanAction>();
    }
    return this._ListPlanActionAng;
  }

  set ListPlanActionAng(value: Array<PlanAction>) {
    this._ListPlanActionAng = value;
  }

  get ListPlanAction(): Array<PlanAction>{
    if(this._ListPlanAction == null){
      this._ListPlanAction = new Array<PlanAction>();
    }
    return this._ListPlanAction;
  }

  set ListPlanAction(value: Array<PlanAction>) {
    this._ListPlanAction = value;
  }

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

  public FindIncidentByPilote(): Observable<HttpResponse<Array<Incident>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Incident>>(
      this.urlPilote + 'incident/user/'+this.auth.User.username,
      { observe: 'response', headers }
    );    
  }

  public SaveIncident(): Observable<HttpResponse<Incident>> {
    this.AddIncident.createurIncident = this.auth.User;
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.post<Incident>(
      this.urlPilote + 'incident/save',this.AddIncident,
      { observe: 'response', headers }
    );    
  }
  public FindPlanActionByIncident(id:number): Observable<HttpResponse<Array<PlanAction>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<PlanAction>>(
      this.urlPilote + 'planaction/incident/'+id,
      { observe: 'response', headers }
    );    
  }

  public DeleteIncident(id:number): Observable<HttpResponse<number>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.delete<number>(
      this.urlPilote + 'incident/delete/'+id,
      { observe: 'response', headers }
    );    
  }
}
