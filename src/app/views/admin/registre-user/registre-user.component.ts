import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Role } from 'src/app/controller/model/role';
import { User } from 'src/app/controller/model/user';
import { UserRole } from 'src/app/controller/model/user-role';
import { UserService } from 'src/app/controller/service/user.service';

@Component({
  selector: 'app-registre-user',
  templateUrl: './registre-user.component.html',
  styleUrls: ['./registre-user.component.scss']
})
export class RegistreUserComponent implements OnInit {
  loading: boolean = true;
  displayBasic2: boolean = false;
  displayEdite: boolean = false;
  submittedUtilisateur: boolean = false;
  lots:any[]=[];
  piloteList = new Array<User>();
  responsablleList = new Array<User>();
  constructor(private userService: UserService, private router: Router) { }
    clear(table: Table) {
        table.clear();
    }
  FindAllUsers(){
       this.userService.FindAllUsers().subscribe((data) => {
      // @ts-ignore
      this.UserList = data.body;
      this.loading = false;
      for(let i = 0; i<this.UserList.length;i++){
        if(this.UserList[i].roles[0].name== "ROLE_PILOTE"){
          this.piloteList.push(this.UserList[i]);
        } else  if(this.UserList[i].roles[0].name== "ROLE_RESPONSABLE"){
          this.responsablleList.push(this.UserList[i]);
        } 
      }
    }
    );
  }
  
  ngOnInit(): void {
    this.FindAllUsers();
    this.userService.FindAllRoles().subscribe((data) => {
      // @ts-ignore
      this.RoleList = data.body;
    }
    );
    this.lots= [
      {name: '3B'},
      {name: '7B'},
  ];
  }
  showBasicDialog2() {
    this.displayBasic2 = true;
}
showDialogEdite(user: User) {
  this.EditeUser.user = user;
  this.EditeUser.idRole = user.roles[0].id;
  this.displayEdite = true;
}
  get UserList(): Array<User> {
    return this.userService.UserList;
  }
  set UserList(value: Array<User>) {
    this.userService.UserList = value;
  }
  get RoleList(): Array<Role> {
    return this.userService.RoleList;
  }
  set RoleList(value: Array<Role>) {
    this.userService.RoleList = value;
  }
  get AddUser(): UserRole{
    return this.userService.AddUser;
  }

  set AddUser(value: UserRole) {
    this.userService.AddUser = value;
  }
  get EditeUser(): UserRole{
    return this.userService.EditeUser;
  }

  set EditeUser(value: UserRole) {
    this.userService.EditeUser = value;
  }
  SaveUser(){
    this.submittedUtilisateur = true;
    this.AddUser.user.username=this.AddUser.user.prenom+'.'+this.AddUser.user.nom;
    this.AddUser.user.password=this.AddUser.user.username;
    this.userService.SaveUser().subscribe((data) => {
           this.AddUser=new UserRole;
           this.FindAllUsers();
           this.displayBasic2 = false;
           this.submittedUtilisateur = false;

    })

  }
  UpdateUser(){
    this.submittedUtilisateur = true;
    this.EditeUser.user.username=this.EditeUser.user.prenom+'.'+this.EditeUser.user.nom;
    this.EditeUser.user.password=this.EditeUser.user.username;
    console.log('eddited :'+ JSON.stringify(this.EditeUser.user));
    
    this.userService.UpdateUser().subscribe((data) => {
           this.submittedUtilisateur = true;
           this.EditeUser =new UserRole;
           this.FindAllUsers();
           this.displayEdite = false;
    })

  }
}
