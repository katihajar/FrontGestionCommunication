import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Incident } from '../model/incident';
import { PlanAction } from '../model/plan-action';
import { AuthService } from './auth.service';
import {Observable} from "rxjs";
import { MsalService } from '@azure/msal-angular';
import { Application } from '../model/application';
import * as moment from 'moment';

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


  constructor(private http: HttpClient,private auth: AuthService,private authService: MsalService) { }

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
  public FindAllIncident(): Observable<HttpResponse<Array<Incident>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Incident>>(
      this.urlPilote + 'incident/findAll',
      { observe: 'response', headers }
    );    
  }
  // public FindIncidentByPilote(): Observable<HttpResponse<Array<Incident>>> {
  //   const headers: HttpHeaders = this.auth.tokenHeaders();
  //   return this.http.get<Array<Incident>>(
  //     this.urlPilote + 'incident/lot/'+this.auth.User.lots,
  //     { observe: 'response', headers }
  //   );    
  // }
  public FindIncidentByPilote(page: number, pageSize: number): Observable<HttpResponse<Array<Incident>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlPilote + 'incident/lot/' + this.auth.User.lots;
    const params = new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString());
    return this.http.get<Array<Incident>>(url, { observe: 'response', headers, params });
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

  public SearchInci(dateDebut: Date | null, dateFin: Date | null, inc: Incident, page: number, pageSize: number): Observable<HttpResponse<Array<Incident>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlPilote + 'incident/searchIncident';
  
    let params = new HttpParams()
      .set('titre', inc.titreIncident)
      .set('statut', inc.statut)
      .set('desc', inc.description)
      .set('lot', this.auth.User.lots)
      .set('page', page.toString())
      .set('size', pageSize.toString());
  if(inc.application){    
    params = params.set('applicationId', inc.application.id)

  }
  if (dateDebut) {
    const formattedDateDebut = moment(dateDebut).format('YYYY-MM-DD');
    params = params.set('dateDebut', formattedDateDebut);
  }
  
  if (dateFin) {
    const formattedDateFin =moment(dateFin).format('YYYY-MM-DD');// Extract date part  
    params = params.set('dateFin', formattedDateFin);
  }
    return this.http.get<Array<Incident>>(url, { observe: 'response', headers, params });
  }
  

  







}
  

