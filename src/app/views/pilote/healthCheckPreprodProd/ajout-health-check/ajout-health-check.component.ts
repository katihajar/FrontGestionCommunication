import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Application } from 'src/app/controller/model/application';
import { DestinataireCommunication } from 'src/app/controller/model/destinataire-communication';
import { EtatProcessusMetier } from 'src/app/controller/model/etat-processus-metier';
import { HealthChekPreprodProd } from 'src/app/controller/model/health-chek-preprod-prod';
import { HealthChekPreprodProdDetail } from 'src/app/controller/model/health-chek-preprod-prod-detail';
import { ProcessusMetier } from 'src/app/controller/model/processus-metier';
import { CharteService } from 'src/app/controller/service/charte.service';
import { HealthCheckService } from 'src/app/controller/service/health-check.service';
import { CharteHealthCheckComponent } from '../charte-health-check/charte-health-check.component';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { MyOptions } from 'src/app/controller/model/myoption';
import { DestinataireService } from 'src/app/controller/service/destinataire.service';
import { StatutApplication } from 'src/app/controller/model/statut-application';
import { EmaildraftsService } from 'src/app/controller/service/emaildrafts.service';
const moment = require('moment');

@Component({
  selector: 'app-ajout-health-check',
  templateUrl: './ajout-health-check.component.html',
  styleUrls: ['./ajout-health-check.component.scss']
})
export class AjoutHealthCheckComponent implements OnInit {
  spinner:boolean=false;
  ListFeu: any[] = [];
  ListImpactClient: any[] = [];
  ListStatut: any[] = [];
  statuApp: StatutApplication = new StatutApplication();
  ListProcessus: Array<ProcessusMetier> = new Array<ProcessusMetier>();
  ListApp: Array<Application> = new Array<Application>();
  ListStatutApp: Array<StatutApplication> = new Array<StatutApplication>();
  date2: Date = new Date();
  date3: Date = new Date();
  helthchekdetail: HealthChekPreprodProdDetail = new HealthChekPreprodProdDetail();
  etatproc: EtatProcessusMetier = new EtatProcessusMetier();
  listHelthchekdetail: Array<HealthChekPreprodProdDetail> = new Array<HealthChekPreprodProdDetail>();
  listEtatproc: Array<EtatProcessusMetier> = new Array<EtatProcessusMetier>();
  listDestinataire: Array<DestinataireCommunication> = new Array<DestinataireCommunication>();
  EmailObligatoire: any[] = [];
  EmailEnCC: any[] = [];
  imageDataUrl: string = String();
  Subject: string = String();
  dialogElement: any;
  @ViewChild(CharteHealthCheckComponent, { static: false }) myDiv: any;
  constructor(private emailService: EmaildraftsService, private healthService: HealthCheckService, private charteService: CharteService, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService, private destService: DestinataireService) {
    if (this.AddHealthCheck.type == '') {
      this.router.navigate(['/pilote/healthcheck/PreprodProd/registre']);
    }
  }
  clear(table: Table) {
    table.clear();
  }
  ngOnInit(): void {
    this.FindApp();
    this.FindProcessus();
    this.listHelthchekdetail = new Array<HealthChekPreprodProdDetail>();
    this.listEtatproc = new Array<EtatProcessusMetier>();
    this.ListStatutApp = new Array<StatutApplication>();
    this.listEtatproc = this.AddHealthCheck.etatProcessusMetierList;
    this.listHelthchekdetail = this.AddHealthCheck.healthChekPreprodProdDetailList;
    this.ListStatutApp = this.AddHealthCheck.statutApplicationList;
    this.ListFeu = [
      { name: 'OK' },
      { name: 'En cours d\'éxecuxtion' },
      { name: 'Flux non critique KO' },
      { name: 'Flux critique KO' }
    ];
    this.ListStatut = [
      { name: 'Ko' },
      { name: 'En cours' },
      { name: 'En attente' }
    ];
    this.ListImpactClient = [
      { name: 'OUI' },
      { name: 'NON' },
    ];
    this.destService.FindDestinataireHealthCheckProd().subscribe((data) => {
      // @ts-ignore
      this.listDestinataire = data.body;
      for (let i = 0; i < this.listDestinataire.length; i++) {
        if (this.listDestinataire[i].typeDest == 'Obligatoire' && this.listDestinataire[i].statutRespo == 'Valider') {
          this.EmailObligatoire.push(this.listDestinataire[i].email)
        } else if (this.listDestinataire[i].typeDest == 'en CC' && this.listDestinataire[i].statutRespo == 'Valider') {
          this.EmailEnCC.push(this.listDestinataire[i].email)
        }
      }
    })
  }

