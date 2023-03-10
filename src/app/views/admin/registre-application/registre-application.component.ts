import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Application } from 'src/app/controller/model/application';
import { PiloteApplication } from 'src/app/controller/model/pilote-application';
import { User } from 'src/app/controller/model/user';
import { ApplicationService } from 'src/app/controller/service/application.service';
import { CharteService } from 'src/app/controller/service/charte.service';
import { UserService } from 'src/app/controller/service/user.service';

@Component({
  selector: 'app-registre-application',
  templateUrl: './registre-application.component.html',
  styleUrls: ['./registre-application.component.scss']
})
export class RegistreApplicationComponent implements OnInit {
  loading: boolean = true;
  displayPilote: boolean = false;
  AjouterPilote: boolean = false;
  ModifApp: boolean =false;
  piloteList = new Array<User>();
  submittedPilote: boolean = false;
  submittedModif: boolean = false;
  App: Application = new Application();
  responsableList = new Array<User>();
  disponibilite:any[]=[];
  constructor(private appService: ApplicationService, private userService: UserService,
     private router: Router, private charteService: CharteService) { }
  clear(table: Table) {
    table.clear();
  }

  ngOnInit(): void {
    this.FindAllApp();
    this.FindAllUsers();
    this.disponibilite= [
      {name: 'Oui'},
      {name: 'Non'},
  ];
  }

  FindAllApp() {
    this.appService.FindAllApplcation().subscribe((data) => {
      // @ts-ignore
      this.ListApplication = data.body;
      this.loading = false;
    })
  }
  get ListApplication(): Array<Application> {
    return this.appService.ListApplication;
  }
  set ListApplication(value: Array<Application>) {
    this.appService.ListApplication = value;
  }

  get ListPiloteApplication(): Array<PiloteApplication> {
    return this.appService.ListPiloteApplication;
  }

  set ListPiloteApplication(value: Array<PiloteApplication>) {
    this.appService.ListPiloteApplication = value;
  }
  get AddPiloteApp(): PiloteApplication {
    return this.appService.AddPiloteApp;
  }
  set AddPiloteApp(value: PiloteApplication) {
    this.appService.AddPiloteApp = value;
  }
  FindListPilote(app: Application) {
    this.AddPiloteApp.application = app;
    this.App=app;
    this.appService.FindAllPiloteApplcation(app.nomApplication).subscribe((data) => {
      // @ts-ignore
      this.ListPiloteApplication = data.body;
      this.displayPilote = true;
      this.FindAllUsers();
    });
  }
  RouteFormAddApp() {
    this.router.navigate(['/admin/application/save']);
  }
  get UserList(): Array<User> {
    return this.userService.UserList;
  }
  set UserList(value: Array<User>) {
    this.userService.UserList = value;
  }
  AddPilote() {
    this.AjouterPilote = true;
  }
  SavePiloteToApp(){    
    this.appService.SavePiloteToApp().subscribe((data)=>{
      this.FindListPilote(this.App);
      this.AddPiloteApp = new PiloteApplication;
      this.AjouterPilote = false;
    })
  }
  FindAllUsers() {
    this.userService.FindAllUsers().subscribe((data) => {
      // @ts-ignore
      this.UserList = data.body;
      for(let i = 0; i<this.UserList.length;i++){
        if(this.UserList[i].roles[0].name== "ROLE_PILOTE"){
          this.piloteList.push(this.UserList[i]);
        } else if(this.UserList[i].roles[0].name== "ROLE_RESPONSABLE"){
          this.responsableList.push(this.UserList[i]);
        } 
      }
    }
    );
  }
  ShowModifDialog(app: Application){
    this.ModifApp = true;
  }


}
