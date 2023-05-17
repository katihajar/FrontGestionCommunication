import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HealthCheckBwPerimetre } from '../model/health-check-bw-perimetre';
import { HealthCheckBwPerimetreDetail } from '../model/health-check-bw-perimetre-detail';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class HealthCheckBwPerimetreRespoService {
  private urlRespo = environment.baseUrlResponsable;
  constructor(private http: HttpClient,private auth: AuthService) { }

  public FindHealthCheckBw(): Observable<HttpResponse<Array<HealthCheckBwPerimetre>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<HealthCheckBwPerimetre>>(
      this.urlRespo + 'healthcheck/bwperimetre/lot/'+this.auth.User.lots,
      { observe: 'response', headers }
    );    
  }
  public FindDetailByHealthCheckBw(id:number): Observable<HttpResponse<Array<HealthCheckBwPerimetreDetail>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<HealthCheckBwPerimetreDetail>>(
      this.urlRespo + 'healthcheckdetail/bwperimetre/health/'+id,
      { observe: 'response', headers }
    );    
  }
}
