import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DestinataireCommunication } from 'src/app/controller/model/destinataire-communication';
import { LivraisonCARM } from 'src/app/controller/model/livraison-carm';
import { PlanningPointVersion } from 'src/app/controller/model/planning-point-version';
import { PointVersion } from 'src/app/controller/model/point-version';
import { Ticket } from 'src/app/controller/model/ticket';
import { CharteService } from 'src/app/controller/service/charte.service';
import { PointVersionService } from 'src/app/controller/service/point-version.service';
import { ChartePointVersionComponent } from '../charte-point-version/charte-point-version.component';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { MyOptions } from 'src/app/controller/model/myoption';
import { Application } from 'src/app/controller/model/application';
import { DestinataireService } from 'src/app/controller/service/destinataire.service';
const moment = require('moment');

@Component({
  selector: 'app-ajout-point-version',
  templateUrl: './ajout-point-version.component.html',
  styleUrls: ['./ajout-point-version.component.scss']
})
export class AjoutPointVersionComponent implements OnInit {
  ListTicket: Array<Ticket> = new Array<Ticket>();
  ListTypeTicket: any[] = [];
  ListStatutMEI: any[] = [];
  ListApp: Array<Application> = new Array<Application>();
  ListTicketAjouter: Array<Ticket> = new Array<Ticket>();
  ListTicketRetirer: Array<Ticket> = new Array<Ticket>();
  ListPlanning: Array<PlanningPointVersion> = new Array<PlanningPointVersion>();
  ListLivraison: Array<LivraisonCARM> = new Array<LivraisonCARM>();
  TicketAjouter: Ticket = new Ticket();
  TicketRetirer: Ticket = new Ticket();
  Planning: PlanningPointVersion = new PlanningPointVersion();
  Livraison: LivraisonCARM = new LivraisonCARM();
  listDestinataire: Array<DestinataireCommunication> = new Array<DestinataireCommunication>();
  EmailObligatoire: any[] = [];
  EmailEnCC: any[] = [];
  imageDataUrl: string = String();
  Subject: string = String();
  dialogElement: any;
  date1: Date = new Date();
  date2: Date = new Date();
  selectedFile!: File;
  @ViewChild(ChartePointVersionComponent, { static: false }) myDiv: any;
  constructor(private pointService: PointVersionService, private charteService: CharteService, private router: Router,
    private messageService: MessageService,private destService :DestinataireService) { }

  ngOnInit(): void {
    this.FindApp();
    this.ListTicketAjouter = new Array<Ticket>();
    this.ListTicketRetirer = new Array<Ticket>();
    this.ListPlanning = new Array<PlanningPointVersion>();
    this.ListLivraison = new Array<LivraisonCARM>();
    this.TicketAjouter = new Ticket();
    this.TicketRetirer = new Ticket();
    this.Planning = new PlanningPointVersion();
    this.Livraison = new LivraisonCARM();
    this.ListPlanning = this.AddPointVersion.planningPointVersionList;
    this.ListLivraison = this.AddPointVersion.livraisonCARMList;
    if (this.AddPointVersion.ticketList.length != null) {
      for (let i = 0; i < this.AddPointVersion.ticketList.length; i++) {
        if (this.AddPointVersion.ticketList[i].type == 'Ajouter') {
          this.ListTicketAjouter.push(this.AddPointVersion.ticketList[i]);
        } else {
          this.ListTicketRetirer.push(this.AddPointVersion.ticketList[i]);
        }
      }
    } else {
      this.ListTicketAjouter = new Array<Ticket>();
      this.ListTicketRetirer = new Array<Ticket>();
    }
    this.ListTypeTicket = [
      { name: 'OK' },
      { name: 'NO' },
    ];
    this.destService.FindDestinataireByApplication(this.AddPointVersion.application.id).subscribe((data)=>{
      // @ts-ignore
      this.listDestinataire = data.body;
      for(let i = 0;i<this.listDestinataire.length;i++){
        if(this.listDestinataire[i].typeDest=='Obligatoire' && this.listDestinataire[i].statutRespo == 'Valider'){
          this.EmailObligatoire.push(this.listDestinataire[i].email)
        }else if(this.listDestinataire[i].typeDest=='en CC' && this.listDestinataire[i].statutRespo == 'Valider'){
          this.EmailEnCC.push(this.listDestinataire[i].email)
        }
      }
    })
  }
  FindApp() {
    this.pointService.FindApp().subscribe((data) => {
      let app = new Array<Application>;
      // @ts-ignore
      app = data.body;
      for(let i= 0; i<app.length; i++){
        if(app[i].nomApplication != 'Health Check BI' && app[i].nomApplication != 'Health Check Monetics'){
          this.ListApp.push(app[i]);
        }
      }
    })
  }
  AddLivraison() {
    if (this.Livraison.dateMEI != null) {
      this.ListLivraison.push(this.Livraison);
      this.Livraison = new LivraisonCARM();
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Insérer tout les champs' });
    }
  }
  removeLivraison(us: LivraisonCARM) {
    let i = this.ListLivraison.indexOf(us);
    this.ListLivraison.splice(i, 1);
  }
  AddTicketAjouter() {
    if (this.TicketAjouter.numero != null && this.TicketAjouter.description != '') {
      this.TicketAjouter.type = 'Ajouter';
      this.ListTicketAjouter.push(this.TicketAjouter);
      this.TicketAjouter = new Ticket();
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Insérer tout les champs' });
    }
  }
  removeTicketAjouter(us: Ticket) {
    let i = this.ListTicketAjouter.indexOf(us);
    this.ListTicketAjouter.splice(i, 1);
  }
  AddTicketRetirer() {
    if (this.TicketRetirer.numero != null && this.TicketRetirer.description != '') {
      this.TicketRetirer.type = 'Retirer';
      this.ListTicketRetirer.push(this.TicketRetirer);
      this.TicketRetirer = new Ticket();
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Insérer tout les champs' });
    }
  }
  removeTicketRetirer(us: Ticket) {
    let i = this.ListTicketRetirer.indexOf(us);
    this.ListTicketRetirer.splice(i, 1);
  }
  AddPlanning() {
    if (this.Planning.titre != null && this.Planning.description != '') {
      this.ListPlanning.push(this.Planning);
      this.Planning = new PlanningPointVersion();
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Insérer tout les champs' });
    }
  }
  removePlanning(us: PlanningPointVersion) {
    let i = this.ListPlanning.indexOf(us);
    this.ListPlanning.splice(i, 1);
  }
  get chartePointVersion(): boolean {
    return this.charteService.chartePointVersion;
  }

