import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Userauth } from '../model/userauth';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  private _dialogpassword: boolean = false;
  private url = environment.baseUrl;
  constructor(private http: HttpClient,private auth: AuthService) { }

  get dialogpassword(): boolean {
    return this._dialogpassword;
  }

  set dialogpassword(value: boolean) {
    this._dialogpassword = value;
  }
   changepass(newpass:String,pass:String): Observable<HttpResponse<Userauth>> {
    const headers: HttpHeaders = this.auth.initHeaders();
    return this.http.put<Userauth>(
      this.url + '/api/auth/resetpass',
       {id:this.auth.User.id,newpass:newpass,pass:pass} ,
      { observe: 'response', headers }
    );
  }
}
