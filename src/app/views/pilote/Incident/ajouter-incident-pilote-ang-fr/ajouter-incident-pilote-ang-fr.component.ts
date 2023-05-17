import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Incident } from 'src/app/controller/model/incident';
import { PlanAction } from 'src/app/controller/model/plan-action';
import { CharteService } from 'src/app/controller/service/charte.service';
import { IncidentService } from 'src/app/controller/service/incident.service';
import { CharteIncident3BfrAngComponent } from '../charte-incident3-bfr-ang/charte-incident3-bfr-ang.component';
const translate = require('translate');
import html2canvas from 'html2canvas';
import { MessageService } from 'primeng/api';
import { saveAs } from 'file-saver';
import { MyOptions } from 'src/app/controller/model/myoption';
import { DestinataireCommunication } from 'src/app/controller/model/destinataire-communication';
import { DestinataireService } from 'src/app/controller/service/destinataire.service';
import { CharteIncidentMoneticAngFrComponent } from '../charte-incident-monetic-ang-fr/charte-incident-monetic-ang-fr.component';
import { Location } from '@angular/common';
import { EmaildraftsService } from 'src/app/controller/service/emaildrafts.service';
@Component({
  selector: 'app-ajouter-incident-pilote-ang-fr',
  templateUrl: './ajouter-incident-pilote-ang-fr.component.html',
  styleUrls: ['./ajouter-incident-pilote-ang-fr.component.scss']
})
export class AjouterIncidentPiloteAngFrComponent implements OnInit {
  imageDataUrl: string = String();
  param: any;
  StatutPlan: any[] = [];
  StatutPlanAng: any[] = [];
  date1: Date = new Date();
  date2: Date = new Date();
  date3: Date = new Date();
  Action = new PlanAction();
  ActionAng = new PlanAction();
  screenshotDataUrl: any;
  num: number = Number(0);
  numAng: number = Number(0);
  listDestinataire: Array<DestinataireCommunication> = new Array<DestinataireCommunication>();
  EmailObligatoire: any[] = [];
  EmailEnCC: any[] = [];
  Subject: string = String();
  dialogElement: any;
  @ViewChild(CharteIncident3BfrAngComponent, { static: false }) myDiv: any;
  @ViewChild(CharteIncidentMoneticAngFrComponent, { static: false }) myDivMonetic: any;
 

  constructor(private incidentService: IncidentService, private charteService: CharteService,private emailService: EmaildraftsService,
    private router: Router, private renderer: Renderer2, private el: ElementRef, private destService: DestinataireService,
    private messageService: MessageService, private cdRef: ChangeDetectorRef) {
      if(this.AddIncident.application.nomApplication == '' && this.AddIncident.statut ==''){
        this.router.navigate(['/pilote/incident/registre']);
      }

  }


  clear(table: Table) {
    table.clear();
  }
  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
  ngOnInit(): void {
    this.Action = new PlanAction();
    this.AddIncidentAng = new Incident();
    this.ActionAng = new PlanAction();
    this.ListPlanAction = new Array<PlanAction>();
    this.ListPlanActionAng = new Array<PlanAction>();
    this.num = 1;
    this.numAng = 1;
    this.StatutPlan = [
      { name: 'En cours' },
      { name: 'A Démarer' },
      { name: 'Clos' },
    ];
    this.StatutPlanAng = [
      { name: 'On going' },
      { name: 'To start' },
      { name: 'Closed' },
    ];
    this.ListPlanAction = this.AddIncident.planActionList;
    if (this.AddIncident.titreIncident != '') {
      this.translateInput();
    }
    if (this.AddIncident.statut == "Ouvert") {
      this.AddIncidentAng.statut = "Open";
    } else if (this.AddIncident.statut == "Résolu avec Suivi") {
      this.AddIncidentAng.statut = "Resolved with Monitoring";
    } else if (this.AddIncident.statut == "Clos") {
      this.AddIncidentAng.statut = "Closed";
    }

    this.destService.FindDestinataireByApplication(this.AddIncident.application.id).subscribe((data) => {
      // @ts-ignore
      this.listDestinataire = data.body;
      for (let i = 0; i < this.listDestinataire.length; i++) {
        if (this.listDestinataire[i].typeDest == 'Obligatoire' && this.listDestinataire[i].statutRespo == 'Valider') {
          this.EmailObligatoire.push(this.listDestinataire[i].email)
        } else if (this.listDestinataire[i].typeDest == 'en CC' && this.listDestinataire[i].statutRespo == 'Valider') {
          this.EmailEnCC.push(this.listDestinataire[i].email)
        }
      }
    });
    this.AddIncident.actionPrise = String();
    this.AddIncident.detailResolution = String();
    this.AddIncidentAng.actionPrise = String();
    this.AddIncidentAng.detailResolution = String();
  }

