import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Application } from 'src/app/controller/model/application';
import { DestinataireCommunication } from 'src/app/controller/model/destinataire-communication';
import { PiloteApplication } from 'src/app/controller/model/pilote-application';
import { User } from 'src/app/controller/model/user';
import { ApplicationService } from 'src/app/controller/service/application.service';
import { AuthService } from 'src/app/controller/service/auth.service';
import { DestinataireService } from 'src/app/controller/service/destinataire.service';
import { UserService } from 'src/app/controller/service/user.service';

@Component({
  selector: 'app-registre-application-of-pilote',
  templateUrl: './registre-application-of-pilote.component.html',
  styleUrls: ['./registre-application-of-pilote.component.scss']
})
export class RegistreApplicationOfPiloteComponent implements OnInit {
  emailsObli:String=String();
  emailsCC:String=String();
  loading: boolean = true;
  loadingDest: boolean = true;
  displayDestinataire: boolean=false;
  dialogAddDest: boolean=false;
  spinner: boolean=false;
  popupAjoutList: boolean=false;
  TypeDest:any[]=[];
  listApp: Array<PiloteApplication>=new  Array<PiloteApplication>();
  emailListObl: string[] = [];
  emailListCC: string[] = [];
  listDestObl:Array<DestinataireCommunication>=new Array<DestinataireCommunication>;
  listDestCC:Array<DestinataireCommunication>=new Array<DestinataireCommunication>;
  listAllDest:Array<DestinataireCommunication>=new Array<DestinataireCommunication>;
  pageSize: number = 10;
  page: number = 0;
  first: number = 0;
  totalRecords: number = 0;
  currentPageReportTemplate: string = '';
  filterDest:DestinataireCommunication=new DestinataireCommunication();
  statutDest: any[] = [];
  searchActive:boolean=false;
  constructor(private appService: ApplicationService, private userService: UserService,private authService : AuthService,
    private cdRef: ChangeDetectorRef,private messageService: MessageService,private destinataireService: DestinataireService, private router: Router) { }
  clear(table: Table) {
    table.clear();
  }
  clearDest() {
    this.searchActive = false;
    this.filterDest= new DestinataireCommunication();
    this.loadLazy({ first: 0, rows: this.pageSize });
  }

  get User(): User {
    return this.authService.User;
  }

  set User(value: User) {
    this.authService.User = value;
  }
  ngOnInit(): void {
    this.FindApp();
    this.cdRef.detectChanges();
    this.TypeDest= [
      {name: 'Obligatoire'},
      {name: 'en CC'},
    ];
    this.statutDest= [
      {name: 'Valider'},
      {name: 'En Attente'},
    ]
  }
OnHidAddDest(){
  this.AddDestinataire.email= '';
  this.AddDestinataire.typeDest= '';
}
OnHidPopUpList(){
  this.emailsObli= '';
  this.emailsCC= '';
}
FindApp() {
  this.appService.FindApplicationByPilote().subscribe((data) => {
      // @ts-ignore
    this.ListApplicationOfPilote = data.body;
    this.loading = false;
    })
}

  get ListApplicationOfPilote(): Array<PiloteApplication>{
    return this.appService.ListApplicationOfPilote;
  }

  set ListApplicationOfPilote(value: Array<PiloteApplication>) {
    this.appService.ListApplicationOfPilote = value;
  }

  get ListDestinataireApp(): Array<DestinataireCommunication>{
    return this.destinataireService.ListDestinataireApp;
  }

  set ListDestinataireApp(value: Array<DestinataireCommunication>) {
    this.destinataireService.ListDestinataireApp = value;
  }
  get AddDestinataire(): DestinataireCommunication{
    return this.destinataireService.AddDestinataire;
  }

