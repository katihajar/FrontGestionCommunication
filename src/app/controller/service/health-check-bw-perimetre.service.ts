import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HealthCheckBwPerimetre } from '../model/health-check-bw-perimetre';
import { HealthCheckBwPerimetreDetail } from '../model/health-check-bw-perimetre-detail';
import { Perimetre } from '../model/perimetre';
import { AuthService } from './auth.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckBwPerimetreService {

 
  private urlPilote = environment.baseUrlPilote;
  private urlRepo = environment.baseUrlResponsable;
  private urlAdmin = environment.baseUrlAdmin;
  private _ListHealthCheckBw: Array<HealthCheckBwPerimetre> = new Array<HealthCheckBwPerimetre>();
  private _AddHealthCheckBw: HealthCheckBwPerimetre = new HealthCheckBwPerimetre();
  private _ListHealthBwDetail = new Array<HealthCheckBwPerimetreDetail>();
  constructor(private http: HttpClient,private auth: AuthService) { }
  get AddHealthCheckBw(): HealthCheckBwPerimetre{
    if(this._AddHealthCheckBw == null){
      this._AddHealthCheckBw = new HealthCheckBwPerimetre();
    }
    return this._AddHealthCheckBw;
  }

  set AddHealthCheckBw(value: HealthCheckBwPerimetre) {
    this._AddHealthCheckBw = value;
  }

  get ListHealthCheckBw(): Array<HealthCheckBwPerimetre>{
    if(this._ListHealthCheckBw == null){
      this._ListHealthCheckBw = new Array<HealthCheckBwPerimetre>();
    }
    return this._ListHealthCheckBw;
  }

  set ListHealthCheckBw(value: Array<HealthCheckBwPerimetre>) {
    this._ListHealthCheckBw = value;
  }
  get ListHealthBwDetail(): Array<HealthCheckBwPerimetreDetail>{
    if(this._ListHealthBwDetail == null){
      this._ListHealthBwDetail = new Array<HealthCheckBwPerimetreDetail>();
    }
    return this._ListHealthBwDetail;
  }

  set ListHealthBwDetail(value: Array<HealthCheckBwPerimetreDetail>) {
    this._ListHealthBwDetail = value;
  }
  public FindAllHealthCheckBwPilote(): Observable<HttpResponse<Array<HealthCheckBwPerimetre>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<HealthCheckBwPerimetre>>(
      this.urlPilote + 'healthcheck/BIperimetre/findAll',
      { observe: 'response', headers }
    );    
  }
  public FindAllHealthCheckBwAdmin(): Observable<HttpResponse<Array<HealthCheckBwPerimetre>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<HealthCheckBwPerimetre>>(
      this.urlAdmin + 'healthcheck/BIperimetre/findAll',
      { observe: 'response', headers }
    );    
  }
  public FindAllHealthCheckBwRespo(): Observable<HttpResponse<Array<HealthCheckBwPerimetre>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<HealthCheckBwPerimetre>>(
      this.urlRepo + 'healthcheck/BIperimetre/findAll',
      { observe: 'response', headers }
    );    
  }

  public FindHealthCheckBwByPilote(page: number, pageSize: number): Observable<HttpResponse<Array<HealthCheckBwPerimetre>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlPilote + 'healthcheck/BIperimetre/lot/' + this.auth.User.lots;
    const params = new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString());
    return this.http.get<Array<HealthCheckBwPerimetre>>(url, { observe: 'response', headers, params }); 
  }
  
  public SaveHealthCheck(): Observable<HttpResponse<HealthCheckBwPerimetre>> {
    this.AddHealthCheckBw.createurHealthCheckBwPerimetre = this.auth.User;
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.post<HealthCheckBwPerimetre>(
      this.urlPilote + 'healthcheck/BIperimetre/save',this.AddHealthCheckBw,
      { observe: 'response', headers }
    );    
  }
  public FindDetailByHealthCheckBw(id:number): Observable<HttpResponse<Array<HealthCheckBwPerimetreDetail>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<HealthCheckBwPerimetreDetail>>(
      this.urlPilote + 'healthcheckdetail/bwperimetre/health/'+id,
      { observe: 'response', headers }
    );    
  }

  public DeleteHealthCheckBw(id:number): Observable<HttpResponse<number>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.delete<number>(
      this.urlPilote + 'healthcheck/BIperimetre/delete/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindAllPerimetre(): Observable<HttpResponse<Array<Perimetre>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Perimetre>>(
      this.urlPilote + 'perimetre/findAll',
      { observe: 'response', headers }
    );    
  }
  public SearchHealth(dateAjout: Date | null, health: HealthCheckBwPerimetre, page: number, pageSize: number): Observable<HttpResponse<Array<HealthCheckBwPerimetre>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlPilote + 'healthcheck/BIperimetre/searchHealth';
  
    let params = new HttpParams()
      .set('titre', health.titre)
      .set('lot', this.auth.User.lots)
      .set('page', page.toString())
      .set('size', pageSize.toString());

    
  if (dateAjout) {
    const formattedDateDebut = moment(dateAjout).format('YYYY-MM-DD');
    params = params.set('dateAjout', formattedDateDebut);
  }
  
    return this.http.get<Array<HealthCheckBwPerimetre>>(url, { observe: 'response', headers, params });
  }
}
