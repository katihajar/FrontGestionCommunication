import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HealthCheckBwPerimetre } from '../model/health-check-bw-perimetre';
import { HealthCheckBwPerimetreDetail } from '../model/health-check-bw-perimetre-detail';
import { Perimetre } from '../model/perimetre';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckBwPerimetreService {

 
  private urlPilote = environment.baseUrlPilote;
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

  public FindHealthCheckBwByPilote(): Observable<HttpResponse<Array<HealthCheckBwPerimetre>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<HealthCheckBwPerimetre>>(
      this.urlPilote + 'healthcheck/bwperimetre/lot/'+this.auth.User.lots,
      { observe: 'response', headers }
    );    
  }

  public SaveHealthCheck(): Observable<HttpResponse<HealthCheckBwPerimetre>> {
    this.AddHealthCheckBw.createurHealthCheckBwPerimetre = this.auth.User;
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.post<HealthCheckBwPerimetre>(
      this.urlPilote + 'healthcheck/bwperimetre/save',this.AddHealthCheckBw,
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
      this.urlPilote + 'healthcheck/bwperimetre/delete/'+id,
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
}