  set chartePointVersion(value: boolean) {
    this.charteService.chartePointVersion = value;
  }
  get AddPointVersion(): PointVersion {
    return this.pointService.AddPointVersion;
  }

  set AddPointVersion(value: PointVersion) {
    this.pointService.AddPointVersion = value;
  }
  onUpload(event: any) {
    this.selectedFile = <File>event.target.files[0];

  }
  showCharte() {
    this.AddPointVersion.livraisonCARMList = this.ListLivraison;
    this.AddPointVersion.planningPointVersionList = this.ListPlanning;
    this.ListTicket = this.ListTicketAjouter;
    for (let i = 0; i < this.ListTicketRetirer.length; i++) {
      this.ListTicket.push(this.ListTicketRetirer[i]);
    }
    this.AddPointVersion.ticketList = this.ListTicket;
    if (this.selectedFile != null) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64 = base64String.split(',')[1];
        this.AddPointVersion.image = base64;
        this.AddPointVersion.imageType = this.selectedFile.type;               
      };
    }
    this.chartePointVersion = true;
  }
  SavePoint() {
    if (this.AddPointVersion.application.nomApplication != null && this.AddPointVersion.version != '' && this.AddPointVersion.dateAjout != null) {
      this.AddPointVersion.titre = this.AddPointVersion.application.nomApplication + ' ' + this.AddPointVersion.version + ' – Point version  – ' + moment(this.AddPointVersion.dateAjout).format('DD/MM/YYYY');
      this.Subject = this.AddPointVersion.titre;
        this.pointService.SavePointVersion(this.selectedFile).subscribe((data) => {
          this.AddPointVersion = new PointVersion();
          this.ListTicketAjouter = new Array<Ticket>();
          this.ListTicketRetirer = new Array<Ticket>();
          this.ListTicket = new Array<Ticket>();
          this.ListLivraison = new Array<LivraisonCARM>();
          this.ListPlanning = new Array<PlanningPointVersion>();
          this.router.navigate(['/pilote/pointversion/registre']);
          const mailtoLink = `mailto:${this.EmailObligatoire.join(';')}&subject=${this.Subject}&cc=${this.EmailEnCC.join(';')}`;
          window.open(mailtoLink, '_blank');
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Point Version Ajouter avec succès' });
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement' });
        })
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Insérer tout les champs' });
      }
   
  }
  takeScreenshot() {
    this.chartePointVersion = true;

    setTimeout(() => {
      this.dialogElement = this.myDiv.filterComponent.nativeElement;
      const options: MyOptions = {
        scale: 2,
        logging: true,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
      };
      html2canvas(this.dialogElement, options).then((canvas) => {
        this.imageDataUrl = canvas.toDataURL();
        const blob = this.dataURLtoBlob(this.imageDataUrl);
        const imageUrl = URL.createObjectURL(blob); // create URL object from blob
        const file = new File([blob], this.AddPointVersion.application.nomApplication + '.png', { type: 'image/png' });
        saveAs(file);
        this.SavePoint();
      });
      this.chartePointVersion = false;

    }, 1000);
  }

  dataURLtoBlob(dataURL: string): Blob {
    const arr = dataURL.split(',');
    if (arr.length < 2) {
      throw new Error('Invalid data URL');
    }
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
      throw new Error('Invalid MIME type in data URL');
    }
    const mime = mimeMatch[1];
    let bstr = '';
    try {
      bstr = atob(arr[1].replace(/\s/g, ''));
    } catch (e) {
      throw new Error('Invalid base64-encoded data in data URL');
    }
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new Blob([u8arr], { type: mime });
  }

  SendAndSavePoint() {
    this.AddPointVersion.id = 0;
    this.AddPointVersion.livraisonCARMList = this.ListLivraison;
    this.AddPointVersion.planningPointVersionList = this.ListPlanning;
    this.ListTicket = this.ListTicketAjouter;
    for (let i = 0; i < this.ListTicketRetirer.length; i++) {
      this.ListTicket.push(this.ListTicketRetirer[i]);
    }
    this.AddPointVersion.ticketList = this.ListTicket;
    if ( this.AddPointVersion.goNoGoMEP != '' && this.AddPointVersion.goNoGoTNR != '' && this.AddPointVersion.remarque != '' && this.AddPointVersion.lienComment != '') {
    this.takeScreenshot();
  } else {
     this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Insérer tout les champs' });
  }
  }
}
