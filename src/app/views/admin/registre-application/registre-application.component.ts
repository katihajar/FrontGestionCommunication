import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
  charte:any[]=[];
  charteChange:any[]=[];
  constructor(private appService: ApplicationService, private userService: UserService,private messageService: MessageService,
    private cdRef: ChangeDetectorRef,private router: Router, private charteService: CharteService) { }
  clear(table: Table) {
    table.clear();
  }

  ngOnInit(): void {
    this.FindAllApp();
    this.charte= [
      {name: 'charte Incident'},
      {name: 'charte Incident Monetics'},
    ];
    this.charteChange= [
      {name: 'charte Changement'},
      {name: 'charte Changement Monetics'},
    ];
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
    this.FindAllUsers();
    this.AjouterPilote = true;
    this.cdRef.detectChanges();

  }
  SavePiloteToApp(){   
    const match = this.ListPiloteApplication.find(etat => etat.pilote.id === this.AddPiloteApp.pilote.id);
    if (match) {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'ce pilote existe déja.' });
    } else {
    this.appService.SavePiloteToApp().subscribe((data)=>{
      this.FindListPilote(this.App);
      this.AddPiloteApp = new PiloteApplication;
      this.AjouterPilote = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Pilote Ajouté avec succesé' });

    },error=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement'});
    
})
  }
  }
  FindAllUsers() {
    this.userService.FindAllUsers().subscribe((data) => {
      // @ts-ignore
      this.UserList = data.body;
      console.log(this.UserList);
      
      this.piloteList = new Array<User>();
      for (const user of this.UserList) {
        if (user.roles && user.roles.length > 0) {
          const roleName = user.roles[0].name;
          if (roleName == "ROLE_PILOTE" ) {
            this.piloteList.push(user);
          } else if (roleName == "ROLE_RESPONSABLE") {            
            this.responsableList.push(user);
            console.log(this.responsableList);
          }
        }
      }
      this.cdRef.detectChanges(); // Manually trigger change detection
    });
  }
  
  ShowModifDialog(app: Application){
    this.EditeApplication=app;
    this.FindAllUsers();
    this.ModifApp = true;
  }
  get EditeApplication(): Application{
    return this.appService.EditeApplication;
  }

  set EditeApplication(value: Application) {
    this.appService.EditeApplication = value;
  }
  diasbleUpdate(){
    return !this.EditeApplication.disponibilite && !this.EditeApplication.responsable && !this.EditeApplication.charteChangement && !this.EditeApplication.charteIncident;
  }
  updateApp(){
    this.appService.UpdateApplication().subscribe((data)=>{
      this.EditeApplication= new Application();
      this.FindListPilote(this.App);
      this.AddPiloteApp = new PiloteApplication;
      this.ModifApp = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Application modifier avec succesé' });
    },error=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de la modification'});
    
});
  }
}
