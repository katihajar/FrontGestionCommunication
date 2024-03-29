import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ChangementPlanifier } from 'src/app/controller/model/changement-planifier';
import { ContenuChangement } from 'src/app/controller/model/contenu-changement';
import { DestinataireCommunication } from 'src/app/controller/model/destinataire-communication';
import { ChangementService } from 'src/app/controller/service/changement.service';
import { CharteService } from 'src/app/controller/service/charte.service';
import { DestinataireService } from 'src/app/controller/service/destinataire.service';
import { CharteChangementFrComponent } from '../charte-changement-fr/charte-changement-fr.component';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { MyOptions } from 'src/app/controller/model/myoption';
import { EmaildraftsService } from 'src/app/controller/service/emaildrafts.service';
import { CharteOperationFrComponent } from '../../operation/charte-operation-fr/charte-operation-fr.component';
import { CharteChangeBiFrComponent } from '../charte-change-bi-fr/charte-change-bi-fr.component';
const moment = require('moment');

@Component({
  selector: 'app-ajouter-changement-fr',
  templateUrl: './ajouter-changement-fr.component.html',
  styleUrls: ['./ajouter-changement-fr.component.scss']
})
export class AjouterChangementFrComponent implements OnInit {
  spinner:boolean=false;
  content:string=String();
  date1: Date = new Date();
  date2: Date = new Date();
  date3: Date = new Date();
  Contenu= new ContenuChangement();
  listDestinataire:Array<DestinataireCommunication>= new Array<DestinataireCommunication>();
  EmailObligatoire:any[]=[];
  EmailEnCC:any[]=[];
  imageDataUrl: string= String();
  Subject: string= String();
  dialogElement:any;
  @ViewChild(CharteChangementFrComponent,{static:false}) myDiv: any ;
  @ViewChild(CharteOperationFrComponent,{static:false}) myDivOperation: any ;
  @ViewChild(CharteChangeBiFrComponent,{static:false}) myDivChangeBi: any ;
  constructor(private emailService:EmaildraftsService,private messageService: MessageService,private changeService: ChangementService,
    private charteService:CharteService,private router: Router,private destService:DestinataireService) {
      if(this.AddChangement.application.nomApplication == '' && this.AddChangement.statut=='' && this.AddChangement.type == ''){
        this.router.navigate(['/pilote/changement/registre']);
      }
     }

