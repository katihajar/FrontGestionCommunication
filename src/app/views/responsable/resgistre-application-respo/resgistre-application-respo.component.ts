import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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

  loading: boolean = true;
  displayDestinataire: boolean=false;
  constructor(private appService: ApplicationRespoService, private userService: UserService,
    private messageService: MessageService,private destinataireService: DestinataireService, private router: Router) { }
  clear(table: Table) {
    table.clear();
  }

  ngOnInit(): void {
    this.FindApp();

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
FindDest(app:Application){
    this.destinataireService.FindDestinataireByApplicationByResp(app.id).subscribe((data)=>{
    // @ts-ignore
    this.ListDestinataireApp = data.body;
    this.displayDestinataire=true;
  })
}
showDestinataire(app:Application){
  this.AddDestinataire.application=app;
  this.FindDest(app);
}

Valider(dest: DestinataireCommunication){
  this.appService.ValiderDest(dest).subscribe((data) => {
    this.FindDest(this.AddDestinataire.application);
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Destinataire Valider avec succès'});
  },error=>{
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de la validation'});
})

}
Refuser(dest: DestinataireCommunication){
  this.appService.RetirerDest(dest).subscribe((data) => {
    this.FindDest(this.AddDestinataire.application);
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Destinataire Retirer avec succès'});
  },error=>{
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur'});
})
}
}
