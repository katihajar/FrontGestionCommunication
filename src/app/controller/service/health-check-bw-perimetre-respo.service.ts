import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HealthCheckBwPerimetre } from '../model/health-check-bw-perimetre';
import { HealthCheckBwPerimetreDetail } from '../model/health-check-bw-perimetre-detail';
import { AuthService } from './auth.service';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class HealthCheckBwPerimetreRespoService {
  private urlRespo = environment.baseUrlResponsable;
  constructor(private http: HttpClient,private auth: AuthService) { }


  public FindHealthCheckBwByRespo(page: number, pageSize: number): Observable<HttpResponse<Array<HealthCheckBwPerimetre>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlRespo + 'healthcheck/BIperimetre/lot/' + this.auth.User.lots;
    const params = new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString());
    return this.http.get<Array<HealthCheckBwPerimetre>>(url, { observe: 'response', headers, params }); 
  }
  public FindDetailByHealthCheckBw(id:number): Observable<HttpResponse<Array<HealthCheckBwPerimetreDetail>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<HealthCheckBwPerimetreDetail>>(
      this.urlRespo + 'healthcheckdetail/bwperimetre/health/'+id,
      { observe: 'response', headers }
    );    
  }
  public SearchHealth(dateAjout: Date | null, health: HealthCheckBwPerimetre, page: number, pageSize: number): Observable<HttpResponse<Array<HealthCheckBwPerimetre>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlRespo + 'healthcheck/BIperimetre/searchHealth';
  
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
