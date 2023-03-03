import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { UserRole } from '../model/user-role';
import { AuthService } from './auth.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.baseUrlAdmin;
  private _UserList: Array<User> = new Array<User>();
  private _UserRole: UserRole= new UserRole();
  constructor(private http: HttpClient,private auth: AuthService) { }
  get UserList(): Array<User>{
    if(this._UserList == null){
      this._UserList = new Array<User>();
    }
    return this._UserList;
  }

  set UserList(value: Array<User>) {
    this._UserList = value;
  }

  get UserRole(): UserRole{
    if(this._UserRole == null){
      this._UserRole = new UserRole();
    }
    return this._UserRole;
  }

  set UserRole(value: UserRole) {
    this._UserRole = value;
  }

  public FindAllUsers(): Observable<HttpResponse<Array<User>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<User>>(
      this.url + 'users/',
      { observe: 'response', headers }
    );
    console.log("head : "+headers);
    
  }
}
