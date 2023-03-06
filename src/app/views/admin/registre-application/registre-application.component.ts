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
  piloteList = new Array<User>();
  responsablleList = new Array<User>();
  submittedPilote: boolean = false;
  App: Application = new Application();
  constructor(private appService: ApplicationService, private userService: UserService,
     private router: Router, private charteService: CharteService) { }
  clear(table: Table) {
    table.clear();
  }
showInc(){
  this.charteIncident3BfrAng =true;
}
  ngOnInit(): void {
    this.FindAllApp();
  }

  FindAllApp() {
    this.appService.FindAllApplcation().subscribe((data) => {
      // @ts-ignore
      this.ListApplication = data.body;
      this.loading = false;
      console.log('FirstApp : ' + JSON.stringify(this.ListApplication[0]));

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
    console.log(app.nomApplication);
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
    console.log('content pilote :'+JSON.stringify(this.AddPiloteApp));
    
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
      this.loading = false;
      for (let i = 0; i < this.UserList.length; i++) {
        if (this.UserList[i].roles[0].name == "ROLE_PILOTE") {
          this.piloteList.push(this.UserList[i]);
        }
      }
    }
    );
  }

  get charteIncident3BfrAng(): boolean {
    return this.charteService.charteIncident3BfrAng;
  }

  set charteIncident3BfrAng(value: boolean) {
    this.charteService.charteIncident3BfrAng = value;
  }
}
