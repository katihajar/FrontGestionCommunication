import { Injectable } from '@angular/core';
import { DestinataireCommunication } from '../model/destinataire-communication';
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DestinataireService {
  private urlPilote = environment.baseUrlPilote;
  private urlRespo = environment.baseUrlResponsable;
  private _ListDestinataireApp: Array<DestinataireCommunication> = new Array<DestinataireCommunication>();
  private _AddDestinataire: DestinataireCommunication = new DestinataireCommunication();

  constructor(private http: HttpClient,private auth: AuthService) { }

 

  get AddDestinataire(): DestinataireCommunication{
    if(this._AddDestinataire == null){
      this._AddDestinataire = new DestinataireCommunication();
    }
    return this._AddDestinataire;
  }

  set AddDestinataire(value: DestinataireCommunication) {
    this._AddDestinataire = value;
  }



  get ListDestinataireApp(): Array<DestinataireCommunication>{
    if(this._ListDestinataireApp == null){
      this._ListDestinataireApp = new Array<DestinataireCommunication>();
    }
    return this._ListDestinataireApp;
  }

  set ListDestinataireApp(value: Array<DestinataireCommunication>) {
    this._ListDestinataireApp = value;
  }
  public SaveAllDestinataire(data:Array<DestinataireCommunication>): Observable<HttpResponse<Array<DestinataireCommunication>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.post<Array<DestinataireCommunication>>(
      this.urlPilote + 'destinataire/saveAll',data,
      { observe: 'response', headers }
    );    
  }

  public SaveDestinataire(): Observable<HttpResponse<DestinataireCommunication>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.post<DestinataireCommunication>(
      this.urlPilote + 'destinataire/save',this.AddDestinataire,
      { observe: 'response', headers }
    );    
  }
  public FindDestinataireByApplication(id:number): Observable<HttpResponse<Array<DestinataireCommunication>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<DestinataireCommunication>>(
      this.urlPilote + 'destinataire/findAllByApplication/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindDestinataireByApplicationByResp(page: number, pageSize: number): Observable<HttpResponse<Array<DestinataireCommunication>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlRespo + 'destinataire/findByApplication/' + this.AddDestinataire.application.id;
    const params = new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString());
    return this.http.get<Array<DestinataireCommunication>>(url, { observe: 'response', headers, params });
}
public FindPagesDestinataireByApplication(page: number, pageSize: number): Observable<HttpResponse<Array<DestinataireCommunication>>> {
  const headers: HttpHeaders = this.auth.tokenHeaders();
  const url = this.urlPilote + 'destinataire/findByApplication/' + this.AddDestinataire.application.id;
  const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
  return this.http.get<Array<DestinataireCommunication>>(url, { observe: 'response', headers, params });
}
  public FindDestinataireHealthCheckProd(): Observable<HttpResponse<Array<DestinataireCommunication>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<DestinataireCommunication>>(
      this.urlPilote + 'destinataire/findByNomApplication/health\ check\ ProdPredprod',
      { observe: 'response', headers }
    );    
  }
  public FindDestinataireNuitApplicative(): Observable<HttpResponse<Array<DestinataireCommunication>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<DestinataireCommunication>>(
      this.urlPilote + 'destinataire/findByNomApplication/Nuit Applicative',
      { observe: 'response', headers }
    );    
  }
  public FindDestinataireFlamingo(): Observable<HttpResponse<Array<DestinataireCommunication>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<DestinataireCommunication>>(
      this.urlPilote + 'destinataire/findByNomApplication/Flamingo',
      { observe: 'response', headers }
    );    
  }
  public FindDestinataireHealthCheckBwPerimetre(): Observable<HttpResponse<Array<DestinataireCommunication>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<DestinataireCommunication>>(
      this.urlPilote + 'destinataire/findByNomApplication/Health\ Check\ Bw\ Perimetre',
      { observe: 'response', headers }
    );    
  }
  public DeleteDestinataire(id:number): Observable<HttpResponse<number>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.delete<number>(
      this.urlPilote + 'destinataire/DeleteById/'+id,
      { observe: 'response', headers }
    );    
  }
  public SearchDestRespo( dest: DestinataireCommunication, page: number, pageSize: number): Observable<HttpResponse<Array<DestinataireCommunication>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlRespo + 'destinataire/search';
  
    let params = new HttpParams()
      .set('email', dest.email)
      .set('statut', dest.statutRespo)
      .set('type', dest.typeDest)
      .set('id', this.AddDestinataire.application.id)
      .set('page', page.toString())
      .set('size', pageSize.toString());
    return this.http.get<Array<DestinataireCommunication>>(url, { observe: 'response', headers, params });
  }
  public SearchDest( dest: DestinataireCommunication, page: number, pageSize: number): Observable<HttpResponse<Array<DestinataireCommunication>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    const url = this.urlPilote + 'destinataire/search';
  
    let params = new HttpParams()
      .set('email', dest.email)
      .set('statut', dest.statutRespo)
      .set('type', dest.typeDest)
      .set('id', this.AddDestinataire.application.id)
      .set('page', page.toString())
      .set('size', pageSize.toString());
    return this.http.get<Array<DestinataireCommunication>>(url, { observe: 'response', headers, params });
  }
}