  get AddHealthCheck(): HealthChekPreprodProd {
    return this.healthService.AddHealthCheck;
  }

  set AddHealthCheck(value: HealthChekPreprodProd) {
    this.healthService.AddHealthCheck = value;
  }
  get charteHealthCheckPreprodProd(): boolean {
    return this.charteService.charteHealthCheckPreprodProd;
  }

  set charteHealthCheckPreprodProd(value: boolean) {
    this.charteService.charteHealthCheckPreprodProd = value;
  }
  AddStatutApp() {
    if (this.statuApp.statut != '' && this.statuApp.application.nomApplication != '') {
      const match = this.ListStatutApp.find(etat => etat.application.nomApplication === this.statuApp.application.nomApplication);
      if (match) {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Vous avez déja ajouter l\'état de cette application' });
      } else {
        this.ListStatutApp.push(this.statuApp);
        this.statuApp = new StatutApplication();
      }
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Insérer tout les champs' });
    }
  }
  removeStatutApp(us: StatutApplication) {
    let i = this.ListStatutApp.indexOf(us);
    this.ListStatutApp.splice(i, 1);
  }
  AddEtat() {
    if (this.etatproc.statut != '' && this.etatproc.processusMetier.titre != '') {
      const match = this.listEtatproc.find(etat => etat.processusMetier.titre === this.etatproc.processusMetier.titre);
      if (match) {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Vous avez déja ajouter ce processus' });
      } else {
        this.listEtatproc.push(this.etatproc);
        this.etatproc = new EtatProcessusMetier();
      }
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Insert all fields' });
    }
  }

  removeEtat(us: EtatProcessusMetier) {
    let i = this.listEtatproc.indexOf(us);
    this.listEtatproc.splice(i, 1);
  }
  AddDeatils() {
    if (this.helthchekdetail.processus != '' && this.helthchekdetail.problemeTechnique != '' && this.helthchekdetail.impactMetier != '' && this.helthchekdetail.cause != '' && this.helthchekdetail.statut != '' && this.helthchekdetail.application.nomApplication != '' && this.helthchekdetail.feu != '' && this.helthchekdetail.impactClient != '' && this.helthchekdetail.information != '') {
      this.listHelthchekdetail.push(this.helthchekdetail);
      this.helthchekdetail = new HealthChekPreprodProdDetail();
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Insérer tout les champs' });
    }
  }

  removeDeatils(us: HealthChekPreprodProdDetail) {
    let i = this.listHelthchekdetail.indexOf(us);
    this.listHelthchekdetail.splice(i, 1);
  }

  FindProcessus() {
    this.healthService.FindAllProcessusMetier().subscribe((data) => {
      // @ts-ignore
      this.ListProcessus = data.body;
    })
  }

  FindApp() {
    this.ListApp= new Array<Application>;
    this.healthService.FindApplcationHealthPilotByLots().subscribe((data) => {
      let app = new Array<Application>;
      // @ts-ignore
      app = data.body;
      for (let i = 0; i < app.length; i++) {
        if (app[i].nomApplication != 'Health Check Bw Perimetre' && app[i].nomApplication != 'health check ProdPredprod') {
          this.ListApp.push(app[i]);
        }
      }
    })
  }
  isSubmitDisabled() {
    return this.ListApp.length == 0 || this.listHelthchekdetail.length == 0 || this.listEtatproc.length == 0;
  }
  charte() {
    this.AddHealthCheck.etatProcessusMetierList = this.listEtatproc;
    this.AddHealthCheck.healthChekPreprodProdDetailList = this.listHelthchekdetail;
    this.AddHealthCheck.statutApplicationList = this.ListStatutApp;
    this.FindApp();
    this.charteHealthCheckPreprodProd = true;
  }
  SaveHealth() {
    this.AddHealthCheck.titre = 'Etat de santé du ' + moment(this.AddHealthCheck.dateAjout).format('dd/MM/YYYY') + ',' + moment(this.AddHealthCheck.dateAjout).format('HH:mm');
    this.Subject = '[' + this.AddHealthCheck.type + '] Etat de santé Monétique – ' + moment(this.AddHealthCheck.dateAjout).format('dd/MM/YYYY') + ',' + moment(this.AddHealthCheck.dateAjout).format('HH:mm');
    this.healthService.SaveHealthCheck().subscribe((data) => {
      const content = `<div style="width: 1000px;">${this.dialogElement.innerHTML}</div>`;
      this.emailService.authenticateAndRetrieveAccessToken(this.EmailObligatoire, this.EmailEnCC, this.Subject, content);      
      // this.emailService.authenticateAndRetrieveAccessToken(this.EmailObligatoire,this.EmailEnCC,this.Subject,this.dialogElement.innerHTML);
      this.AddHealthCheck = new HealthChekPreprodProd();
      this.listEtatproc = new Array<EtatProcessusMetier>();
      this.listHelthchekdetail = new Array<HealthChekPreprodProdDetail>();
      this.spinner =false;
      this.router.navigate(['/pilote/healthcheck/PreprodProd/registre']);
      const mailtoLink = `mailto:${this.EmailObligatoire.join(';')}&subject=${this.Subject}&cc=${this.EmailEnCC.join(';')}`;
     // window.open(mailtoLink, '_blank');
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Etat de santé Ajouter avec succès' });
    }, error => {
      this.spinner =false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement' });
    })

  }
  takeScreenshot() {

    this.charteHealthCheckPreprodProd = true;

    setTimeout(() => {

      this.dialogElement = this.myDiv.filterComponent.nativeElement;


      const options: MyOptions = {
        scale: 2,
        logging: true,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
      };
      html2canvas(this.dialogElement, options).then((canvas) => {
        this.imageDataUrl = canvas.toDataURL();
        // const blob = this.dataURLtoBlob(this.imageDataUrl);
        // const imageUrl = URL.createObjectURL(blob); // create URL object from blob
        // const file = new File([blob], 'healthcheck.png', { type: 'image/png' });
        // saveAs(file);
        this.SaveHealth();
      });
      this.charteHealthCheckPreprodProd = false;


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

  SendAndSaveHealth() {
    this.AddHealthCheck.id = 0;
    this.AddHealthCheck.etatProcessusMetierList = this.listEtatproc;
    this.AddHealthCheck.healthChekPreprodProdDetailList = this.listHelthchekdetail;
    this.AddHealthCheck.statutApplicationList = this.ListStatutApp;
    if (this.AddHealthCheck.etatProcessusMetierList.length != 0 && this.AddHealthCheck.healthChekPreprodProdDetailList.length != 0) {
      if (this.ListApp.length == this.ListStatutApp.length) {
        if (this.listEtatproc.length == this.ListProcessus.length) {
          this.AddHealthCheck.dateAjout = new Date();
          this.spinner =true;
          this.takeScreenshot();
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Insérer tout l\'état de tout les processus métier' });
        }
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Insérer tout l\'état de toute les appliaction' });
      }
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Insérer tout les champs' });
    }
  }
}