  set AddDestinataire(value: DestinataireCommunication) {
    this.destinataireService.AddDestinataire = value;
  }

showDestinataire(app:Application){
  this.AddDestinataire.application=app;
  this.loadLazy({ first: 0, rows: this.pageSize });
}
loadLazy(event: LazyLoadEvent): void {
  this.loadingDest = true;
  this.destinataireService.FindPagesDestinataireByApplication(this.page, this.pageSize).subscribe((data) => {
    //@ts-ignore
    this.ListDestinataireApp = data.body.content;
    //@ts-ignore
    this.totalRecords = data.body.totalElements;
    this.currentPageReportTemplate = `Showing ${this.first + 1} to ${this.first + this.pageSize} of ${this.totalRecords} entries`;
    this.loadingDest = false;
    this.displayDestinataire=true;
  });
}
lazyLoadHandler(event: LazyLoadEvent): void {

  if( this.searchActive==true){
    if (event.first !== this.first || event.rows !== this.pageSize) {
      this.first = event.first ?? 0;
      this.pageSize = event.rows ?? 10;
      this.page = Math.floor(this.first / this.pageSize);
    this.searchDest();
    }
  }else{
  if (event.first !== this.first || event.rows !== this.pageSize) {
    this.first = event.first ?? 0;
    this.pageSize = event.rows ?? 10;
    this.page = Math.floor(this.first / this.pageSize);
    // Only trigger the loadIncidentsLazy function if the page or pageSize has changed
    this.loadLazy(event);
  }}
}
searchDest(){
  this.loadingDest = true;
  if(!this.filterDest.email && !this.filterDest.typeDest && !this.filterDest.statutRespo){
    this.clearDest();
  }else{
  this.destinataireService.SearchDest(this.filterDest,this.page, this.pageSize).subscribe((data)=>{
    this.searchActive=true;
    //@ts-ignore
    this.ListDestinataireApp = data.body.content;
    //@ts-ignore
    this.totalRecords = data.body.totalElements;
    this.currentPageReportTemplate = `Showing ${this.first + 1} to ${this.first + this.pageSize} of ${this.totalRecords} entries`;
    this.loadingDest = false;
    this.displayDestinataire=true;
  })}
}
SaveListDest(){
  this.spinner = true;
  if(this.emailsObli != null || this.emailsCC !=null){
  if(this.emailsObli){
  let dest: DestinataireCommunication;
  if (this.emailsObli.includes('<') && this.emailsObli.includes('>')) {
  const regex = /<([^>]+)>/g;
  this.emailListObl = this.emailsObli.match(regex)?.map(email => email.slice(1, -1)) || [];
  }else {
  this.emailListObl = this.emailsObli.split(';').map(email => email.trim());
  }
  this.listDestObl = this.emailListObl.map(email => {
    dest = new DestinataireCommunication();
    dest.email = email;
    dest.typeDest = 'Obligatoire';
    dest.application = this.AddDestinataire.application;
    return dest;
  });  
}
if(this.emailsCC){
  let dest: DestinataireCommunication;
  if (this.emailsCC.includes('<') && this.emailsCC.includes('>')) {
    const regex = /<([^>]+)>/g;
    this.emailListCC = this.emailsCC.match(regex)?.map(email => email.slice(1, -1)) || [];
    }else {
    this.emailListCC = this.emailsCC.split(';').map(email => email.trim());
    }
  this.listDestCC = this.emailListCC.map(email => {
    dest = new DestinataireCommunication();
    dest.email = email;
    dest.typeDest = 'en CC';
    dest.application = this.AddDestinataire.application;
    return dest;
  });
}
this.listAllDest = new Array<DestinataireCommunication>();
this.listAllDest = this.listDestCC.concat(this.listDestObl);
console.log('cc '+JSON.stringify(this.listAllDest));
this.destinataireService.SaveAllDestinataire(this.listAllDest).subscribe((data) => {
      this.spinner = false;
      this.popupAjoutList = false;
      this.showDestinataire(this.AddDestinataire.application);
      this.emailsObli= '';
      this.emailsCC= '';
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Destinataire Ajouter avec succès'});
          },error=>{
            this.spinner = false;
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement'});
    })
    }else{
      this.spinner = false;
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
    }
}

SaveDestinataire(){
  this.spinner = true;
  if(this.AddDestinataire.email != null && this.AddDestinataire.typeDest !=null){
    this.destinataireService.SaveDestinataire().subscribe((data) => {
      this.spinner = false;
      this.dialogAddDest = false;
      this.showDestinataire(this.AddDestinataire.application);
      this.AddDestinataire.email= '';
      this.AddDestinataire.typeDest= '';
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Destinataire Ajouter avec succès'});
          },error=>{
            this.spinner = false;
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement'});
    })
    }else{
      this.spinner = false;
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
    }
}
Valider(dest: DestinataireCommunication){
  this.appService.ValiderDest(dest).subscribe((data) => {
    this.showDestinataire(this.AddDestinataire.application);
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Destinataire Valider avec succès'});
  },error=>{
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de la validation'});
})

}
Refuser(dest: DestinataireCommunication){
  this.appService.RetirerDest(dest).subscribe((data) => {
    this.showDestinataire(this.AddDestinataire.application);
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Destinataire Retirer avec succès'});
  },error=>{
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur'});
})
}
}
