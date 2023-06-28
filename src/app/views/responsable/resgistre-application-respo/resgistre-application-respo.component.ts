import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Application } from 'src/app/controller/model/application';
import { DestinataireCommunication } from 'src/app/controller/model/destinataire-communication';
import { PiloteApplication } from 'src/app/controller/model/pilote-application';
import { ApplicationRespoService } from 'src/app/controller/service/application-respo.service';
import { ApplicationService } from 'src/app/controller/service/application.service';
import { DestinataireService } from 'src/app/controller/service/destinataire.service';
import { UserService } from 'src/app/controller/service/user.service';

@Component({
  selector: 'app-resgistre-application-respo',
  templateUrl: './resgistre-application-respo.component.html',
  styleUrls: ['./resgistre-application-respo.component.scss']
})
export class ResgistreApplicationRespoComponent implements OnInit {
  pageSize: number = 10;
  page: number = 0;
  first: number = 0;
  totalRecords: number = 0;
  currentPageReportTemplate: string = '';
  filterDest:DestinataireCommunication=new DestinataireCommunication();
  statutDest: any[] = [];
  TypeDest: any[] = [];
  searchActive:boolean=false;
  loading: boolean = true;
  displayDestinataire: boolean=false;
  loadingDest: boolean = true;
  constructor(private appService: ApplicationRespoService, private userService: UserService,
    private messageService: MessageService,private destinataireService: DestinataireService, private router: Router) { }
  clear(table: Table) {
    table.clear();
  }
  clearDest() {
    this.searchActive = false;
    this.filterDest= new DestinataireCommunication();
    this.loadLazy({ first: 0, rows: this.pageSize });
  }
  ngOnInit(): void {
    this.FindApp();
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
  this.AddDestinataire = new DestinataireCommunication();
}
  FindApp() {
    this.appService.FindApplicationByRespo().subscribe((data) => {
      // @ts-ignore
      this.ListApplication = data.body;
      this.loading = false;
    })
  }

  get ListApplication(): Array<Application>{
    return this.appService.ListApplication;
  }

  set ListApplication(value: Array<Application>) {
    this.appService.ListApplication = value;
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
  this.destinataireService.FindDestinataireByApplicationByResp(this.page, this.pageSize).subscribe((data) => {
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
  this.destinataireService.SearchDestRespo(this.filterDest,this.page, this.pageSize).subscribe((data)=>{
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
Valider(dest: DestinataireCommunication){
  this.appService.ValiderDest(dest).subscribe((data) => {
    this.loadLazy({ first: 0, rows: this.pageSize });
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Destinataire Valider avec succès'});
  },error=>{
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de la validation'});
})

}
Refuser(dest: DestinataireCommunication){
  this.appService.RetirerDest(dest).subscribe((data) => {
    this.loadLazy({ first: 0, rows: this.pageSize });
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Destinataire Retirer avec succès'});
  },error=>{
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur'});
})
}
}
