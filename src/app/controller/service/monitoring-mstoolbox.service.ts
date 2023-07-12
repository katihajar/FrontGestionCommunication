import { Injectable } from '@angular/core';
import { MonitoringMstoolbox } from '../model/monitoring-mstoolbox';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { TransactionSmile } from '../model/transaction-smile';
import { TransactionHandbid } from '../model/transaction-handbid';
import { Implants } from '../model/implants';

@Injectable({
  providedIn: 'root'
})
export class MonitoringMstoolboxService {
  private urlPilote = environment.baseUrlPilote;
  private urlRespo = environment.baseUrlResponsable;
  private _ListMonitoringMstoolbox: Array<MonitoringMstoolbox> = new Array<MonitoringMstoolbox>();
  private _AddMonitoringMstoolbox: MonitoringMstoolbox = new MonitoringMstoolbox();
  constructor(private http: HttpClient,private auth: AuthService) { }

  get ListMonitoringMstoolbox(): Array<MonitoringMstoolbox>{
    if(this._ListMonitoringMstoolbox == null){
      this._ListMonitoringMstoolbox = new Array<MonitoringMstoolbox>();
    }
    return this._ListMonitoringMstoolbox;
  }

  set ListMonitoringMstoolbox(value: Array<MonitoringMstoolbox>) {
    this._ListMonitoringMstoolbox = value;
  }
  
  get AddMonitoringMstoolbox(): MonitoringMstoolbox{
    if(this._AddMonitoringMstoolbox == null){
      this._AddMonitoringMstoolbox = new MonitoringMstoolbox();
    }
    return this._AddMonitoringMstoolbox;
  }

  set AddMonitoringMstoolbox(value: MonitoringMstoolbox) {
    this._AddMonitoringMstoolbox = value;
  }
  public FindMonitoringMstoolboxByPilote(page: number, pageSize: number): Observable<HttpResponse<Array<MonitoringMstoolbox>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlPilote + 'monitoringMstoolbox/lot/' + this.auth.User.lots;
    const params = new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString());
    return this.http.get<Array<MonitoringMstoolbox>>(url, { observe: 'response', headers, params }); 
  }
  public FindMonitoringMstoolboxByRespo(page: number, pageSize: number): Observable<HttpResponse<Array<MonitoringMstoolbox>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlRespo + 'monitoringMstoolbox/lot/' + this.auth.User.lots;
    const params = new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString());
    return this.http.get<Array<MonitoringMstoolbox>>(url, { observe: 'response', headers, params }); 
  }
  public SaveMonitoring(): Observable<HttpResponse<MonitoringMstoolbox>> {
    this.AddMonitoringMstoolbox.createurMonitoring = this.auth.User;
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.post<MonitoringMstoolbox>(
      this.urlPilote + 'monitoringMstoolbox/save',this.AddMonitoringMstoolbox,
      { observe: 'response', headers }
    );    
  }
  public DeleteMonitoringMstoolbox(id:number): Observable<HttpResponse<number>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.delete<number>(
      this.urlPilote + 'monitoringMstoolbox/delete/'+id,
      { observe: 'response', headers }
    );    
  }
  public SearchMonitoring(dateAjout: Date | null, monitoring: MonitoringMstoolbox, page: number, pageSize: number): Observable<HttpResponse<Array<MonitoringMstoolbox>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlPilote + 'monitoringMstoolbox/search';
  
    let params = new HttpParams()
      .set('titre', monitoring.titre)
      .set('lot', this.auth.User.lots)
      .set('page', page.toString())
      .set('size', pageSize.toString());

    
  if (dateAjout) {
    const formattedDateDebut = moment(dateAjout).format('YYYY-MM-DD');
    params = params.set('date', formattedDateDebut);
  }
  
    return this.http.get<Array<MonitoringMstoolbox>>(url, { observe: 'response', headers, params });
  }
  public FindTransactionSmileBymonitoring(id:number): Observable<HttpResponse<Array<TransactionSmile>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<TransactionSmile>>(
      this.urlPilote + 'transactionSmile/mstoolbox/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindTransactionHandbidBymonitoring(id:number): Observable<HttpResponse<Array<TransactionHandbid>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<TransactionHandbid>>(
      this.urlPilote + 'transactionHandbid/mstoolbox/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindImplantsBymonitoring(id:number): Observable<HttpResponse<Array<Implants>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Implants>>(
      this.urlPilote + 'implants/mstoolbox/'+id,
      { observe: 'response', headers }
    );    
  }
  public SearchRespo(dateAjout: Date | null, monitoring: MonitoringMstoolbox, page: number, pageSize: number): Observable<HttpResponse<Array<MonitoringMstoolbox>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlRespo + 'monitoringMstoolbox/search';
  
    let params = new HttpParams()
      .set('titre', monitoring.titre)
      .set('lot', this.auth.User.lots)
      .set('page', page.toString())
      .set('size', pageSize.toString());

    
  if (dateAjout) {
    const formattedDateDebut = moment(dateAjout).format('YYYY-MM-DD');
    params = params.set('date', formattedDateDebut);
  }
  
    return this.http.get<Array<MonitoringMstoolbox>>(url, { observe: 'response', headers, params });
  }
  public FindTransactionSmileBymonitoringRespo(id:number): Observable<HttpResponse<Array<TransactionSmile>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<TransactionSmile>>(
      this.urlRespo + 'transactionSmile/mstoolbox/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindTransactionHandbidBymonitoringRespo(id:number): Observable<HttpResponse<Array<TransactionHandbid>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<TransactionHandbid>>(
      this.urlRespo + 'transactionHandbid/mstoolbox/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindImplantsBymonitoringRespo(id:number): Observable<HttpResponse<Array<Implants>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Implants>>(
      this.urlRespo + 'implants/mstoolbox/'+id,
      { observe: 'response', headers }
    );    
  }
}
