import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Application } from '../model/application';
import { EtatProcessusMetier } from '../model/etat-processus-metier';
import { HealthChekPreprodProd } from '../model/health-chek-preprod-prod';
import { HealthChekPreprodProdDetail } from '../model/health-chek-preprod-prod-detail';
import { ProcessusMetier } from '../model/processus-metier';
import { AuthService } from './auth.service';
import { StatutApplication } from '../model/statut-application';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {

  private urlPilote = environment.baseUrlPilote;
  private urlRespo = environment.baseUrlResponsable;
  private _ListHealthCheck: Array<HealthChekPreprodProd> = new Array<HealthChekPreprodProd>();
  private _AddHealthCheck: HealthChekPreprodProd = new HealthChekPreprodProd();
  private _ListHealthDetail = new Array<HealthChekPreprodProdDetail>();
  private _ListEtatProcess = new Array<EtatProcessusMetier>();
  private _ListApp = new Array<Application>();
  constructor(private http: HttpClient,private auth: AuthService) { }


  get ListApp(): Array<Application>{
    if(this._ListApp == null){
      this._ListApp = new Array<Application>();
    }
    return this._ListApp;
  }

  set ListApp(value: Array<Application>) {
    this._ListApp = value;
  }




  get AddHealthCheck(): HealthChekPreprodProd{
    if(this._AddHealthCheck == null){
      this._AddHealthCheck = new HealthChekPreprodProd();
    }
    return this._AddHealthCheck;
  }

  set AddHealthCheck(value: HealthChekPreprodProd) {
    this._AddHealthCheck = value;
  }

  get ListEtatProcess(): Array<EtatProcessusMetier>{
    if(this._ListEtatProcess == null){
      this._ListEtatProcess = new Array<EtatProcessusMetier>();
    }
    return this._ListEtatProcess;
  }

  set ListEtatProcess(value: Array<EtatProcessusMetier>) {
    this._ListEtatProcess = value;
  }


  get ListHealthDetail(): Array<HealthChekPreprodProdDetail>{
    if(this._ListHealthDetail == null){
      this._ListHealthDetail = new Array<HealthChekPreprodProdDetail>();
    }
    return this._ListHealthDetail;
  }

  set ListHealthDetail(value: Array<HealthChekPreprodProdDetail>) {
    this._ListHealthDetail = value;
  }

  get ListHealthCheck(): Array<HealthChekPreprodProd>{
    if(this._ListHealthCheck == null){
      this._ListHealthCheck = new Array<HealthChekPreprodProd>();
    }
    return this._ListHealthCheck;
  }

  set ListHealthCheck(value: Array<HealthChekPreprodProd>) {
    this._ListHealthCheck = value;
  }

  public FindHealthCheckByPilote(): Observable<HttpResponse<Array<HealthChekPreprodProd>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<HealthChekPreprodProd>>(
      this.urlPilote + 'healthcheck/lot/'+this.auth.User.lots,
      { observe: 'response', headers }
    );    
  }

  public SaveHealthCheck(): Observable<HttpResponse<HealthChekPreprodProd>> {
    this.AddHealthCheck.createurHealthChekPreprodProd = this.auth.User;
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.post<HealthChekPreprodProd>(
      this.urlPilote + 'healthcheck/save',this.AddHealthCheck,
      { observe: 'response', headers }
    );    
  }
  public FindDetailByHealthCheck(id:number): Observable<HttpResponse<Array<HealthChekPreprodProdDetail>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<HealthChekPreprodProdDetail>>(
      this.urlPilote + 'healthcheckdetail/health/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindStatutAppByHealthCheck(id:number): Observable<HttpResponse<Array<StatutApplication>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<StatutApplication>>(
      this.urlPilote + 'statutapp/statutapp/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindEtatProcessusByHealthCheck(id:number): Observable<HttpResponse<Array<EtatProcessusMetier>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<EtatProcessusMetier>>(
      this.urlPilote + 'etatprocessus/etatprocessus/'+id,
      { observe: 'response', headers }
    );    
  }
  public DeleteHealthCheck(id:number): Observable<HttpResponse<number>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.delete<number>(
      this.urlPilote + 'healthcheck/delete/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindAllProcessusMetier(): Observable<HttpResponse<Array<ProcessusMetier>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<ProcessusMetier>>(
      this.urlPilote + 'processusmetier/findAll',
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
  public FindApplcationHealthPilotByLots(): Observable<HttpResponse<Array<Application>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Application>>(
      this.urlPilote + 'application/lot/'+this.auth.User.lots,
      { observe: 'response', headers }
    );    
  }
  public FindAllHealthCheck(): Observable<HttpResponse<Array<HealthChekPreprodProd>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<HealthChekPreprodProd>>(
      this.urlPilote + 'healthcheck/findAll',
      { observe: 'response', headers }
    );    
  }
  public FindLast10HealthCheck(): Observable<HttpResponse<Array<HealthChekPreprodProd>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<HealthChekPreprodProd>>(
      this.urlPilote + 'healthcheck/last10/'+this.auth.User.lots,
      { observe: 'response', headers }
    );    
  }
  public FindLast10HealthCheckRespo(): Observable<HttpResponse<Array<HealthChekPreprodProd>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<HealthChekPreprodProd>>(
      this.urlRespo + 'healthcheck/last10/'+this.auth.User.lots,
      { observe: 'response', headers }
    );    
  }
}
