import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../model/role';
import { User } from '../model/user';
import { UserRole } from '../model/user-role';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = environment.baseUrlSuperAdmin;
  private _UserList: Array<User> = new Array<User>();
  private _RoleList: Array<Role> = new Array<Role>();
  private _AddUser: UserRole = new UserRole();
  private _EditeUser: UserRole = new UserRole();
  constructor(private http: HttpClient,private auth: AuthService) { }

  get EditeUser(): UserRole{
    if(this._EditeUser == null){
      this._EditeUser = new UserRole();
    }
    return this._EditeUser;
  }

  set EditeUser(value: UserRole) {
    this._EditeUser = value;
  }

  get AddUser(): UserRole{
    if(this._AddUser == null){
      this._AddUser = new UserRole();
    }
    return this._AddUser;
  }

  set AddUser(value: UserRole) {
    this._AddUser = value;
  }

  get RoleList(): Array<Role>{
    if(this._RoleList == null){
      this._RoleList = new Array<Role>();
    }
    return this._RoleList;
  }

  set RoleList(value: Array<Role>) {
    this._RoleList = value;
  }

  get UserList(): Array<User>{
    if(this._UserList == null){
      this._UserList = new Array<User>();
    }
    return this._UserList;
  }

  set UserList(value: Array<User>) {
    this._UserList = value;
  }


  public FindAllUsers(): Observable<HttpResponse<Array<User>>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Array<User>>(
      this.url + 'users/',
      { observe: 'response', headers }
    );    
  }

  public FindRoleAdmin(): Observable<HttpResponse<Role>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.get<Role>(
      this.url + 'roles/adminRole',
      { observe: 'response', headers }
    );    
  }

  public SaveUser(): Observable<HttpResponse<User>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.post<User>(
      this.url + 'users/saveUser',this.AddUser,
      { observe: 'response', headers }
    );    
  }
  public UpdateUser(): Observable<HttpResponse<User>> {
    const headers: HttpHeaders = this.auth.tokenHeaders();
    return this.http.put<User>(
      this.url + 'users/UpdateUser',this.EditeUser,
      { observe: 'response', headers }
    );    
  }
}
