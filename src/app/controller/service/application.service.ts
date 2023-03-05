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
  private _ListApplication: Array<Application> = new Array<Application>();
  private _ListPiloteApplication: Array<PiloteApplication> = new Array<PiloteApplication>();
  private _AddApplication: Application = new Application();
  private _AddPiloteApp: PiloteApplication = new PiloteApplication();
  constructor(private http: HttpClient,private auth: AuthService) { }

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
}
