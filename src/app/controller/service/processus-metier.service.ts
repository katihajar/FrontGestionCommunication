import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProcessusMetier } from '../model/processus-metier';
import { AuthService } from './auth.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProcessusMetierService {
  private url = environment.baseUrlAdmin;
  private urlPilote = environment.baseUrlPilote;
  private urlRespo = environment.baseUrlResponsable;
  private _ListAllProcessusMetier: Array<ProcessusMetier> = new Array<ProcessusMetier>();
  private _AddProcessusMetier: ProcessusMetier = new ProcessusMetier();
  private _ModifierProcessusMetier: ProcessusMetier = new ProcessusMetier();
  constructor(private http: HttpClient,private auth: AuthService) { }

  get ListAllProcessusMetier():  Array<ProcessusMetier>{
    if(this._ListAllProcessusMetier == null){
      this._ListAllProcessusMetier =  new Array<ProcessusMetier>();
    }
    return this._ListAllProcessusMetier;
  }

  set ListAllProcessusMetier(value: Array<ProcessusMetier>) {
    this._ListAllProcessusMetier = value;
  }
 
  get ModifierProcessusMetier(): ProcessusMetier{
    if(this._ModifierProcessusMetier == null){
      this._ModifierProcessusMetier = new ProcessusMetier();
    }
    return this._ModifierProcessusMetier;
  }

  set ModifierProcessusMetier(value: ProcessusMetier) {
    this._ModifierProcessusMetier = value;
  }

  get AddProcessusMetier(): ProcessusMetier{
    if(this._AddProcessusMetier == null){
      this._AddProcessusMetier = new ProcessusMetier();
    }
    return this._AddProcessusMetier;
  }

  set AddProcessusMetier(value: ProcessusMetier) {
    this._AddProcessusMetier = value;
  }
  public FindAllProcessusMetierPilote(): Observable<HttpResponse<Array<ProcessusMetier>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<ProcessusMetier>>(
      this.urlPilote + 'processusmetier/findAll',
      { observe: 'response', headers }
    );    
  }
  public FindAllProcessusMetierRespo(): Observable<HttpResponse<Array<ProcessusMetier>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<ProcessusMetier>>(
      this.urlRespo + 'processusmetier/findAll',
      { observe: 'response', headers }
    );    
  }
  public FindAllProcessusMetier(): Observable<HttpResponse<Array<ProcessusMetier>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<ProcessusMetier>>(
      this.url + 'processusmetier/findAll',
      { observe: 'response', headers }
    );    
  }
  public SaveProcessusMetier(): Observable<HttpResponse<ProcessusMetier>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.post<ProcessusMetier>(
      this.url + 'processusmetier/save',this.AddProcessusMetier,
      { observe: 'response', headers }
    );    
  }
  public UpdateProcessusMetier(): Observable<HttpResponse<ProcessusMetier>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.put<ProcessusMetier>(
      this.url + 'processusmetier/update',this.ModifierProcessusMetier,
      { observe: 'response', headers }
    );    
  }
}
