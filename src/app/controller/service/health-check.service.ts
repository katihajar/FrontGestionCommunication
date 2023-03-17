import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EtatProcessusMetier } from '../model/etat-processus-metier';
import { HealthChekPreprodProd } from '../model/health-chek-preprod-prod';
import { HealthChekPreprodProdDetail } from '../model/health-chek-preprod-prod-detail';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {

  private urlPilote = environment.baseUrlPilote;
  private _ListHealthCheck: Array<HealthChekPreprodProd> = new Array<HealthChekPreprodProd>();
  private _AddHealthCheck: HealthChekPreprodProd = new HealthChekPreprodProd();
  private _ListHealthDetail = new Array<HealthChekPreprodProdDetail>();
  private _ListEtatProcess = new Array<EtatProcessusMetier>();
  constructor(private http: HttpClient,private auth: AuthService) { }


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
      this.urlPilote + 'healthcheck/user/'+this.auth.User.id,
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
}
