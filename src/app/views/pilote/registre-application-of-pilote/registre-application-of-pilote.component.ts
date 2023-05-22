import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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

  loading: boolean = true;
  displayDestinataire: boolean=false;
  dialogAddDest: boolean=false;
  TypeDest:any[]=[];
  listApp: Array<PiloteApplication>=new  Array<PiloteApplication>();
  constructor(private appService: ApplicationService, private userService: UserService,private authService : AuthService,
    private cdRef: ChangeDetectorRef,private messageService: MessageService,private destinataireService: DestinataireService, private router: Router) { }
  clear(table: Table) {
    table.clear();
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
    ]
  }
OnHidAddDest(){
  this.AddDestinataire.nom= '';
  this.AddDestinataire.email= '';
  this.AddDestinataire.prenom= '';
  this.AddDestinataire.typeDest= '';
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
  this.destinataireService.FindDestinataireByApplication(app.id).subscribe((data)=>{
    // @ts-ignore
    this.ListDestinataireApp = data.body;
    this.displayDestinataire=true;
  })
}


SaveDestinataire(){
  if(this.AddDestinataire.nom != null && this.AddDestinataire.prenom != null &&this.AddDestinataire.email != null && this.AddDestinataire.typeDest !=null){
    this.destinataireService.SaveDestinataire().subscribe((data) => {
      this.dialogAddDest = false;
      this.showDestinataire(this.AddDestinataire.application);
      this.AddDestinataire.nom= '';
      this.AddDestinataire.email= '';
      this.AddDestinataire.prenom= '';
      this.AddDestinataire.typeDest= '';
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Destinataire Ajouter avec succès'});
          },error=>{
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement'});
    })
    }else{
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
