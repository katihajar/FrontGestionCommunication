import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Role } from 'src/app/controller/model/role';
import { User } from 'src/app/controller/model/user';
import { UserRole } from 'src/app/controller/model/user-role';
import { UserService } from 'src/app/controller/service/user.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-registre-user',
  templateUrl: './registre-user.component.html',
  styleUrls: ['./registre-user.component.scss']
})
export class RegistreUserComponent implements OnInit {
  spinner: boolean = false;
  loading: boolean = true;
  displayBasic2: boolean = false;
  displayEdite: boolean = false;
  submittedUtilisateur: boolean = false;
  lots:any[]=[];
  piloteList = new Array<User>();
  responsablleList = new Array<User>();
  list= new Array<User>();
  listRole= new Array<Role>();
  constructor(private userService: UserService,private cdRef: ChangeDetectorRef, private router: Router,private messageService: MessageService) { }
    clear(table: Table) {
        table.clear();
    }
  FindAllUsers(){
    this.list =new Array<User>();
    this.UserList =new Array<User>();
    this.piloteList=new Array<User>();
    this.responsablleList=new Array<User>();
       this.userService.FindAllUsers().subscribe((data) => {
      // @ts-ignore
      this.UserList = data.body;
      for(let i = 0; i<this.UserList.length;i++){
        if(this.UserList[i].roles[0].name== "ROLE_PILOTE"){
          this.piloteList.push(this.UserList[i]);
        } else  if(this.UserList[i].roles[0].name== "ROLE_RESPONSABLE"){
          this.responsablleList.push(this.UserList[i]);
        } 
      }
      this.cdRef.detectChanges();
      this.loading=false;
    }
    );
  }
  isSubmitDisabled(){
    return !this.AddUser.user.prenom || this.AddUser.user.prenom.length <3 || !this.AddUser.user.nom || this.AddUser.user.nom.length <3||  !this.AddUser.idRole;
  }
  ngOnInit(): void {
    this.RoleList= new Array<Role>();
    this.listRole= new Array<Role>();
    this.FindAllUsers();
    this.userService.FindAllRoles().subscribe((data) => {
      // @ts-ignore
      this.listRole = data.body;
      for(let i =0;i<this.listRole.length;i++){
        if(this.listRole[i].name=="ROLE_RESPONSABLE" ||this.listRole[i].name=="ROLE_PILOTE"){
          this.RoleList.push(this.listRole[i]);
        }
      }
    }
    );
    this.cdRef.detectChanges();
    this.lots= [
      {name: '1'},
      {name: '2'},
      {name: '3B'},
      {name: '5'},
      {name: '6'},
      {name: '7 EDI'},
      {name: '7 EDD'},
      {name: '9'},
      {name: 'BI'},
      {name: 'VERSPA'}
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
    this.spinner =true;
    this.submittedUtilisateur = true;
    this.AddUser.user.username=this.AddUser.user.prenom+'.'+this.AddUser.user.nom;
    if(this.AddUser.user.prenom != '' && this.AddUser.user.nom != '' && this.AddUser.idRole !=null){
    this.userService.SaveUser().subscribe((data) => {
      this.FindAllUsers();
           this.AddUser=new UserRole;
           this.spinner =false;
           this.displayBasic2 = false;
           this.submittedUtilisateur = false;
           this.messageService.add({severity:'success', summary: 'Success', detail: 'Utilisateur Ajouter avec succès'});

    },error=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement'});
    })
  }else{
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
  }
  }
  UpdateUser(){
    this.spinner =true;
    this.submittedUtilisateur = true;
    this.EditeUser.user.username=this.EditeUser.user.prenom+'.'+this.EditeUser.user.nom;
    this.userService.UpdateUser().subscribe((data) => {
      this.FindAllUsers();
           this.submittedUtilisateur = false;
           this.EditeUser =new UserRole;
           this.spinner =false;
           this.displayEdite = false;
           this.messageService.add({severity:'success', summary: 'Success', detail: 'Utilisateur Modifier avec succès'});

          },error=>{
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de la modification'});
          
    })

  }
}
