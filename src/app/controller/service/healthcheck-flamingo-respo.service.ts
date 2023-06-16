import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FluxEAI } from '../model/flux-eai';
import { FluxSalesOrder } from '../model/flux-sales-order';
import { FluxSapEurope } from '../model/flux-sap-europe';
import { FluxSapHarmonie } from '../model/flux-sap-harmonie';
import { HealthCheckFlamingo } from '../model/health-check-flamingo';
import { AuthService } from './auth.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HealthcheckFlamingoRespoService {

  private urlRespo = environment.baseUrlResponsable;
  private _ListHealthCheck: Array<HealthCheckFlamingo> = new Array<HealthCheckFlamingo>();
  constructor(private http: HttpClient,private auth: AuthService) { }


  get ListHealthCheck(): Array<HealthCheckFlamingo>{
    if(this._ListHealthCheck == null){
      this._ListHealthCheck = new Array<HealthCheckFlamingo>();
    }
    return this._ListHealthCheck;
  }

  set ListHealthCheck(value: Array<HealthCheckFlamingo>) {
    this._ListHealthCheck = value;
  }

  public FindHealthCheckByRespo(page: number, pageSize: number): Observable<HttpResponse<Array<HealthCheckFlamingo>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlRespo + 'healthcheck/flamingo/lot/' + this.auth.User.lots;
    const params = new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString());
    return this.http.get<Array<HealthCheckFlamingo>>(url, { observe: 'response', headers, params }); 
  }
  public FindFluxEAIByHealthCheck(id:number): Observable<HttpResponse<Array<FluxEAI>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<FluxEAI>>(
      this.urlRespo + 'healthcheck/fluxEAI/flux/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindFluxSalesOrderEAIByHealthCheck(id:number): Observable<HttpResponse<Array<FluxSalesOrder>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<FluxSalesOrder>>(
      this.urlRespo + 'healthcheck/fluxSalesOrder/flux/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindFluxSapEuropeByHealthCheck(id:number): Observable<HttpResponse<Array<FluxSapEurope>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<FluxSapEurope>>(
      this.urlRespo + 'healthcheck/fluxSapEurope/flux/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindFluxSapHarmonieByHealthCheck(id:number): Observable<HttpResponse<Array<FluxSapHarmonie>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<FluxSapHarmonie>>(
      this.urlRespo + 'healthcheck/fluxSapHarmonie/flux/'+id,
      { observe: 'response', headers }
    );    
  }
  public SearchHealth(dateFlux: Date | null, health: HealthCheckFlamingo, page: number, pageSize: number): Observable<HttpResponse<Array<HealthCheckFlamingo>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlRespo + 'healthcheck/flamingo/searchHealth';
  
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