  ngOnInit(): void {
    this.listDestinataire = new Array<DestinataireCommunication>();
    this.Contenu = new ContenuChangement();
    this.ListContenu =this.AddChangement.contenuChangementList;
    this.destService.FindDestinataireByApplication(this.AddChangement.application.id).subscribe((data)=>{
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
  get charteChangeBiFr(): boolean {
    return this.charteService.charteChangeBiFr;
  }
  
  set charteChangeBiFr(value: boolean) {
    this.charteService.charteChangeBiFr = value;
  }
  get AddChangement(): ChangementPlanifier {
    return this.changeService.AddChangement;
  }

  set AddChangement(value: ChangementPlanifier) {
    this.changeService.AddChangement = value;
  }
  get charteOperationFr(): boolean {
    return this.charteService.charteOperationFr;
  }

  set charteOperationFr(value: boolean) {
    this.charteService.charteOperationFr = value;
  }
  get ListContenu(): Array<ContenuChangement>{

    return this.changeService.ListContenu;
  }

  set ListContenu(value: Array<ContenuChangement>) {
    this.changeService.ListContenu = value;
  }
  AddContenu(){
    if(this.Contenu.titre != '' && this.Contenu.description!=''  ){
    this.ListContenu.push(this.Contenu);
    this.Contenu = new ContenuChangement();
  }else{
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
  }
  }
  
  removeListContenu(cont: ContenuChangement) {
    let i = this.ListContenu.indexOf(cont);
    this.ListContenu.splice(i, 1);
  }

  isSubmitDisabled(){
    if(this.AddChangement.application.charteChangement == 'charte Changement Monetics' ){
  return !this.AddChangement.titre || this.AddChangement.titre.length < 3|| !this.AddChangement.version || !this.AddChangement.dateDebut
   || !this.AddChangement.dateFin || !this.AddChangement.detail || this.AddChangement.detail.length < 3||
    !this.AddChangement.impactMetier || this.AddChangement.impactMetier.length < 3 || this.ListContenu.length == 0;
}else{
  return !this.AddChangement.titre || this.AddChangement.titre.length < 3|| !this.AddChangement.dateDebut
  || !this.AddChangement.dateFin || !this.AddChangement.detail || this.AddChangement.detail.length < 3||
   !this.AddChangement.impactMetier || this.AddChangement.impactMetier.length < 3;
}}
  get charteChangeFr(): boolean {
    return this.charteService.charteChangeFr;
  }

  set charteChangeFr(value: boolean) {
    this.charteService.charteChangeFr = value;
  } 
   showCharte(){
    this.AddChangement.contenuChangementList=this.ListContenu;
    if(this.AddChangement.application.charteChangement == 'charte Changement Monetics' ){
      this.charteChangeFr = true;
    }else if(this.AddChangement.application.charteChangement == 'charte Changement lot1' ){
      this.charteChangeBiFr = true;
    }else{
      this.charteOperationFr = true;
    }
  }
  SaveChange(){
    this.AddChangement.dateAjout = new Date();
    if(this.AddChangement.application.charteChangement == 'charte Changement Monetics' ){
    if(this.AddChangement.statut =='Planifié'){
      this.Subject = '['+this.AddChangement.type+'] '+this.AddChangement.application.nomApplication+' '+this.AddChangement.version+' - Planned change - '+moment(this.AddChangement.dateDebut).format('DD/MM/YYYY');
     }else if(this.AddChangement.statut =='Terminé avec succès'){
      this.Subject = '['+this.AddChangement.type+'] '+this.AddChangement.application.nomApplication+' '+this.AddChangement.version+' - Completed Change - '+moment(this.AddChangement.dateDebut).format('DD/MM/YYYY');
     }
     this.content = `<div style="max-width: 100%; width: 600px;">${this.dialogElement.innerHTML}</div>`;
    } else if(this.AddChangement.application.charteChangement == 'charte Changement lot1' ){
      if(this.AddChangement.statut =='Planifié'){
        if(this.AddChangement.debut=='Oui'){
        this.Subject = '[TOTALENERGIES - APP] [Communication N°2] Operation started/Début d\'opération-'+this.AddChangement.application.nomApplication;
      }else{
        this.Subject = '[TOTALENERGIES - APP] [Communication N°1] Scheduled operation/Opération Planifiée-'+this.AddChangement.application.nomApplication;
      }
     }else if(this.AddChangement.statut =='Terminé avec succès'){
        this.Subject = '[TOTALENERGIES - APP] [Communication N°3] - End of operation/Fin de l\'opération-'+this.AddChangement.application.nomApplication;
       }
       this.content  = `<div style="width: 700px;">${this.dialogElement.innerHTML}</div>`;
    }else{
      this.content  = `<div style="width: 600px;">${this.dialogElement.innerHTML}</div>`;

    }
      this.changeService.SaveChangement().subscribe((data) => {
        this.emailService.authenticateAndRetrieveAccessToken(this.EmailObligatoire, this.EmailEnCC, this.Subject, this.content);          
             this.AddChangement=new ChangementPlanifier();
             this.ListContenu = new Array<ContenuChangement>();
             this.spinner=false;
             this.router.navigate(['/pilote/changement/registre']);
             const mailtoLink = `mailto:${this.EmailObligatoire.join(';')}&subject=${this.Subject}&cc=${this.EmailEnCC.join(';')}`;
             // window.open(mailtoLink, '_blank');
             this.messageService.add({severity:'success', summary: 'Success', detail: 'Changement Ajouter avec succès'});
            },error=>{
              this.spinner=false;
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement'});
      })
   
  }
  takeScreenshot() {
    if(this.AddChangement.application.charteChangement == 'charte Changement Monetics' ){
      this.charteChangeFr = true;
    }else if(this.AddChangement.application.charteChangement == 'charte Changement lot1' ){
      this.charteChangeBiFr = true;
    }else{
      this.charteOperationFr = true;
    }
     
    setTimeout(() => {
      if(this.AddChangement.application.charteChangement == 'charte Changement Monetics' ){
        this.dialogElement = this.myDiv.filterComponent.nativeElement;
      }else  if(this.AddChangement.application.charteChangement == 'charte Changement lot1' ){
        this.dialogElement = this.myDivChangeBi.filterComponent.nativeElement;
      }else{
        this.dialogElement = this.myDivOperation.filterComponent.nativeElement;
      }
      const options: MyOptions = {
        scale: 2,
        logging: true,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
      };
      html2canvas(this.dialogElement, options).then((canvas) => {
        // this.imageDataUrl = canvas.toDataURL();
        // const blob = this.dataURLtoBlob(this.imageDataUrl);
        // const imageUrl = URL.createObjectURL(blob); // create URL object from blob
        // const file = new File([blob], this.AddChangement.titre+'-'+this.AddChangement.application.nomApplication+'.png', { type: 'image/png' });
       // saveAs(file);
        this.SaveChange();
      });
      if(this.AddChangement.application.charteChangement == 'charte Changement Monetics' ){
        this.charteChangeFr = false;
      }else if(this.AddChangement.application.charteChangement == 'charte Changement lot1' ){
        this.charteChangeBiFr = false;
      }else{
        this.charteOperationFr = false;
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

  SendAndSaveChange() {
    this.AddChangement.contenuChangementList = this.ListContenu;
    this.AddChangement.id=0;
    if(this.AddChangement.titre != '' && this.AddChangement.impactMetier != '' &&this.AddChangement.version != '' && this.AddChangement.dateDebut !=null){
      this.spinner= true;
      this.takeScreenshot();
     }else{
       this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
     }
  }
}
