import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Application } from '../model/application';
import { EtatProcessusMetier } from '../model/etat-processus-metier';
import { HealthChekPreprodProd } from '../model/health-chek-preprod-prod';
import { HealthChekPreprodProdDetail } from '../model/health-chek-preprod-prod-detail';
import { AuthService } from './auth.service';
import { StatutApplication } from '../model/statut-application';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckRespoService {
  private urlRespo = environment.baseUrlResponsable;
  private urlAdmin = environment.baseUrlAdmin;

  constructor(private http: HttpClient,private auth: AuthService) { }
  public FindHealthCheckByRespo(page: number, pageSize: number): Observable<HttpResponse<Array<HealthChekPreprodProd>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlRespo + 'healthcheck/lot/' + this.auth.User.lots;
    const params = new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString());
    return this.http.get<Array<HealthChekPreprodProd>>(url, { observe: 'response', headers, params }); 
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
  public SearchHealth(dateAjout: Date | null, health: HealthChekPreprodProd, page: number, pageSize: number): Observable<HttpResponse<Array<HealthChekPreprodProd>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlRespo + 'healthcheck/searchHealth';
  
    let params = new HttpParams()
      .set('titre', health.titre)
      .set('type', health.type)
      .set('lot', this.auth.User.lots)
      .set('page', page.toString())
      .set('size', pageSize.toString());

    
  if (dateAjout) {
    const formattedDateDebut = moment(dateAjout).format('YYYY-MM-DD');
    params = params.set('dateAjout', formattedDateDebut);
  }
  
    return this.http.get<Array<HealthChekPreprodProd>>(url, { observe: 'response', headers, params });
  }
}
