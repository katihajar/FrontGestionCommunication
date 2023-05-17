import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';
import { ChangementPlanifier } from '../model/changement-planifier';
import { ContenuChangement } from '../model/contenu-changement';

@Injectable({
  providedIn: 'root'
})
export class ChangementService {
  private urlPilote = environment.baseUrlPilote;
  private urlRespo = environment.baseUrlResponsable; 
  private urlAdmin = environment.baseUrlAdmin;
  private _ListChangementOfPilote: Array<ChangementPlanifier> = new Array<ChangementPlanifier>();
  private _AddChangement: ChangementPlanifier = new ChangementPlanifier();
  private _AddChangementAng: ChangementPlanifier = new ChangementPlanifier();
  private _ListContenu = new Array<ContenuChangement>();
  private _ListContenuAng = new Array<ContenuChangement>();
  constructor(private http: HttpClient,private auth: AuthService) { }

  get ListContenuAng(): Array<ContenuChangement>{
    if(this._ListContenuAng == null){
      this._ListContenuAng = new Array<ContenuChangement>();
    }
    return this._ListContenuAng;
  }

  set ListContenuAng(value: Array<ContenuChangement>) {
    this._ListContenuAng = value;
  }

  get ListContenu(): Array<ContenuChangement>{
    if(this._ListContenu == null){
      this._ListContenu = new Array<ContenuChangement>();
    }
    return this._ListContenu;
  }

  set ListContenu(value: Array<ContenuChangement>) {
    this._ListContenu = value;
  }

  get AddChangementAng(): ChangementPlanifier{
    if(this._AddChangementAng == null){
      this._AddChangementAng = new ChangementPlanifier();
    }
    return this._AddChangementAng;
  }

  set AddChangementAng(value:ChangementPlanifier) {
    this._AddChangementAng = value;
  }

  get AddChangement(): ChangementPlanifier{
    if(this._AddChangement == null){
      this._AddChangement = new ChangementPlanifier();
    }
    return this._AddChangement;
  }

  set AddChangement(value:ChangementPlanifier) {
    this._AddChangement = value;
  }

  get ListChangementOfPilote(): Array<ChangementPlanifier>{
    if(this._ListChangementOfPilote == null){
      this._ListChangementOfPilote = new Array<ChangementPlanifier>();
    }
    return this._ListChangementOfPilote;
  }

  set ListChangementOfPilote(value: Array<ChangementPlanifier>) {
    this._ListChangementOfPilote = value;
  }
  public FindAllChangeRespo(): Observable<HttpResponse<Array<ChangementPlanifier>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<ChangementPlanifier>>(
      this.urlRespo + 'changementplanifier/findAll',
      { observe: 'response', headers }
    );    
  }
  public FindAllChangeAdmin(): Observable<HttpResponse<Array<ChangementPlanifier>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<ChangementPlanifier>>(
      this.urlAdmin + 'changementplanifier/findAll',
      { observe: 'response', headers }
    );    
  }
  public FindAllChange(): Observable<HttpResponse<Array<ChangementPlanifier>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<ChangementPlanifier>>(
      this.urlPilote + 'changementplanifier/findAll',
      { observe: 'response', headers }
    );    
  }
  public FindContenuByChangement(id:number): Observable<HttpResponse<Array<ContenuChangement>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<ContenuChangement>>(
      this.urlPilote + 'contenuchangement/changement/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindChangementByPilote(): Observable<HttpResponse<Array<ChangementPlanifier>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<ChangementPlanifier>>(
      this.urlPilote + 'changementplanifier/lot/'+this.auth.User.lots,
      { observe: 'response', headers }
    );    
  }

  public SaveChangement(): Observable<HttpResponse<ChangementPlanifier>> {
    this.AddChangement.createurChangement = this.auth.User;
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.post<ChangementPlanifier>(
      this.urlPilote + 'changementplanifier/savechange',this.AddChangement,
      { observe: 'response', headers }
    );    
  }
  public DeleteChangement(id:number): Observable<HttpResponse<number>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.delete<number>(
      this.urlPilote + 'changementplanifier/delete/'+id,
      { observe: 'response', headers }
    );    
  }

  public FindContenuByChangementRespo(id:number): Observable<HttpResponse<Array<ContenuChangement>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<ContenuChangement>>(
      this.urlRespo + 'contenuchangement/changement/'+id,
      { observe: 'response', headers }
    );    
  }
  public FindChangementByRespo(): Observable<HttpResponse<Array<ChangementPlanifier>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<ChangementPlanifier>>(
      this.urlRespo + 'changementplanifier/lot/'+this.auth.User.lots,
      { observe: 'response', headers }
    );    
  }

}
