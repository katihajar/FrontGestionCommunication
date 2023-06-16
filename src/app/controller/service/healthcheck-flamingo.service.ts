import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HealthCheckFlamingo } from '../model/health-check-flamingo';
import { Observable } from 'rxjs';
import { FluxEAI } from '../model/flux-eai';
import { FluxSalesOrder } from '../model/flux-sales-order';
import { FluxSapEurope } from '../model/flux-sap-europe';
import { FluxSapHarmonie } from '../model/flux-sap-harmonie';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HealthcheckFlamingoService {

  private urlPilote = environment.baseUrlPilote;
  private urlRespo = environment.baseUrlResponsable;
  private _ListHealthCheck: Array<HealthCheckFlamingo> = new Array<HealthCheckFlamingo>();
  private _AddHealthCheck: HealthCheckFlamingo = new HealthCheckFlamingo();
  constructor(private http: HttpClient,private auth: AuthService) { }
  get AddHealthCheck(): HealthCheckFlamingo{
    if(this._AddHealthCheck == null){
      this._AddHealthCheck = new HealthCheckFlamingo();
    }
    return this._AddHealthCheck;
  }

  set AddHealthCheck(value: HealthCheckFlamingo) {
    this._AddHealthCheck = value;
  }

  get ListHealthCheck(): Array<HealthCheckFlamingo>{
    if(this._ListHealthCheck == null){
      this._ListHealthCheck = new Array<HealthCheckFlamingo>();
    }
    return this._ListHealthCheck;
  }

  set ListHealthCheck(value: Array<HealthCheckFlamingo>) {
    this._ListHealthCheck = value;
  }
  public SaveHealthCheck(): Observable<HttpResponse<HealthCheckFlamingo>> {    
    this.AddHealthCheck.createurHealthCheckFlamingo = this.auth.User;
    console.log('akher save '+this.AddHealthCheck);
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.post<HealthCheckFlamingo>(
      this.urlPilote + 'healthcheck/flamingo/save',this.AddHealthCheck,
      { observe: 'response', headers }
    );    
  }

  public FindHealthCheckByPilote(page: number, pageSize: number): Observable<HttpResponse<Array<HealthCheckFlamingo>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlPilote + 'healthcheck/flamingo/lot/' + this.auth.User.lots;
    const params = new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString());
    return this.http.get<Array<HealthCheckFlamingo>>(url, { observe: 'response', headers, params }); 
  }
  public FindFluxEAIByHealthCheck(id:number): Observable<HttpResponse<Array<FluxEAI>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<FluxEAI>>(
      this.urlPilote + 'healthcheck/fluxEAI/flux/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindFluxSalesOrderEAIByHealthCheck(id:number): Observable<HttpResponse<Array<FluxSalesOrder>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<FluxSalesOrder>>(
      this.urlPilote + 'healthcheck/fluxSalesOrder/flux/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindFluxSapEuropeByHealthCheck(id:number): Observable<HttpResponse<Array<FluxSapEurope>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<FluxSapEurope>>(
      this.urlPilote + 'healthcheck/fluxSapEurope/flux/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindFluxSapHarmonieByHealthCheck(id:number): Observable<HttpResponse<Array<FluxSapHarmonie>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<FluxSapHarmonie>>(
      this.urlPilote + 'healthcheck/fluxSapHarmonie/flux/'+id,
      { observe: 'response', headers }
    );    
  }
  public DeleteHealthCheck(id:number): Observable<HttpResponse<number>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.delete<number>(
      this.urlPilote + 'healthcheck/flamingo/delete/'+id,
      { observe: 'response', headers }
    );    
  }
  public SearchHealth(dateFlux: Date | null, health: HealthCheckFlamingo, page: number, pageSize: number): Observable<HttpResponse<Array<HealthCheckFlamingo>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlPilote + 'healthcheck/flamingo/searchHealth';
  
    let params = new HttpParams()
      .set('titre', health.titre)
      .set('lot', this.auth.User.lots)
      .set('page', page.toString())
      .set('size', pageSize.toString());

    
  if (dateFlux) {
    const formattedDateDebut = moment(dateFlux).format('YYYY-MM-DD');
    params = params.set('dateFlux', formattedDateDebut);
  }
  
    return this.http.get<Array<HealthCheckFlamingo>>(url, { observe: 'response', headers, params });
  }
}
