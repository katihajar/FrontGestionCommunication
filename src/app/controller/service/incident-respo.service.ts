import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Incident } from '../model/incident';
import { PlanAction } from '../model/plan-action';
import { AuthService } from './auth.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class IncidentRespoService {

  private urlRespo = environment.baseUrlResponsable;
  private urlAdmin = environment.baseUrlAdmin;
  public FindTodayIncidentAdmin(): Observable<HttpResponse<Array<Incident>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Incident>>(
      this.urlAdmin + 'incident/todayincident/lot/' + this.auth.User.lots,
      { observe: 'response', headers }
    );    
  }
  public FindTodayIncident(): Observable<HttpResponse<Array<Incident>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Incident>>(
      this.urlRespo + 'incident/todayincident/lot/' + this.auth.User.lots,
      { observe: 'response', headers }
    );    
  }
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
  public FindIncidentByRespo(page: number, pageSize: number): Observable<HttpResponse<Array<Incident>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlRespo + 'incident/lot/' + this.auth.User.lots;
    const params = new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString());
    return this.http.get<Array<Incident>>(url, { observe: 'response', headers, params });
}

  public FindPlanActionByIncident(id:number): Observable<HttpResponse<Array<PlanAction>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<PlanAction>>(
      this.urlRespo + 'planaction/incident/'+id,
      { observe: 'response', headers }
    );    
  }
  public SearchInci(dateDebut: Date | null, dateFin: Date | null, inc: Incident, page: number, pageSize: number): Observable<HttpResponse<Array<Incident>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlRespo + 'incident/searchIncident';
  
    let params = new HttpParams()
      .set('titre', inc.titreIncident)
      .set('statut', inc.statut)
      .set('desc', inc.description)
      .set('lot', this.auth.User.lots)
      .set('page', page.toString())
      .set('size', pageSize.toString());
  if(inc.application){    
    params = params.set('applicationId', inc.application.id)

  }
    
  if (dateDebut) {
    const formattedDateDebut = moment(dateDebut).format('YYYY-MM-DD');
    params = params.set('dateDebut', formattedDateDebut);
  }
  
  if (dateFin) {
    const formattedDateFin =moment(dateFin).format('YYYY-MM-DD');// Extract date part  
    params = params.set('dateFin', formattedDateFin);
  }
  
    return this.http.get<Array<Incident>>(url, { observe: 'response', headers, params });
  }
  
}
