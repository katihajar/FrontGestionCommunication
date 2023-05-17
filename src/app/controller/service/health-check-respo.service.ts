import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Application } from '../model/application';
import { EtatProcessusMetier } from '../model/etat-processus-metier';
import { HealthChekPreprodProd } from '../model/health-chek-preprod-prod';
import { HealthChekPreprodProdDetail } from '../model/health-chek-preprod-prod-detail';
import { AuthService } from './auth.service';
import { StatutApplication } from '../model/statut-application';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckRespoService {
  private urlRespo = environment.baseUrlResponsable;
  private urlAdmin = environment.baseUrlAdmin;

  constructor(private http: HttpClient,private auth: AuthService) { }
  public FindHealthCheck(): Observable<HttpResponse<Array<HealthChekPreprodProd>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<HealthChekPreprodProd>>(
      this.urlRespo + 'healthcheck/lot/'+this.auth.User.lots,
      { observe: 'response', headers }
    );    
  }
  public FindAllHealthCheckRespo(): Observable<HttpResponse<Array<HealthChekPreprodProd>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<HealthChekPreprodProd>>(
      this.urlRespo + 'healthcheck/findAll',
      { observe: 'response', headers }
    );    
  }
  public FindAllHealthCheckAdmin(): Observable<HttpResponse<Array<HealthChekPreprodProd>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<HealthChekPreprodProd>>(
      this.urlAdmin + 'healthcheck/findAll',
      { observe: 'response', headers }
    );    
  }
  public FindDetailByHealthCheck(id:number): Observable<HttpResponse<Array<HealthChekPreprodProdDetail>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<HealthChekPreprodProdDetail>>(
      this.urlRespo + 'healthcheckdetail/health/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindStatutAppByHealthCheck(id:number): Observable<HttpResponse<Array<StatutApplication>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<StatutApplication>>(
      this.urlRespo + 'statutapp/statutapp/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindEtatProcessusByHealthCheck(id:number): Observable<HttpResponse<Array<EtatProcessusMetier>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<EtatProcessusMetier>>(
      this.urlRespo + 'etatprocessus/etatprocessus/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindApp(): Observable<HttpResponse<Array<Application>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Application>>(
      this.urlRespo + 'application/AllApp',
      { observe: 'response', headers }
    );    
  }
}
