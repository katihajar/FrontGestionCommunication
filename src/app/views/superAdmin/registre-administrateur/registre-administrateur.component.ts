import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Role } from 'src/app/controller/model/role';
import { User } from 'src/app/controller/model/user';
import { UserRole } from 'src/app/controller/model/user-role';
import { AdminService } from 'src/app/controller/service/admin.service';
import { UserService } from 'src/app/controller/service/user.service';

@Component({
  selector: 'app-registre-administrateur',
  templateUrl: './registre-administrateur.component.html',
  styleUrls: ['./registre-administrateur.component.scss']
})
export class RegistreAdministrateurComponent {
  spinner:boolean=false;
  loading: boolean = true;
  displayBasicSuperAdmin2: boolean = false;
  displayEditeSuperAdmin: boolean = false;
  submittedUtilisateurSuperAdmin: boolean = false;
  lots:any[]=[];
  piloteList = new Array<User>();
  responsablleList = new Array<User>();
  list= new Array<User>();
  role= new Role();
  constructor(private userService: AdminService, private router: Router,private messageService: MessageService) { }
    clear(table: Table) {
        table.clear();
    }
  FindAllUsers(){
       this.userService.FindAllUsers().subscribe((data) => {
      // @ts-ignore
      this.UserList = data.body;
      this.loading = false;
    }
    );
  }
  isSubmitDisabled(){
    return !this.AddUser.user.prenom || this.AddUser.user.prenom.length <3 || !this.AddUser.user.nom || this.AddUser.user.nom.length <3||  !this.AddUser.user.lots;
  }
  isSubmitDisabledEdite(){
    return !this.EditeUser.user.prenom || this.EditeUser.user.prenom.length <3 || !this.EditeUser.user.nom || this.EditeUser.user.nom.length <3||  !this.EditeUser.user.lots;
  }
  ngOnInit(): void {
    this.RoleList= new Array<Role>();
    this.role= new Role();
    this.FindAllUsers();
    this.userService.FindRoleAdmin().subscribe((data) => {
      // @ts-ignore
      this.role = data.body;
    }
    );
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
    this.displayBasicSuperAdmin2 = true;
}
showDialogEdite(user: User) {
  this.EditeUser.user = user;
  this.EditeUser.idRole = user.roles[0].id;
  this.displayEditeSuperAdmin = true;
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
    this.spinner=true;
    this.submittedUtilisateurSuperAdmin = true;
    this.AddUser.idRole=this.role.id;
    this.AddUser.user.username=this.AddUser.user.prenom+'.'+this.AddUser.user.nom;
    if(this.AddUser.user.prenom != '' && this.AddUser.user.nom != '' && this.AddUser.idRole !=null && this.AddUser.user.lots !=''){
    this.userService.SaveUser().subscribe((data) => {
           this.AddUser=new UserRole;           
           this.FindAllUsers();
           this.spinner=false;
           this.displayBasicSuperAdmin2 = false;
           this.submittedUtilisateurSuperAdmin = false;
           this.messageService.add({severity:'success', summary: 'Success', detail: 'Utilisateur Ajouter avec succès'});
    },error=>{
      this.spinner=false;
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement'});
    })
  }else{
    this.spinner=false;
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
}
  }
  UpdateUser(){
    this.spinner=true;
    this.submittedUtilisateurSuperAdmin = true;
    this.EditeUser.idRole=this.role.id;
    this.EditeUser.user.username=this.EditeUser.user.prenom+'.'+this.EditeUser.user.nom;
    this.userService.UpdateUser().subscribe((data) => {
           this.submittedUtilisateurSuperAdmin = true;
           this.EditeUser =new UserRole;
           this.FindAllUsers();
           this.spinner=false;
           this.displayEditeSuperAdmin = false;
           this.messageService.add({severity:'success', summary: 'Success', detail: 'Utilisateur Modifier avec succès'});

          },error=>{
            this.spinner=false;
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de la modification'});
          
    })

  }
}
