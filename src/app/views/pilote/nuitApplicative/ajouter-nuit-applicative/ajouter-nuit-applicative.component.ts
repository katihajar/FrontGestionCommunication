import { Component, OnInit, ViewChild } from '@angular/core';
import { CharteNuitApplicativeComponent } from '../charte-nuit-applicative/charte-nuit-applicative.component';
import { EmaildraftsService } from 'src/app/controller/service/emaildrafts.service';
import { NuitApplicativeService } from 'src/app/controller/service/nuit-applicative.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CharteService } from 'src/app/controller/service/charte.service';
import { DestinataireService } from 'src/app/controller/service/destinataire.service';
import { NuitApplicative } from 'src/app/controller/model/nuit-applicative';
import { NbOccurence } from 'src/app/controller/model/nb-occurence';
import { SuiviVolumetrie } from 'src/app/controller/model/suivi-volumetrie';
import { DestinataireCommunication } from 'src/app/controller/model/destinataire-communication';
import * as moment from 'moment';
import html2canvas from 'html2canvas';
import { MyOptions } from 'src/app/controller/model/myoption';

@Component({
  selector: 'app-ajouter-nuit-applicative',
  templateUrl: './ajouter-nuit-applicative.component.html',
  styleUrls: ['./ajouter-nuit-applicative.component.scss']
})
export class AjouterNuitApplicativeComponent implements OnInit {
  ListStatut: any[] = [];
  ListType: any[] = [];
  spinner: boolean = false;
  date3: Date = new Date();
  nbOccurence: NbOccurence = new NbOccurence();
  suiviVolumetri: SuiviVolumetrie = new SuiviVolumetrie();
  listNbOccurence: Array<NbOccurence> = new Array<NbOccurence>();
  listsuiviVolumetri: Array<SuiviVolumetrie> = new Array<SuiviVolumetrie>();
  listDestinataire: Array<DestinataireCommunication> = new Array<DestinataireCommunication>();
  EmailObligatoire: any[] = [];
  EmailEnCC: any[] = [];
  imageDataUrl: string = String();
  Subject: string = String();
  dialogElement: any;
  @ViewChild(CharteNuitApplicativeComponent, { static: false }) myDiv: any;
  constructor(private emailService: EmaildraftsService, private nuitService: NuitApplicativeService, private charteService: CharteService, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService, private destService: DestinataireService) {
    if (this.AddNuitApplicative.statut == '') {
      this.router.navigate(['/pilote/healthcheck/PreprodProd/registre']);
    }
  }
  clear(table: Table) {
    table.clear();
  }
  get AddNuitApplicative(): NuitApplicative {
    return this.nuitService.AddNuitApplicative;
  }

  set AddNuitApplicative(value: NuitApplicative) {
    this.nuitService.AddNuitApplicative = value;
  }
  get charteNuitApplicative(): boolean {
    return this.charteService.charteNuitApplicative;
  }

