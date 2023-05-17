import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private userService: UserService, private appService : ApplicationService,private messageService: MessageService,private router: Router) { }

  ngOnInit(): void {
    this.FindAllUsers();
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
     if(this.UserList[i].roles[0].name== "ROLE_PILOTE" && this.AddApplication.lot == this.UserList[i].lots){
       this.piloteList.push(this.UserList[i]);
     } else  if(this.UserList[i].roles[0].name== "ROLE_RESPONSABLE" && this.AddApplication.lot == this.UserList[i].lots){
       this.responsableList.push(this.UserList[i]);
     } 
   }
 }
 );
}
isSubmitDisabled(){
  return !this.AddApplication.nomApplication || this.AddApplication.nomApplication.length <3 || !this.AddApplication.responsable || !this.AddApplication.disponibilite || !this.AddApplication.lot || !this.AddApplication.charteIncident || this.ListpiloteSelected.length == 0;
}
AddPilote(){
  let m =this.ListpiloteSelected.indexOf(this.selectedPiloteApp);
  if(this.selectedPiloteApp.pilote.nom != null && m==-1){
  this.ListpiloteSelected.push(this.selectedPiloteApp);
  this.selectedPiloteApp = new PiloteApplication();
}else{
  this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
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
  if(this.AddApplication.nomApplication != ''  &&this.AddApplication.responsable.nom != '' && this.AddApplication.charteIncident !=''){
  this.appService.SaveApplication().subscribe((data) => {
         this.AddApplication=new Application;
         this.piloteList = new Array<User>();
         this.FindAllUsers();
         this.submittedApplication = false;
         this.ListpiloteSelected = new Array<PiloteApplication>();
         this.messageService.add({severity:'success', summary: 'Success', detail: 'Application Ajouter avec succès'});
         this.router.navigate(['/admin/application/register']);
        },error=>{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement'});
  })
  }else{
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
  }
}
}
