import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DestinataireCommunication } from 'src/app/controller/model/destinataire-communication';
import { CharteService } from 'src/app/controller/service/charte.service';
import { DestinataireService } from 'src/app/controller/service/destinataire.service';
import { EmaildraftsService } from 'src/app/controller/service/emaildrafts.service';
import { MonitoringOptirentaService } from 'src/app/controller/service/monitoring-optirenta.service';
import { CharteMonitoringOptirentaComponent } from '../charte-monitoring-optirenta/charte-monitoring-optirenta.component';
import { Table } from 'primeng/table';
import { MonitoringOptirenta } from 'src/app/controller/model/monitoring-optirenta';
import { FluxOptirenta } from 'src/app/controller/model/flux-optirenta';
import * as moment from 'moment';
import { MyOptions } from 'src/app/controller/model/myoption';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-ajouter-monitoring-optirenta',
  templateUrl: './ajouter-monitoring-optirenta.component.html',
  styleUrls: ['./ajouter-monitoring-optirenta.component.scss']
})
export class AjouterMonitoringOptirentaComponent implements OnInit{
  spinner:boolean=false;
  ListEtat: any[] = [];
  listfluxOptirenta:  Array<FluxOptirenta>= new Array<FluxOptirenta>();
  fluxOptirenta:  FluxOptirenta= new FluxOptirenta();
  listDestinataire: Array<DestinataireCommunication> = new Array<DestinataireCommunication>();
  EmailObligatoire: any[] = [];
  EmailEnCC: any[] = [];
  imageDataUrl: string = String();
  Subject: string = String();
  dialogElement: any;
  @ViewChild(CharteMonitoringOptirentaComponent, { static: false }) myDiv: any;
  constructor(private emailService: EmaildraftsService, private optirentaService: MonitoringOptirentaService, private charteService: CharteService, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService, private destService: DestinataireService) {
  }
  clear(table: Table) {
    table.clear();
  }
  ngOnInit(): void {
    this.listfluxOptirenta = new Array<FluxOptirenta>();
    if(this.AddMonitoringOptirenta.fluxOptirentaList){
    this.listfluxOptirenta = this.AddMonitoringOptirenta.fluxOptirentaList;
  }
    this.ListEtat = [
      { name: 'OK' },
      { name: 'Point D\'attention' },
      { name: 'N/A' }
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

  get charteMonitoringOptirenta(): boolean {
    return this.charteService.charteMonitoringOptirenta;
  }

  set charteMonitoringOptirenta(value: boolean) {
    this.charteService.charteMonitoringOptirenta = value;
  }
  get AddMonitoringOptirenta(): MonitoringOptirenta {
    return this.optirentaService.AddMonitoringOptirenta;
  }

  set AddMonitoringOptirenta(value: MonitoringOptirenta) {
    this.optirentaService.AddMonitoringOptirenta = value;
  }
  AddFlux() {
    if (this.fluxOptirenta.nomFlux != '' && this.fluxOptirenta.etat != '' && this.fluxOptirenta.commentaire != '') {
      const match = this.listfluxOptirenta.find(flux => flux.nomFlux === this.fluxOptirenta.nomFlux);
      if (match) {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Vous avez déja ajouter l\'état de ce flux' });
      } else {
        this.listfluxOptirenta.push(this.fluxOptirenta);
        this.fluxOptirenta = new FluxOptirenta();
      }
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Insérer tout les champs' });
    }
  }
  removeFlux(us: FluxOptirenta) {
    let i = this.listfluxOptirenta.indexOf(us);
    this.listfluxOptirenta.splice(i, 1);
  }
  charte() {
    this.AddMonitoringOptirenta.fluxOptirentaList = this.listfluxOptirenta;
    this.charteMonitoringOptirenta = true;
  }
  Save() {
    this.AddMonitoringOptirenta.titre = 'OPTIRENTA Bilan suivi des flux du ' + moment(this.AddMonitoringOptirenta.dateAjout).format('DD/MM/YYYY') + ',' + moment(this.AddMonitoringOptirenta.dateAjout).format('HH:mm');
    this.Subject = 'OPTIRENTA Bilan suivi des flux du ' + moment(this.AddMonitoringOptirenta.dateAjout).format('DD/MM/YYYY');
    this.optirentaService.SaveMonitoring().subscribe((data) => {
      const content = `<div style="width: 650px;">${this.dialogElement.innerHTML}</div>`;
      this.emailService.authenticateAndRetrieveAccessToken(this.EmailObligatoire, this.EmailEnCC, this.Subject, content);      
      this.AddMonitoringOptirenta = new MonitoringOptirenta();
      this.listfluxOptirenta = new Array<FluxOptirenta>();
      this.spinner =false;
      this.router.navigate(['/pilote/healthcheck/Monetics/registre']);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Etat de santé Ajouter avec succès' });
    }, error => {
      this.spinner =false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement' });
    })

  }
  takeScreenshot() {
    this.charteMonitoringOptirenta = true;
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
        this.Save();
      });
      this.charteMonitoringOptirenta = false;
    }, 1000);
  }
  SendAndSave() {
    this.AddMonitoringOptirenta.id = 0;
    this.AddMonitoringOptirenta.fluxOptirentaList = this.listfluxOptirenta;
    if (this.AddMonitoringOptirenta.fluxOptirentaList?.length != 0 ) {    
          this.AddMonitoringOptirenta.dateAjout = new Date();
          this.spinner =true;
          this.takeScreenshot();
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Insérer tout la liste des flux' });
    }
  }
  isSubmitDisabled(){
    return this.AddMonitoringOptirenta.fluxOptirentaList?.length == 0 ;
  }
}
