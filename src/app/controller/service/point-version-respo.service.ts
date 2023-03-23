import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LivraisonCARM } from '../model/livraison-carm';
import { PlanningPointVersion } from '../model/planning-point-version';
import { PointVersion } from '../model/point-version';
import { Ticket } from '../model/ticket';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PointVersionRespoService {
  private urlResponsable = environment.baseUrlResponsable;

  constructor(private http: HttpClient,private auth: AuthService) { }

  public FindPointVersion(): Observable<HttpResponse<Array<PointVersion>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<PointVersion>>(
      this.urlResponsable + 'pointversion/findAll',
      { observe: 'response', headers }
    );    
  }
  public FindTicketByPointVersion(id:number): Observable<HttpResponse<Array<Ticket>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Ticket>>(
      this.urlResponsable + 'ticket/pointversion/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindPlanningByPointVersion(id:number): Observable<HttpResponse<Array<PlanningPointVersion>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<PlanningPointVersion>>(
      this.urlResponsable + 'planningpoint/pointversion/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindLivraisonByPointVersion(id:number): Observable<HttpResponse<Array<LivraisonCARM>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<LivraisonCARM>>(
      this.urlResponsable + 'livraisoncarm/pointversion/'+id,
      { observe: 'response', headers }
    );    
  }
}
