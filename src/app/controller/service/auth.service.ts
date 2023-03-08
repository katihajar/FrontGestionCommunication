import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Userauth} from "../model/userauth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.baseUrl;
  private _User: User = new User();
  private _UserAuth: Userauth = new Userauth();
  private _submitted: boolean = false;
  constructor(private http: HttpClient) { }

  get UserAuth(): Userauth {
    if(this._UserAuth == null){
      this._UserAuth = new Userauth();
    }
    return this._UserAuth;
  }

  set UserAuth(value: Userauth) {
    this._UserAuth = value;
  }

  public Login(user: string, pass: string): Observable<HttpResponse<Userauth>> {
    const headers: HttpHeaders = this.initHeaders();
    return this.http.post<Userauth>(
      this.url + 'api/auth/login',
      { username: user, password: pass },
      { observe: 'response', headers }
    );
  }

  public LogOUT(){
    const headers = { Authorization: 'Bearer ' + this.UserAuth.accessToken };
    return this.http.post(
      this.url + 'api/auth/logout',
      this.UserAuth,
      { headers }
    ).subscribe(
            () => console.log('Logout successful'),
            error => console.error('Logout failed', error)
        );
        
  }
  

  initHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('accessToken');
    if (token !== null) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.UserAuth.accessToken}`,
      });
    }
    return headers;
  }

  get submitted(): boolean {
    return this._submitted;
  }

  set submitted(value: boolean) {
    this._submitted = value;
  }
  get User(): User {
    if (this._User == null) {
      this._User = new User();
    }
    return this._User;
  }

  set User(value: User) {
    this._User = value;
  }
  tokenHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.UserAuth.accessToken}`,
      });
    return headers;
  }

}