  set charteNuitApplicative(value: boolean) {
    this.charteService.charteNuitApplicative = value;
  }
  ngOnInit(): void {
    this.listNbOccurence = new Array<NbOccurence>();
    this.listsuiviVolumetri = new Array<SuiviVolumetrie>();
    if (this.AddNuitApplicative.nbOccurenceList) {
      this.listNbOccurence = this.AddNuitApplicative.nbOccurenceList;
    }
    if (this.AddNuitApplicative.suiviVolumetrieList) {
      this.listsuiviVolumetri = this.AddNuitApplicative.suiviVolumetrieList;
    }
    this.ListType = [
      { name: 'KO' },
      { name: 'WIP' },
      { name: 'SO' }
    ];
    this.ListStatut = [
      { name: 'OK' },
      { name: 'KO' },
    ]
    this.destService.FindDestinataireNuitApplicative().subscribe((data) => {
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

  AddOccurences() {
    if (this.nbOccurence.traitement != '' && this.nbOccurence.nombreOcurrence != null && this.nbOccurence.date != null && this.nbOccurence.statut != null ) {
      const match = this.listNbOccurence.find(nuit => nuit.traitement=== this.nbOccurence.traitement);
      if (match) {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Vous avez deja ajouter ce traitement' });
      } else {
        this.listNbOccurence.push(this.nbOccurence);
        this.nbOccurence = new NbOccurence();
      }
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Inserer tout les champs' });
    }
  }
  removeOccurence(us: NbOccurence) {
    let i = this.listNbOccurence.indexOf(us);
    this.listNbOccurence.splice(i, 1);
  }

  AddSuiviVolumetri() {
    if (this.suiviVolumetri.typeAlerte != '' && this.suiviVolumetri.statut != '' && this.suiviVolumetri.nbMinimun != null && this.suiviVolumetri.nbActuel != null ) {
      const match = this.listsuiviVolumetri.find(suivi => suivi.typeAlerte=== this.suiviVolumetri.typeAlerte);
      if (match) {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Vous avez deja ajouter cette Alerte' });
      } else {
        this.listsuiviVolumetri.push(this.suiviVolumetri);
        this.suiviVolumetri = new SuiviVolumetrie();
      }
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Inserer tout les champs' });
    }
  }
  removeSuiviVolumetri(us: SuiviVolumetrie) {
    let i = this.listsuiviVolumetri.indexOf(us);
    this.listsuiviVolumetri.splice(i, 1);
  }
  isSubmitDisabled() {
    return this.listsuiviVolumetri.length == 0 || this.listNbOccurence.length == 0 || !this.AddNuitApplicative.typeFocusEmail || !this.AddNuitApplicative.typeChainesTransactions || !this.AddNuitApplicative.typeChainesReferentiels || !this.AddNuitApplicative.typeChainesPCOM || !this.AddNuitApplicative.typeChainesGRanalytics || !this.AddNuitApplicative.typeChainesFacturation;
  }
  charte() {
    this.AddNuitApplicative.nbOccurenceList = this.listNbOccurence;
    this.AddNuitApplicative.suiviVolumetrieList = this.listsuiviVolumetri;
    this.charteNuitApplicative = true;
  }
  SaveNuit() {
    this.AddNuitApplicative.titre = 'Suivi nuit applicative Monetique du ' + moment(this.AddNuitApplicative.date).format('DD/MM/YYYY') + ',' + moment(this.AddNuitApplicative.date).format('HH:mm');
    this.Subject = '[' + this.AddNuitApplicative.statut + '] Suivi nuit applicative Monetique – ' + moment(this.AddNuitApplicative.date).format('DD/MM/YYYY');
    this.nuitService.SaveNuitAppl().subscribe((data) => {
      const content = `<div style="width: 650px;">${this.dialogElement.innerHTML}</div>`;
      this.emailService.authenticateAndRetrieveAccessToken(this.EmailObligatoire, this.EmailEnCC, this.Subject, content);      
      this.AddNuitApplicative = new NuitApplicative();
      this.listNbOccurence = new Array<NbOccurence>();
      this.listsuiviVolumetri = new Array<SuiviVolumetrie>();
      this.spinner =false;
      this.router.navigate(['/pilote/healthcheck/PreprodProd/registre']);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Nuit Applicative Ajouter avec succès' });
    }, error => {
      this.spinner =false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement' });
    })

  }
  SendAndSaveNuit() {
    this.AddNuitApplicative.id = 0;
    this.AddNuitApplicative.nbOccurenceList = this.listNbOccurence;
    this.AddNuitApplicative.suiviVolumetrieList = this.listsuiviVolumetri;
    if (this.AddNuitApplicative.nbOccurenceList.length != 0 && this.AddNuitApplicative.suiviVolumetrieList.length != 0) {
          this.AddNuitApplicative.date = new Date();
          this.spinner =true;
          this.takeScreenshot();
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Inserer tout les champs' });
    }
  }
  takeScreenshot() {
    this.charteNuitApplicative = true;
    setTimeout(() => {
      this.dialogElement = this.myDiv.filterComponent.nativeElement;
      const options: MyOptions = {
        scale: 2,
        logging: true,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
      };
      html2canvas(this.dialogElement, options).then((canvas) => {
        this.SaveNuit();
      });
      this.charteNuitApplicative = false;
    }, 1000);
  }
}
