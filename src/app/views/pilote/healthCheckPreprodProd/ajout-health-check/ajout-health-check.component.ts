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
const moment = require('moment');

@Component({
  selector: 'app-ajout-health-check',
  templateUrl: './ajout-health-check.component.html',
  styleUrls: ['./ajout-health-check.component.scss']
})
export class AjoutHealthCheckComponent implements OnInit {

  ListFeu:any[]=[];
  ListImpactClient:any[]=[];
  ListStatut:any[]=[];
  ListProcessus: Array<ProcessusMetier>= new Array<ProcessusMetier>();
  date2: Date = new Date();
  date3: Date = new Date();
  helthchekdetail: HealthChekPreprodProdDetail= new HealthChekPreprodProdDetail();
  etatproc: EtatProcessusMetier= new EtatProcessusMetier();
  listHelthchekdetail: Array<HealthChekPreprodProdDetail>= new Array<HealthChekPreprodProdDetail>();
  listEtatproc: Array<EtatProcessusMetier>= new Array<EtatProcessusMetier>();
  listDestinataire:Array<DestinataireCommunication>= new Array<DestinataireCommunication>();
  EmailObligatoire:any[]=[];
  EmailEnCC:any[]=[];
  imageDataUrl: string= String();
  Subject: string= String();
  dialogElement:any;
  @ViewChild(CharteHealthCheckComponent,{static:false}) myDiv: any ;
  constructor(private healthService: HealthCheckService,private charteService:CharteService,private router: Router,
    private confirmationService: ConfirmationService,private messageService:MessageService,private destService: DestinataireService) { }
    clear(table: Table) {
      table.clear();
    }
  ngOnInit(): void {
    this.FindApp();
    this.FindProcessus();
    this.listHelthchekdetail=new Array<HealthChekPreprodProdDetail>();
    this.listEtatproc=new Array<EtatProcessusMetier>();
    this.listEtatproc=this.AddHealthCheck.etatProcessusMetierList;
    this.listHelthchekdetail=this.AddHealthCheck.healthChekPreprodProdDetailList;
    this.ListFeu= [
      { name: 'OK' },
      { name: 'En cours d\'éxecuxtion' },
      { name: 'Flux non critique KO' },
      { name: 'Flux critique KO' }
    ];
    this.ListStatut= [
      { name: 'Ko' },
      { name: 'En cours' },
      { name: 'En attente' }
    ];
    this.ListImpactClient= [
      { name: 'OUI' },
      { name: 'NON' },
    ];
    this.destService.FindDestinataireHealthCheckProd().subscribe((data)=>{
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

  get AddHealthCheck(): HealthChekPreprodProd{
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
  AddEtat(){
    if(this.etatproc.statut != '' && this.etatproc.processusMetier.titre!=''  ){
    this.listEtatproc.push(this.etatproc);
    this.etatproc = new EtatProcessusMetier();
  } else{
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
  }
}
removeEtat(us: EtatProcessusMetier) {
  let i = this.listEtatproc.indexOf(us);
  this.listEtatproc.splice(i, 1);
}
AddDeatils(){
  if(this.helthchekdetail.statut != '' && this.helthchekdetail.application.nomApplication!='' && this.helthchekdetail.feu != '' && this.helthchekdetail.impactClient != '' && this.helthchekdetail.information != ''){
  this.listHelthchekdetail.push(this.helthchekdetail);
  this.helthchekdetail = new HealthChekPreprodProdDetail();
}else{        this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
}
}

removeDeatils(us: HealthChekPreprodProdDetail) {
  let i = this.listHelthchekdetail.indexOf(us);
  this.listHelthchekdetail.splice(i, 1);
}

  FindProcessus(){
    this.healthService.FindAllProcessusMetier().subscribe((data)=>{
      // @ts-ignore
      this.ListProcessus= data.body;
    })
  }
  get ListApp(): Array<Application>{
    return this.healthService.ListApp;
  }

  set ListApp(value: Array<Application>) {
    this.healthService.ListApp = value;
  }
  FindApp(){
    this.healthService.FindApp().subscribe((data)=>{
      // @ts-ignore
      this.ListApp= data.body;
    })
  }
  charte(){
    this.AddHealthCheck.etatProcessusMetierList = this.listEtatproc;
    this.AddHealthCheck.healthChekPreprodProdDetailList = this.listHelthchekdetail;
    this.FindApp();
    this.charteHealthCheckPreprodProd = true;
  }
  SaveHealth(){
    this.AddHealthCheck.dateAjout = new Date();
    this.Subject = '['+this.AddHealthCheck.type+'] Etat de santé Monétique – '+moment(this.AddHealthCheck.dateAjout).format('DD/MM/YYYY')+','+moment(this.AddHealthCheck.dateAjout).format('HH:MM');
      this.healthService.SaveHealthCheck().subscribe((data) => {
             this.AddHealthCheck=new HealthChekPreprodProd();
             this.listEtatproc = new Array<EtatProcessusMetier>();
             this.listHelthchekdetail= new Array<HealthChekPreprodProdDetail>();
             this.router.navigate(['/pilote/healthcheck/PreprodProd/registre']);
             const mailtoLink = `mailto:${this.EmailObligatoire.join(';')}&subject=${this.Subject}&cc=${this.EmailEnCC.join(';')}`;
             window.open(mailtoLink, '_blank');
             this.messageService.add({severity:'success', summary: 'Success', detail: 'Incident Ajouter avec succès'});
            },error=>{
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement'});
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
        const blob = this.dataURLtoBlob(this.imageDataUrl);
        const imageUrl = URL.createObjectURL(blob); // create URL object from blob
        const file = new File([blob], 'healthcheck.png', { type: 'image/png' });
        saveAs(file);
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
    this.AddHealthCheck.id=0;
    this.AddHealthCheck.etatProcessusMetierList = this.listEtatproc;
    this.AddHealthCheck.healthChekPreprodProdDetailList = this.listHelthchekdetail;
    if(this.AddHealthCheck.etatProcessusMetierList.length != 0 && this.AddHealthCheck.healthChekPreprodProdDetailList.length != 0  ){
    this.takeScreenshot();
  }else{
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
  }
  }
}
