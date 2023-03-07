import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Perimetre } from '../model/perimetre';
import { AuthService } from './auth.service';
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerimetreService {
  private url = environment.baseUrlAdmin;
  private urlPilote = environment.baseUrlPilote;
  private _ListAllPerimentre: Array<Perimetre> = new Array<Perimetre>();
  private _AddPerimetre: Perimetre = new Perimetre();
  private _ModifierPerimetre: Perimetre = new Perimetre();
  constructor(private http: HttpClient,private auth: AuthService) { }

  get ListAllPerimentre():  Array<Perimetre>{
    if(this._ListAllPerimentre == null){
      this._ListAllPerimentre =  new Array<Perimetre>();
    }
    return this._ListAllPerimentre;
  }

  set ListAllPerimentre(value: Array<Perimetre>) {
    this._ListAllPerimentre = value;
  }
 
  get AddPerimetre(): Perimetre{
    if(this._AddPerimetre == null){
      this._AddPerimetre = new Perimetre();
    }
    return this._AddPerimetre;
  }

  set AddPerimetre(value: Perimetre) {
    this._AddPerimetre = value;
  }

  get ModifierPerimetre(): Perimetre{
    if(this._ModifierPerimetre == null){
      this._ModifierPerimetre = new Perimetre();
    }
    return this._ModifierPerimetre;
  }

  set ModifierPerimetre(value: Perimetre) {
    this._ModifierPerimetre = value;
  }

  public FindAllPerimetre(): Observable<HttpResponse<Array<Perimetre>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Perimetre>>(
      this.url + 'perimetre/findAll',
      { observe: 'response', headers }
    );    
  }
  public SavePerimetre(): Observable<HttpResponse<Perimetre>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.post<Perimetre>(
      this.url + 'perimetre/save',this.AddPerimetre,
      { observe: 'response', headers }
    );    
  }
  public UpdatePerimetre(): Observable<HttpResponse<Perimetre>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.put<Perimetre>(
      this.url + 'perimetre/update',this.ModifierPerimetre,
      { observe: 'response', headers }
    );    
  }
}
