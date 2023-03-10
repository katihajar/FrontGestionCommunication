import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Application } from 'src/app/controller/model/application';
import { PiloteApplication } from 'src/app/controller/model/pilote-application';
import { User } from 'src/app/controller/model/user';
import { ApplicationService } from 'src/app/controller/service/application.service';
import { UserService } from 'src/app/controller/service/user.service';

@Component({
  selector: 'app-ajouter-application',
  templateUrl: './ajouter-application.component.html',
  styleUrls: ['./ajouter-application.component.scss']
})
export class AjouterApplicationComponent implements OnInit {
  lots:any[]=[];
  charte:any[]=[];
  disponibilite:any[]=[];
  piloteList = new Array<User>();
  responsableList = new Array<User>();
  selectedPiloteApp = new PiloteApplication();
  ListpiloteSelected = new Array<PiloteApplication>();
  submittedApplication: boolean = false;
  constructor(private userService: UserService, private appService : ApplicationService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.FindAllUsers();
    this.lots= [
      {name: '3B'},
      {name: '7B'},
  ];
  this.disponibilite= [
    {name: 'Oui'},
    {name: 'Non'},
];
this.charte= [
  {name: 'charte Incident'},
  {name: 'charte Incident Monetics'},
];
  }
  FindAllUsers(){
    this.userService.FindAllUsers().subscribe((data) => {
   // @ts-ignore
   this.UserList = data.body;
   for(let i = 0; i<this.UserList.length;i++){
     if(this.UserList[i].roles[0].name== "ROLE_PILOTE"){
       this.piloteList.push(this.UserList[i]);
     } else  if(this.UserList[i].roles[0].name== "ROLE_RESPONSABLE"){
       this.responsableList.push(this.UserList[i]);
     } 
   }
 }
 );
}
AddPilote(){
  let m =this.ListpiloteSelected.indexOf(this.selectedPiloteApp);
  if(this.selectedPiloteApp.pilote.nom != null && m==-1){
  this.ListpiloteSelected.push(this.selectedPiloteApp);
  this.selectedPiloteApp = new PiloteApplication();
}else{
  console.log('Accun pilote selectionné');
  
}
}
removePilote(us:PiloteApplication){
  let i = this.ListpiloteSelected.indexOf(us);
  this.ListpiloteSelected.splice(i,1);

}

get UserList(): Array<User> {
  return this.userService.UserList;
}
set UserList(value: Array<User>) {
  this.userService.UserList = value;
}

get AddApplication(): Application {
  return this.appService.AddApplication;
}
set AddApplication(value: Application) {
  this.appService.AddApplication = value;
}
SaveApp(){
  this.submittedApplication = true;
  this.AddApplication.piloteApplicationList =  this.ListpiloteSelected;
  if(this.AddApplication.nomApplication != null && this.AddApplication.version != null &&this.AddApplication.responsable.nom != null && this.AddApplication.charteIncident !=null){
  this.appService.SaveApplication().subscribe((data) => {
         this.AddApplication=new Application;
         this.FindAllUsers();
         this.submittedApplication = false;
         this.ListpiloteSelected = new Array<PiloteApplication>();
         this.messageService.add({severity:'success', summary: 'Success', detail: 'Application Ajouter avec succès'});
        },error=>{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement'});
  })
  }else{
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
  }
}
}
