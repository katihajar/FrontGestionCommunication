import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';
import { Operation } from '../model/operation';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  private urlPilote = environment.baseUrlPilote;
  private urlRespo = environment.baseUrlResponsable;
  private _ListOperationOfPilote: Array<Operation> = new Array<Operation>();
  private _AddOperation: Operation = new Operation();
  private _AddOperationAng: Operation = new Operation();
  constructor(private http: HttpClient,private auth: AuthService) { }

  get AddOperationAng(): Operation{
    if(this._AddOperationAng == null){
      this._AddOperationAng = new Operation();
    }
    return this._AddOperationAng;
  }

  set AddOperationAng(value: Operation) {
    this._AddOperationAng = value;
  }

  get AddOperation(): Operation{
    if(this._AddOperation == null){
      this._AddOperation = new Operation();
    }
    return this._AddOperation;
  }

  set AddOperation(value: Operation) {
    this._AddOperation = value;
  }


  get ListOperationOfPilote(): Array<Operation>{
    if(this._ListOperationOfPilote == null){
      this._ListOperationOfPilote = new Array<Operation>();
    }
    return this._ListOperationOfPilote;
  }

  set ListOperationOfPilote(value: Array<Operation>) {
    this._ListOperationOfPilote = value;
  }

  public FindOperationByPilote(): Observable<HttpResponse<Array<Operation>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Operation>>(
      this.urlPilote + 'operation/user/'+this.auth.User.id,
      { observe: 'response', headers }
    );    
  }
  public FindOperationByRespo(): Observable<HttpResponse<Array<Operation>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<Operation>>(
      this.urlRespo + 'operation/user/'+this.auth.User.id,
      { observe: 'response', headers }
    );    
  }

  public SaveOperation(): Observable<HttpResponse<Operation>> {
    this.AddOperation.createurOperation = this.auth.User;
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.post<Operation>(
      this.urlPilote + 'operation/saveoperation',this.AddOperation,
      { observe: 'response', headers }
    );    
  }
  public DeleteOperation(id:number): Observable<HttpResponse<number>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.delete<number>(
      this.urlPilote + 'operation/delete/'+id,
      { observe: 'response', headers }
    );    
  }
}
