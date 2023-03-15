import { Injectable } from '@angular/core';
import { DestinataireCommunication } from '../model/destinataire-communication';
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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
      this.urlPilote + 'destinataire/findByApplication/'+id,
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
  public FindDestinataireByApplicationByResp(id:number): Observable<HttpResponse<Array<DestinataireCommunication>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<DestinataireCommunication>>(
      this.urlRespo + 'destinataire/findByApplication/'+id,
      { observe: 'response', headers }
    );    
  }
}
