import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';
import { Probleme } from '../model/probleme';
import { AuthService } from './auth.service';
import { AvancementActionProbleme } from '../model/avancement-action-probleme';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ProblemeService {
  private urlPilote = environment.baseUrlPilote;
  private urlRespo = environment.baseUrlResponsable;
  private _ListProblemeOfPilote: Array<Probleme> = new Array<Probleme>();
  private _ListProblemeOfRespo: Array<Probleme> = new Array<Probleme>();
  private _AddProbleme: Probleme = new Probleme();
  private _AddProblemeAng: Probleme = new Probleme();
  private _ListAvancementActionProbleme = new Array<AvancementActionProbleme>();
  private _ListAvancementActionProblemeAng = new Array<AvancementActionProbleme>();



  constructor(private http: HttpClient,private auth: AuthService,private authService: MsalService) { }
get ListAvancementActionProblemeAng(): Array<AvancementActionProbleme>{
    if(this._ListAvancementActionProblemeAng == null){
      this._ListAvancementActionProblemeAng = new Array<AvancementActionProbleme>();
    }
    return this._ListAvancementActionProblemeAng;
  }

  set ListAvancementActionProblemeAng(value: Array<AvancementActionProbleme>) {
    this._ListAvancementActionProblemeAng = value;
  }

  get ListAvancementActionProbleme(): Array<AvancementActionProbleme>{
    if(this._ListAvancementActionProbleme == null){
      this._ListAvancementActionProbleme = new Array<AvancementActionProbleme>();
    }
    return this._ListAvancementActionProbleme;
  }

  set ListAvancementActionProbleme(value: Array<AvancementActionProbleme>) {
    this._ListAvancementActionProbleme = value;
  }

  get AddProblemeAng(): Probleme{
    if(this._AddProblemeAng == null){
      this._AddProblemeAng = new Probleme();
    }
    return this._AddProblemeAng;
  }

  set AddProblemeAng(value: Probleme) {
    this._AddProblemeAng = value;
  }

  get AddProbleme(): Probleme{
    if(this._AddProbleme == null){
      this._AddProbleme = new Probleme();
    }
    return this._AddProbleme;
  }

  set AddProbleme(value: Probleme) {
    this._AddProbleme = value;
  }


  get ListProblemeOfPilote(): Array<Probleme>{
    if(this._ListProblemeOfPilote == null){
      this._ListProblemeOfPilote = new Array<Probleme>();
    }
    return this._ListProblemeOfPilote;
  }

  set ListProblemeOfPilote(value: Array<Probleme>) {
    this._ListProblemeOfPilote = value;
  }

  get ListProblemeOfRespo(): Array<Probleme>{
    if(this._ListProblemeOfRespo == null){
      this._ListProblemeOfRespo = new Array<Probleme>();
    }
    return this._ListProblemeOfRespo;
  }

  set ListProblemeOfRespo(value: Array<Probleme>) {
    this._ListProblemeOfRespo = value;
  }
  public FindProblemeByPilote(page: number, pageSize: number): Observable<HttpResponse<Array<Probleme>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlPilote + 'probleme/lot/' + this.auth.User.lots;
    const params = new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString());
    return this.http.get<Array<Probleme>>(url, { observe: 'response', headers, params });
}
public FindProblemeByRespo(page: number, pageSize: number): Observable<HttpResponse<Array<Probleme>>> {
  const headers: HttpHeaders = this.auth.tokenHeaders();
  const url = this.urlRespo + 'probleme/lot/' + this.auth.User.lots;
  const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
  return this.http.get<Array<Probleme>>(url, { observe: 'response', headers, params });
}
public SaveProbleme(): Observable<HttpResponse<Probleme>> {
  this.AddProbleme.createurProbleme = this.auth.User;
  const headers: HttpHeaders = this.auth.tokenHeaders();
  return this.http.post<Probleme>(
    this.urlPilote + 'probleme/save',this.AddProbleme,
    { observe: 'response', headers }
  );    
}
public FindAvancementActionProblemeByProbleme(id:number): Observable<HttpResponse<Array<AvancementActionProbleme>>> {
  const headers: HttpHeaders = this.auth.tokenHeaders();
  return this.http.get<Array<AvancementActionProbleme>>(
    this.urlPilote + 'actionprobleme/probleme/'+id,
    { observe: 'response', headers }
  );    
}
public FindAvancementActionProblemeByProblemeRespo(id:number): Observable<HttpResponse<Array<AvancementActionProbleme>>> {
  const headers: HttpHeaders = this.auth.tokenHeaders();
  return this.http.get<Array<AvancementActionProbleme>>(
    this.urlRespo + 'actionprobleme/probleme/'+id,
    { observe: 'response', headers }
  );    
}
public DeleteProbleme(id:number): Observable<HttpResponse<number>> {
  const headers: HttpHeaders = this.auth.tokenHeaders();
  return this.http.delete<number>(
    this.urlPilote + 'probleme/delete/'+id,
    { observe: 'response', headers }
  );  

}
public SearchProblemeRespo(date: Date | null, prb: Probleme, page: number, pageSize: number): Observable<HttpResponse<Array<Probleme>>> {
  const headers: HttpHeaders = this.auth.tokenHeaders();
  const url = this.urlRespo + 'probleme/search';

  let params = new HttpParams()
    .set('topic', prb.topic)
    .set('statut', prb.statut)
    .set('desc', prb.description)
    .set('lot', this.auth.User.lots)
    .set('page', page.toString())
    .set('size', pageSize.toString());
if(prb.application){    
  params = params.set('id', prb.application.id)

}
if (date) {
  const formattedDateDebut = moment(date).format('YYYY-MM-DD');
  params = params.set('dateAjout', formattedDateDebut);
}


  return this.http.get<Array<Probleme>>(url, { observe: 'response', headers, params });
}
public SearchProbleme(date: Date | null, prb: Probleme, page: number, pageSize: number): Observable<HttpResponse<Array<Probleme>>> {
  const headers: HttpHeaders = this.auth.tokenHeaders();
  const url = this.urlPilote + 'probleme/search';

  let params = new HttpParams()
    .set('topic', prb.topic)
    .set('statut', prb.statut)
    .set('desc', prb.description)
    .set('lot', this.auth.User.lots)
    .set('page', page.toString())
    .set('size', pageSize.toString());
if(prb.application){    
  params = params.set('id', prb.application.id)

}
if (date) {
  const formattedDateDebut = moment(date).format('YYYY-MM-DD');
  params = params.set('dateAjout', formattedDateDebut);
}


  return this.http.get<Array<Probleme>>(url, { observe: 'response', headers, params });
}

}
