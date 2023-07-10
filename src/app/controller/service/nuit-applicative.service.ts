import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { NuitApplicative } from '../model/nuit-applicative';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { NbOccurence } from '../model/nb-occurence';
import { SuiviVolumetrie } from '../model/suivi-volumetrie';

@Injectable({
  providedIn: 'root'
})
export class NuitApplicativeService {

  private urlPilote = environment.baseUrlPilote;
  private urlRespo = environment.baseUrlResponsable;
  private _ListNuitApplicative: Array<NuitApplicative> = new Array<NuitApplicative>();
  private _AddNuitApplicative: NuitApplicative = new NuitApplicative();
  constructor(private http: HttpClient,private auth: AuthService) { }

  get ListNuitApplicative(): Array<NuitApplicative>{
    if(this._ListNuitApplicative == null){
      this._ListNuitApplicative = new Array<NuitApplicative>();
    }
    return this._ListNuitApplicative;
  }

  set ListNuitApplicative(value: Array<NuitApplicative>) {
    this._ListNuitApplicative = value;
  }
  
  get AddNuitApplicative(): NuitApplicative{
    if(this._AddNuitApplicative == null){
      this._AddNuitApplicative = new NuitApplicative();
    }
    return this._AddNuitApplicative;
  }

  set AddNuitApplicative(value: NuitApplicative) {
    this._AddNuitApplicative = value;
  }
  public FindNuitApplicativeByPilote(page: number, pageSize: number): Observable<HttpResponse<Array<NuitApplicative>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlPilote + 'nuitapplicative/lot/' + this.auth.User.lots;
    const params = new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString());
    return this.http.get<Array<NuitApplicative>>(url, { observe: 'response', headers, params }); 
  }
  public SaveNuitAppl(): Observable<HttpResponse<NuitApplicative>> {
    this.AddNuitApplicative.createurNuitApplicative = this.auth.User;
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.post<NuitApplicative>(
      this.urlPilote + 'nuitapplicative/save',this.AddNuitApplicative,
      { observe: 'response', headers }
    );    
  }
  public DeleteNuitApplicative(id:number): Observable<HttpResponse<number>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.delete<number>(
      this.urlPilote + 'nuitapplicative/delete/'+id,
      { observe: 'response', headers }
    );    
  }
  public SearchNuit(dateAjout: Date | null, nuitapp: NuitApplicative, page: number, pageSize: number): Observable<HttpResponse<Array<NuitApplicative>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlPilote + 'nuitapplicative/search';
  
    let params = new HttpParams()
      .set('titre', nuitapp.titre)
      .set('statut', nuitapp.statut)
      .set('lot', this.auth.User.lots)
      .set('page', page.toString())
      .set('size', pageSize.toString());

    
  if (dateAjout) {
    const formattedDateDebut = moment(dateAjout).format('YYYY-MM-DD');
    params = params.set('dateAjout', formattedDateDebut);
  }
  
    return this.http.get<Array<NuitApplicative>>(url, { observe: 'response', headers, params });
  }
  public FindNbOccurenceByNuitApp(id:number): Observable<HttpResponse<Array<NbOccurence>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<NbOccurence>>(
      this.urlPilote + 'nboccurence/nuitApplicative/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindSuiviVolumetrieByNuitApp(id:number): Observable<HttpResponse<Array<SuiviVolumetrie>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<SuiviVolumetrie>>(
      this.urlPilote + 'suivivolumetrie/nuitApplicative/'+id,
      { observe: 'response', headers }
    );    
  }
}
