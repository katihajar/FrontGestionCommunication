import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Application } from '../model/application';
import { PiloteApplication } from '../model/pilote-application';
import { AuthService } from './auth.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private url = environment.baseUrlAdmin;
  private urlPilote = environment.baseUrlPilote;
  private _ListApplication: Array<Application> = new Array<Application>();
  private _ListPiloteApplication: Array<PiloteApplication> = new Array<PiloteApplication>();
  private _AddApplication: Application = new Application();
  private _AddPiloteApp: PiloteApplication = new PiloteApplication();
  private _ListApplicationOfPilote: Array<PiloteApplication> = new Array<PiloteApplication>();

  constructor(private http: HttpClient,private auth: AuthService) { }

 
  get ListApplicationOfPilote(): Array<PiloteApplication>{
    if(this._ListApplicationOfPilote == null){
      this._ListApplicationOfPilote = new Array<PiloteApplication>();
    }
    return this._ListApplicationOfPilote;
  }

  set ListApplicationOfPilote(value: Array<PiloteApplication>) {
    this._ListApplicationOfPilote = value;
  }

  get AddPiloteApp(): PiloteApplication{
    if(this._AddPiloteApp == null){
      this._AddPiloteApp = new PiloteApplication();
    }
    return this._AddPiloteApp;
  }

  set AddPiloteApp(value: PiloteApplication) {
    this._AddPiloteApp = value;
  }

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

  get ListPiloteApplication(): Array<PiloteApplication>{
    if(this._ListPiloteApplication == null){
      this._ListPiloteApplication = new Array<PiloteApplication>();
    }
    return this._ListPiloteApplication;
  }

  set ListPiloteApplication(value: Array<PiloteApplication>) {
    this._ListPiloteApplication = value;
  }

  public FindAllApplcation(): Observable<HttpResponse<Array<Application>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Application>>(
      this.url + 'application/AllApp',
      { observe: 'response', headers }
    );    
  }

  public SaveApplication(): Observable<HttpResponse<void>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.post<void>(
      this.url + 'application/saveApp',this.AddApplication,
      { observe: 'response', headers }
    );    
  }
  
  public FindAllPiloteApplcation(nom: string): Observable<HttpResponse<Array<PiloteApplication>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<PiloteApplication>>(
      this.url + 'piloteapplication/app/'+nom,
      { observe: 'response', headers }
    );    
  }

  public SavePiloteToApp(): Observable<HttpResponse<PiloteApplication>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.post<PiloteApplication>(
      this.url + 'piloteapplication/savePiloteApp',this.AddPiloteApp,
      { observe: 'response', headers }
    );    
  }
  public FindApplicationByPilote(): Observable<HttpResponse<Array<PiloteApplication>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<PiloteApplication>>(
      this.urlPilote + 'piloteapplication/app/user/'+this.auth.User.username,
      { observe: 'response', headers }
    );    
  }
  
}
