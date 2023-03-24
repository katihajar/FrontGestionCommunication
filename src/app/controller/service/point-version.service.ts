import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Application } from '../model/application';
import { LivraisonCARM } from '../model/livraison-carm';
import { PlanningPointVersion } from '../model/planning-point-version';
import { PointVersion } from '../model/point-version';
import { Ticket } from '../model/ticket';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PointVersionService {
  private urlPilote = environment.baseUrlPilote;
  private _ListPointVersion: Array<PointVersion> = new Array<PointVersion>();
  private _AddPointVersion: PointVersion = new PointVersion();
  constructor(private http: HttpClient,private auth: AuthService) { }


  get AddPointVersion(): PointVersion{
    if(this._AddPointVersion == null){
      this._AddPointVersion = new PointVersion();
    }
    return this._AddPointVersion;
  }

  set AddPointVersion(value: PointVersion) {
    this._AddPointVersion = value;
  }

  get ListPointVersion(): Array<PointVersion>{
    if(this._ListPointVersion == null){
      this._ListPointVersion = new Array<PointVersion>();
    }
    return this._ListPointVersion;
  }

  set ListPointVersion(value: Array<PointVersion>) {
    this._ListPointVersion = value;
  }

  public FindPointVersionByPilote(): Observable<HttpResponse<Array<PointVersion>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<PointVersion>>(
      this.urlPilote + 'pointversion/user/'+this.auth.User.id,
      { observe: 'response', headers }
    );    
  }

  public SavePointVersion(select:File): Observable<HttpResponse<PointVersion>> {
    this.AddPointVersion.createurPointVersion = this.auth.User;
    const headers: HttpHeaders = this.auth.tokenHeaders2();
    const data: FormData=new FormData();
    const pointVersion = Object.assign({}, this.AddPointVersion); // create a copy of AddPointVersion
    const { id,createurPointVersion,application, ...pointVersionWithoutId } = pointVersion;
    data.append('file',select,select.name);
    data.append('pointVersion',JSON.stringify(pointVersionWithoutId));
    data.append('idApp', this.AddPointVersion.application.id.toString());
    data.append('idUser',this.AddPointVersion.createurPointVersion.id.toString());
    return this.http.post<PointVersion>(
      this.urlPilote + 'pointversion/save',data,
      { observe: 'response', headers }
    );    
  }
  public FindTicketByPointVersion(id:number): Observable<HttpResponse<Array<Ticket>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Ticket>>(
      this.urlPilote + 'ticket/pointversion/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindPlanningByPointVersion(id:number): Observable<HttpResponse<Array<PlanningPointVersion>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<PlanningPointVersion>>(
      this.urlPilote + 'planningpoint/pointversion/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindLivraisonByPointVersion(id:number): Observable<HttpResponse<Array<LivraisonCARM>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<LivraisonCARM>>(
      this.urlPilote + 'livraisoncarm/pointversion/'+id,
      { observe: 'response', headers }
    );    
  }
  public DeletePointVersion(id:number): Observable<HttpResponse<number>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.delete<number>(
      this.urlPilote + 'pointversion/delete/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindApp(): Observable<HttpResponse<Array<Application>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Application>>(
      this.urlPilote + 'application/AllApp',
      { observe: 'response', headers }
    );    
  }
}
