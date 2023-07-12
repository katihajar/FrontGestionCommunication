import { Injectable } from '@angular/core';
import { MonitoringOptirenta } from '../model/monitoring-optirenta';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Implants } from '../model/implants';
import { TransactionHandbid } from '../model/transaction-handbid';
import { TransactionSmile } from '../model/transaction-smile';
import { AuthService } from './auth.service';
import { FluxOptirenta } from '../model/flux-optirenta';

@Injectable({
  providedIn: 'root'
})
export class MonitoringOptirentaService {
  private urlPilote = environment.baseUrlPilote;
  private urlRespo = environment.baseUrlResponsable;
  private _ListMonitoringOptirenta: Array<MonitoringOptirenta> = new Array<MonitoringOptirenta>();
  private _AddMonitoringOptirenta: MonitoringOptirenta = new MonitoringOptirenta();
  constructor(private http: HttpClient,private auth: AuthService) { }

  get ListMonitoringOptirenta(): Array<MonitoringOptirenta>{
    if(this._ListMonitoringOptirenta == null){
      this._ListMonitoringOptirenta = new Array<MonitoringOptirenta>();
    }
    return this._ListMonitoringOptirenta;
  }

  set ListMonitoringOptirenta(value: Array<MonitoringOptirenta>) {
    this._ListMonitoringOptirenta = value;
  }
  
  get AddMonitoringOptirenta(): MonitoringOptirenta{
    if(this._AddMonitoringOptirenta == null){
      this._AddMonitoringOptirenta = new MonitoringOptirenta();
    }
    return this._AddMonitoringOptirenta;
  }

  set AddMonitoringOptirenta(value: MonitoringOptirenta) {
    this._AddMonitoringOptirenta = value;
  }
  public FindMonitoringOptirentaByPilote(page: number, pageSize: number): Observable<HttpResponse<Array<MonitoringOptirenta>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlPilote + 'monitoringOptirenta/lot/' + this.auth.User.lots;
    const params = new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString());
    return this.http.get<Array<MonitoringOptirenta>>(url, { observe: 'response', headers, params }); 
  }
  public FindMonitoringOptirentaByRespo(page: number, pageSize: number): Observable<HttpResponse<Array<MonitoringOptirenta>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlRespo + 'monitoringOptirenta/lot/' + this.auth.User.lots;
    const params = new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString());
    return this.http.get<Array<MonitoringOptirenta>>(url, { observe: 'response', headers, params }); 
  }
  public SaveMonitoring(): Observable<HttpResponse<MonitoringOptirenta>> {
    this.AddMonitoringOptirenta.createurMonitoring = this.auth.User;
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.post<MonitoringOptirenta>(
      this.urlPilote + 'monitoringOptirenta/save',this.AddMonitoringOptirenta,
      { observe: 'response', headers }
    );    
  }
  public DeleteMonitoringOptirenta(id:number): Observable<HttpResponse<number>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.delete<number>(
      this.urlPilote + 'monitoringOptirenta/delete/'+id,
      { observe: 'response', headers }
    );    
  }
  public SearchMonitoring(dateAjout: Date | null, monitoring: MonitoringOptirenta, page: number, pageSize: number): Observable<HttpResponse<Array<MonitoringOptirenta>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlPilote + 'monitoringOptirenta/search';
  
    let params = new HttpParams()
      .set('titre', monitoring.titre)
      .set('lot', this.auth.User.lots)
      .set('page', page.toString())
      .set('size', pageSize.toString());

    
  if (dateAjout) {
    const formattedDateDebut = moment(dateAjout).format('YYYY-MM-DD');
    params = params.set('date', formattedDateDebut);
  }
  
    return this.http.get<Array<MonitoringOptirenta>>(url, { observe: 'response', headers, params });
  }
  public FindFluxOptirentaBymonitoring(id:number): Observable<HttpResponse<Array<FluxOptirenta>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<FluxOptirenta>>(
      this.urlPilote + 'fluxOptirenta/optirenta/'+id,
      { observe: 'response', headers }
    );    
  }

  public SearchRespo(dateAjout: Date | null, monitoring: MonitoringOptirenta, page: number, pageSize: number): Observable<HttpResponse<Array<MonitoringOptirenta>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlRespo + 'monitoringOptirenta/search';
  
    let params = new HttpParams()
      .set('titre', monitoring.titre)
      .set('lot', this.auth.User.lots)
      .set('page', page.toString())
      .set('size', pageSize.toString());

    
  if (dateAjout) {
    const formattedDateDebut = moment(dateAjout).format('YYYY-MM-DD');
    params = params.set('date', formattedDateDebut);
  }
  
    return this.http.get<Array<MonitoringOptirenta>>(url, { observe: 'response', headers, params });
  }
  public FindFluxOptirentaBymonitoringRespo(id:number): Observable<HttpResponse<Array<FluxOptirenta>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<FluxOptirenta>>(
      this.urlRespo + 'fluxOptirenta/optirenta/'+id,
      { observe: 'response', headers }
    );    
  }
}
