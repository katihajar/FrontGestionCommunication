import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Userauth} from "../model/userauth";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.baseUrl;
  // @ts-ignore
  private tokenRefreshTimer: number;
  private tokenRefreshTimeout: any;
  private _User: User = new User();
  private _UserAuth: Userauth = new Userauth();
  private _submitted: boolean = false;
  constructor(private http: HttpClient,private router: Router) {
    if (this.isLoggedIn()) {
      this.User = this.getUser();
      this.UserAuth = this.getAuth();
      // this.startTokenRefreshTimer();
    }
  }

  get UserAuth(): Userauth {
    if(this._UserAuth == null){
      this._UserAuth = new Userauth();
    }
    return this._UserAuth;
  }

  set UserAuth(value: Userauth) {
    this._UserAuth = value;
  }
  private refreshToken(): Observable<HttpResponse<Userauth>> {
    const headers: HttpHeaders = this.initHeaders();
    return this.http.post<Userauth>(
      this.url + '/api/auth/refresh-token',
       this.UserAuth ,
      { observe: 'response', headers }
    );
  }
  public Login(user: string, pass: string): Observable<HttpResponse<Userauth>> {
    const headers: HttpHeaders = this.initHeaders();
    return this.http.post<Userauth>(
      this.url + '/api/auth/login',
      { username: user, password: pass },
      { observe: 'response', headers }
    );
  }
  public startTokenRefreshTimer() {
    const timerInterval = 25000;
    // Check if a previous timer was set
    const previousTimer = localStorage.getItem('tokenRefreshTimer');
    if (previousTimer) {
      // Calculate the time remaining until the next refresh
      const timeSinceLastRefresh = new Date().getTime() - parseInt(previousTimer, 0);
      const timeRemaining = Math.max(timerInterval - timeSinceLastRefresh, 0);
      // Resume the timer using setTimeout()
            // @ts-ignore
      this.tokenRefreshTimer = setTimeout(() => {
        this.refreshTokenAndSetTimer();
      }, timeRemaining);
      // Start a new timer using setInterval()
            // @ts-ignore
       this.tokenRefreshTimer = setInterval(() => {
       this.refreshTokenAndSetTimer();
      }, timerInterval);
    } else {
      // Start a new timer using setInterval()
            // @ts-ignore
      this.tokenRefreshTimer = setInterval(() => {
        this.refreshTokenAndSetTimer();
      }, timerInterval);
    }
  }
  
  private refreshTokenAndSetTimer() {
    // Send refresh token request and update user authentication object
    this.refreshToken().subscribe(response => {
      localStorage.setItem('tokenRefreshTimer', new Date().getTime().toString());
      // @ts-ignore
      this.UserAuth = response.body;
      localStorage.setItem('accessToken', this.UserAuth.accessToken as string);
      localStorage.setItem('refreshToken', this.UserAuth.refreshToken as string);
      localStorage.setItem('auth', JSON.stringify(this.UserAuth));
    }, () => {
      this.router.navigate(['/forbidden']);
    });
  }

  public LogOUT(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('auth');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('tokenRefreshTimer');
    clearInterval(this.tokenRefreshTimer);
    clearTimeout(this.tokenRefreshTimeout);
    this.User = new User();
    this.UserAuth = new Userauth();
    this.Httplogout();
  }

  public Httplogout(): Observable<any> {
    const headers: HttpHeaders = this.initHeaders();
    return this.http.post<any>(
      this.url + '/api/auth/logout',
      {headers }
    );
  }

  isLoggedIn() {
    return !!localStorage.getItem('currentUser');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('currentUser') as string);
  }

  getAuth(){
    return JSON.parse(localStorage.getItem('auth') as string);
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
  tokenHeaders2(): HttpHeaders {
    let headers = new HttpHeaders();
      headers = new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.UserAuth.accessToken}`,
      });
    return headers;
  }
}
