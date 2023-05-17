import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Incident } from '../model/incident';
import { PlanAction } from '../model/plan-action';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentRespoService {

  private urlRespo = environment.baseUrlResponsable;
  private urlAdmin = environment.baseUrlAdmin;

  constructor(private http: HttpClient,private auth: AuthService) { }
  public FindAllIncident(): Observable<HttpResponse<Array<Incident>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Incident>>(
      this.urlRespo + 'incident/findAll',
      { observe: 'response', headers }
    );    
  }

  public FindAllIncidentAdmin(): Observable<HttpResponse<Array<Incident>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Incident>>(
      this.urlAdmin + 'incident/findAll',
      { observe: 'response', headers }
    );    
  }
  public FindIncidentByRespo(): Observable<HttpResponse<Array<Incident>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Incident>>(
      this.urlRespo + 'incident/lot/'+this.auth.User.lots,
      { observe: 'response', headers }
    );    
  }

  public FindPlanActionByIncident(id:number): Observable<HttpResponse<Array<PlanAction>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<PlanAction>>(
      this.urlRespo + 'planaction/incident/'+id,
      { observe: 'response', headers }
    );    
  }
}
