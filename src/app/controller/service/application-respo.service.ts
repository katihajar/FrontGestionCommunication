import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Application } from '../model/application';
import { DestinataireCommunication } from '../model/destinataire-communication';
import { PiloteApplication } from '../model/pilote-application';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationRespoService {
  private url = environment.baseUrlAdmin;
  private urlRespo = environment.baseUrlResponsable;
  private _ListApplication: Array<Application> = new Array<Application>();
  private _AddApplication: Application = new Application();

  constructor(private http: HttpClient,private auth: AuthService) { }


  get AddApplication(): Application{
    if(this._AddApplication == null){
      this._AddApplication = new Application();
    }
    return this._AddApplication;
  }

  set AddApplication(value: Application) {
    this._AddApplication = value;
  }

  get ListApplication(): Array<Application>{
    if(this._ListApplication == null){
      this._ListApplication = new Array<Application>();
    }
    return this._ListApplication;
  }

  set ListApplication(value: Array<Application>) {
    this._ListApplication = value;
  }



  public FindAllApplcation(): Observable<HttpResponse<Array<Application>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Application>>(
      this.url + 'application/AllApp',
      { observe: 'response', headers }
    );    
  }
  

  public FindApplicationByRespo(): Observable<HttpResponse<Array<Application>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Application>>(
      this.urlRespo + 'application/user/'+this.auth.User.id,
      { observe: 'response', headers }
    );    
  }
  public ValiderDest(des: DestinataireCommunication): Observable<HttpResponse<DestinataireCommunication>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.put<DestinataireCommunication>(
      this.urlRespo + 'destinataire/validate',des,
      { observe: 'response', headers }
    );    
  }

  public RetirerDest(des: DestinataireCommunication): Observable<HttpResponse<DestinataireCommunication>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.put<DestinataireCommunication>(
      this.urlRespo + 'destinataire/retirer',des,
      { observe: 'response', headers }
    );    
  }
}