  translateInput() {
    this.ListPlanActionAng = new Array<PlanAction>();
    translate(this.AddIncident.titreIncident, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddIncidentAng.titreIncident = result;
    })
      .catch((error: any) => {
        console.error(error);
      });
    translate(this.AddIncident.description, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddIncidentAng.description = result;
    })
      .catch((error: any) => {
        console.error(error);
      });
    translate(this.AddIncident.situationActuelle, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddIncidentAng.situationActuelle = result;
    })
      .catch((error: any) => {
        console.error(error);
      });
    translate(this.AddIncident.impact, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddIncidentAng.impact = result;
    })
      .catch((error: any) => {
        console.error(error);
      });
    translate(this.AddIncident.causePrincipale, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddIncidentAng.causePrincipale = result;
    })
      .catch((error: any) => {
        console.error(error);
      });
    translate(this.AddIncident.solutionContournement, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddIncidentAng.solutionContournement = result;
    })
      .catch((error: any) => {
        console.error(error);
      });
      translate(this.AddIncident.detailResolution, { from: 'fr', to: 'en' }).then((result: string) => {
        this.AddIncidentAng.detailResolution = result;
      })
        .catch((error: any) => {
          console.error(error);
        });
        translate(this.AddIncident.actionPrise, { from: 'fr', to: 'en' }).then((result: string) => {
          this.AddIncidentAng.actionPrise = result;
        })
          .catch((error: any) => {
            console.error(error);
          });
    this.AddIncidentAng.numeroIncident = this.AddIncident.numeroIncident;
    this.AddIncidentAng.dateDebut = this.AddIncident.dateDebut;
    this.AddIncidentAng.dateFin = this.AddIncident.dateFin;
    this.AddIncidentAng.prochaineCommunication = this.AddIncident.prochaineCommunication;
    this.AddIncidentAng.application = this.AddIncident.application;
    for (let i = 0; i < this.ListPlanAction.length; i++) {
      translate(this.ListPlanAction[i].description, { from: 'fr', to: 'en' }).then((result: string) => {
        this.ActionAng.description = result; // Output: "Bonjour le monde"
        if (this.ListPlanAction[i].statut === "En cours") {
          this.ActionAng.statut = "On going";
          this.ActionAng.numero = this.ListPlanAction[i].numero;
        } else if (this.ListPlanAction[i].statut === "A Démarer") {
          this.ActionAng.numero = this.ListPlanAction[i].numero;
          this.ActionAng.statut = "To start";
        } else if (this.ListPlanAction[i].statut = "Clos") {
          this.ActionAng.numero = this.ListPlanAction[i].numero;
          this.ActionAng.statut = "Closed";
        };
        this.ListPlanActionAng.push(this.ActionAng);
        this.ActionAng = new PlanAction();
        this.numAng = this.num;
      })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }
  removeListPlanAction(us: PlanAction) {
    let i = this.ListPlanAction.indexOf(us);
    this.ListPlanAction.splice(i, 1);
    this.numAng = this.numAng - 1;
  }
  removeListPlanActionAng(us: PlanAction) {
    let i = this.ListPlanActionAng.indexOf(us);
    this.ListPlanActionAng.splice(i, 1);
    this.num = this.num - 1;
  }

  get AddIncident(): Incident {
    return this.incidentService.AddIncident;
  }

  set AddIncident(value: Incident) {
    this.incidentService.AddIncident = value;
  }

  get AddIncidentAng(): Incident {
    return this.incidentService.AddIncidentAng;
  }

  set AddIncidentAng(value: Incident) {
    this.incidentService.AddIncidentAng = value;
  }

  get ListPlanActionAng(): Array<PlanAction> {
    return this.incidentService.ListPlanActionAng;
  }

  set ListPlanActionAng(value: Array<PlanAction>) {
    this.incidentService.ListPlanActionAng = value;
  }

  get ListPlanAction(): Array<PlanAction> {

    return this.incidentService.ListPlanAction;
  }

  set ListPlanAction(value: Array<PlanAction>) {
    this.incidentService.ListPlanAction = value;
  }


  AddAction() {
    if (this.Action.statut != '' && this.Action.description != '' && this.num > 0) {
      this.Action.numero = this.num;
      this.ListPlanAction.push(this.Action);
      this.Action = new PlanAction();
      this.num = this.num + 1;
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Insérer tout les champs' });
    }
  }
  AddActionAng() {
    if (this.ActionAng.statut != '' && this.ActionAng.description != '' && this.numAng > 0) {
      this.Action.numero = this.numAng;
      this.ListPlanActionAng.push(this.ActionAng);
      this.ActionAng = new PlanAction();
      this.numAng = this.numAng + 1;
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Insérer tout les champs' });
    }
  }

  get charteIncident3BfrAng(): boolean {
    return this.charteService.charteIncident3BfrAng;
  }

  set charteIncident3BfrAng(value: boolean) {
    this.charteService.charteIncident3BfrAng = value;
  }
  get charteIncidentMoneticAngFr(): boolean {
    return this.charteService.charteIncidentMoneticAngFr;
  }

  set charteIncidentMoneticAngFr(value: boolean) {
    this.charteService.charteIncidentMoneticAngFr = value;
  }
  showCharte() {
    this.AddIncident.planActionList = this.ListPlanAction;
    this.AddIncidentAng.planActionList = this.ListPlanActionAng;
    if (this.AddIncident.application.charteIncident == 'charte Incident') {
      this.charteIncident3BfrAng = true;
    } else if (this.AddIncident.application.charteIncident == 'charte Incident Monetics') {
      this.charteIncidentMoneticAngFr = true;
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Charte Non trouvé' });
    }
  }
 
  isSubmitDisabled() {
    if(this.AddIncident.statut=='Ouvert'){
    return (
      !this.AddIncident.titreIncident ||
      this.AddIncident.titreIncident.length < 3 ||
      !this.AddIncident.dateDebut ||
      !this.AddIncident.description ||
      this.AddIncident.description.length < 3 ||
      !this.AddIncident.situationActuelle ||
      this.AddIncident.situationActuelle.length < 3 ||
      !this.AddIncident.causePrincipale ||
      this.AddIncident.causePrincipale.length < 3 ||
      !this.AddIncidentAng.titreIncident ||
      this.AddIncidentAng.titreIncident.length < 3 ||
      !this.AddIncidentAng.dateDebut ||
      !this.AddIncidentAng.description ||
      this.AddIncidentAng.description.length < 3 ||
      !this.AddIncidentAng.situationActuelle ||
      this.AddIncidentAng.situationActuelle.length < 3 ||
      !this.AddIncidentAng.causePrincipale ||
      this.AddIncidentAng.causePrincipale.length < 3
    );}else if(this.AddIncident.statut=='Résolu avec Suivi'){
      return (
        !this.AddIncident.actionPrise ||
        this.AddIncident.actionPrise.length < 3 ||
        !this.AddIncident.titreIncident ||
      this.AddIncident.titreIncident.length < 3 ||
      !this.AddIncident.dateDebut ||
      !this.AddIncident.description ||
      this.AddIncident.description.length < 3 ||
      !this.AddIncident.situationActuelle ||
      this.AddIncident.situationActuelle.length < 3 ||
      !this.AddIncident.causePrincipale ||
      this.AddIncident.causePrincipale.length < 3 ||
      !this.AddIncidentAng.actionPrise ||
      this.AddIncidentAng.actionPrise.length < 3 ||
      !this.AddIncidentAng.titreIncident ||
      this.AddIncidentAng.titreIncident.length < 3 ||
      !this.AddIncidentAng.dateDebut ||
      !this.AddIncidentAng.description ||
      this.AddIncidentAng.description.length < 3 ||
      !this.AddIncidentAng.situationActuelle ||
      this.AddIncidentAng.situationActuelle.length < 3 ||
      !this.AddIncidentAng.causePrincipale ||
      this.AddIncidentAng.causePrincipale.length < 3
      );}else{
        return (
          !this.AddIncident.detailResolution ||
          this.AddIncident.detailResolution.length < 3 ||
          !this.AddIncident.titreIncident ||
          this.AddIncident.titreIncident.length < 3 ||
          !this.AddIncident.dateDebut ||
          !this.AddIncident.description ||
          this.AddIncident.description.length < 3 ||
          !this.AddIncident.situationActuelle ||
          this.AddIncident.situationActuelle.length < 3 ||
          !this.AddIncident.causePrincipale ||
          this.AddIncident.causePrincipale.length < 3 ||
          !this.AddIncidentAng.detailResolution ||
          this.AddIncidentAng.detailResolution.length < 3 ||
          !this.AddIncidentAng.titreIncident ||
          this.AddIncidentAng.titreIncident.length < 3 ||
          !this.AddIncidentAng.dateDebut ||
          !this.AddIncidentAng.description ||
          this.AddIncidentAng.description.length < 3 ||
          !this.AddIncidentAng.situationActuelle ||
          this.AddIncidentAng.situationActuelle.length < 3 ||
          !this.AddIncidentAng.causePrincipale ||
          this.AddIncidentAng.causePrincipale.length < 3
        );}
  }


  SaveIncident() {
    this.AddIncident.dateAjout = new Date();
    if (this.AddIncident.application.charteIncident == 'charte Incident') {
      this.Subject = '[INCIDENT][' + this.AddIncident.application.nomApplication + '][Communication No.' + this.AddIncident.numeroIncident + '] ' + this.AddIncidentAng.titreIncident + ' / ' + this.AddIncident.titreIncident + ' - ' + this.AddIncidentAng.statut + ' / ' + this.AddIncident.statut;
    } else if (this.AddIncident.application.charteIncident == 'charte Incident Monetics') {
      this.Subject = '[' + this.AddIncident.type + '] ' + this.AddIncident.application.nomApplication + ' Incident ' + this.AddIncident.numeroIncident + ' - ' + this.AddIncident.titreIncident;
    }
    this.incidentService.SaveIncident().subscribe((data) => {
      this.emailService.authenticateAndRetrieveAccessToken(this.EmailObligatoire,this.EmailEnCC,this.Subject,this.dialogElement.innerHTML);
      this.AddIncident = new Incident();
      this.ListPlanAction = new Array<PlanAction>();
      this.ListPlanActionAng = new Array<PlanAction>();
      const mailtoLink = `mailto:${this.EmailObligatoire.join(';')}&subject=${this.Subject}&cc=${this.EmailEnCC.join(';')}`;
      window.open(mailtoLink, '_blank');
      this.router.navigate(['/pilote/incident/registre']);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Incident Ajouter avec succès' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement verifier le titre d \'incident' });
    })


  }



  takeScreenshot() {
    if (this.AddIncident.application.charteIncident == 'charte Incident') {
      this.charteIncident3BfrAng = true;
    } else if (this.AddIncident.application.charteIncident == 'charte Incident Monetics') {
      this.charteIncidentMoneticAngFr = true;
    }
    setTimeout(() => {
      if (this.AddIncident.application.charteIncident == 'charte Incident') {
        this.dialogElement = this.myDiv.filterComponent.nativeElement;
      } else if (this.AddIncident.application.charteIncident == 'charte Incident Monetics') {
        this.dialogElement = this.myDivMonetic.filterComponent.nativeElement;
      }
      const options: MyOptions = {
        scale: 2,
        logging: true,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
      };
      html2canvas(this.dialogElement, options).then((canvas) => {
        this.imageDataUrl = canvas.toDataURL();
        const blob = this.dataURLtoBlob(this.imageDataUrl);
        const imageUrl = URL.createObjectURL(blob); // create URL object from blob
        const file = new File([blob], this.AddIncident.titreIncident + '-' + this.AddIncident.application.nomApplication + '.png', { type: 'image/png' });
        saveAs(file);
        this.SaveIncident();
      });
      if (this.AddIncident.application.charteIncident == 'charte Incident') {
        this.charteIncident3BfrAng = false;
      } else if (this.AddIncident.application.charteIncident == 'charte Incident Monetics') {
        this.charteIncidentMoneticAngFr = false;
      }
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
  SendAndSaveIncident() {
    this.AddIncident.planActionList = this.ListPlanAction;
    this.AddIncident.id = 0;
    this.AddIncidentAng.planActionList = this.ListPlanActionAng;
    if (this.AddIncident.description != '' && this.AddIncident.causePrincipale != '' && this.AddIncident.situationActuelle != '' && this.AddIncident.prochaineCommunication != null) {
      this.takeScreenshot();
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Insérer tout les champs' });
    }
  }


}
