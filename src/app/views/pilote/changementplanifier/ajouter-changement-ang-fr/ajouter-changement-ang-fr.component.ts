import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ChangementPlanifier } from 'src/app/controller/model/changement-planifier';
import { ContenuChangement } from 'src/app/controller/model/contenu-changement';
import { DestinataireCommunication } from 'src/app/controller/model/destinataire-communication';
import { ChangementService } from 'src/app/controller/service/changement.service';
import { CharteService } from 'src/app/controller/service/charte.service';
import { DestinataireService } from 'src/app/controller/service/destinataire.service';
import { CharteChangementFrAngComponent } from '../charte-changement-fr-ang/charte-changement-fr-ang.component';
const translate = require('translate');
const moment = require('moment');
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { MyOptions } from 'src/app/controller/model/myoption';
@Component({
  selector: 'app-ajouter-changement-ang-fr',
  templateUrl: './ajouter-changement-ang-fr.component.html',
  styleUrls: ['./ajouter-changement-ang-fr.component.scss']
})
export class AjouterChangementAngFrComponent implements OnInit {
  imageDataUrl: string= String();
  date1: Date = new Date();
  date2: Date = new Date();
  date3: Date = new Date();
  date4: Date = new Date();
  Contenu = new ContenuChangement();
  ContenuAng = new ContenuChangement();
  screenshotDataUrl: any;
  listDestinataire:Array<DestinataireCommunication>= new Array<DestinataireCommunication>();
  EmailObligatoire:any[]=[];
  EmailEnCC:any[]=[];
  Subject:string = String();
  dialogElement:any;
  @ViewChild(CharteChangementFrAngComponent,{static:false}) myDiv: any ;
  constructor(private messageService: MessageService,private changeService: ChangementService,
    private charteService:CharteService,private router: Router,private destService:DestinataireService) { }

  ngOnInit(): void {
    this.Contenu = new ContenuChangement();
    this.AddChangementAng = new ChangementPlanifier();
    this.ContenuAng = new ContenuChangement();
    this.ListContenu = new Array<ContenuChangement>();
    this.ListContenuAng = new Array<ContenuChangement>();
    this.listDestinataire = new Array<DestinataireCommunication>();
    this.Contenu = new ContenuChangement();
    this.ListContenu =this.AddChangement.contenuChangementList;
    if(this.AddChangement.titre != ''){
    this.translateInput();}
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
    });
    if (this.AddChangement.statut == "Planifié") {
      this.AddChangementAng.statut = "Scheduled";
    } else if (this.AddChangement.statut == "Terminé avec succès") {
      this.AddChangementAng.statut = "Completed successfully";
    } 
  }
  translateInput() {
    translate(this.AddChangement.titre, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddChangementAng.titre = result;
    })
      .catch((error: any) => {
        console.error(error);
      });
    translate(this.AddChangement.impactMetier, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddChangementAng.impactMetier = result;
    })
      .catch((error: any) => {
        console.error(error);
      });
      translate(this.AddChangement.detail, { from: 'fr', to: 'en' }).then((result: string) => {
        this.AddChangementAng.detail = result;
      })
        .catch((error: any) => {
          console.error(error);
        });
    this.AddChangementAng.version = this.AddChangement.version;
    this.AddChangementAng.dateDebut = this.AddChangement.dateDebut;
    this.AddChangementAng.dateFin = this.AddChangement.dateFin;

    for (let i = 0; i < this.AddChangement.contenuChangementList.length; i++) {
      translate(this.AddChangement.contenuChangementList[i].description, { from: 'fr', to: 'en' }).then((result: string) => {
        this.ContenuAng.description = result; 
        translate(this.AddChangement.contenuChangementList[i].titre, { from: 'fr', to: 'en' }).then((result: string) => {
          this.ContenuAng.titre = result; 
          this.ListContenuAng.push(this.ContenuAng);
          this.ContenuAng = new ContenuChangement();
        })
          .catch((error: any) => {
            console.error(error);
          }); 
      })
        .catch((error: any) => {
          console.error(error);
        }); 
             
    }
    this.AddChangementAng.contenuChangementList=this.ListContenuAng;
  }
  get ListContenuAng(): Array<ContenuChangement>{
    return this.changeService.ListContenuAng;
  }

  set ListContenuAng(value: Array<ContenuChangement>) {
    this.changeService.ListContenuAng = value;
  }
  get AddChangementAng(): ChangementPlanifier {
    return this.changeService.AddChangementAng;
  }

  set AddChangementAng(value: ChangementPlanifier) {
    this.changeService.AddChangementAng = value;
  }
  get AddChangement(): ChangementPlanifier {
    return this.changeService.AddChangement;
  }

  set AddChangement(value: ChangementPlanifier) {
    this.changeService.AddChangement = value;
  }
  get ListContenu(): Array<ContenuChangement>{

    return this.changeService.ListContenu;
  }

  set ListContenu(value: Array<ContenuChangement>) {
    this.changeService.ListContenu = value;
  }
  get charteChangeAngFr(): boolean {
    return this.charteService.charteChangeAngFr;
  }

  set charteChangeAngFr(value: boolean) {
    this.charteService.charteChangeAngFr = value;
  }
  removeListContenu(cont: ContenuChangement) {
    let i = this.ListContenu.indexOf(cont);
    this.ListContenu.splice(i, 1);
  }
  removeListContenuAng(cont: ContenuChangement) {
    let i = this.ListContenuAng.indexOf(cont);
    this.ListContenuAng.splice(i, 1);
  }
  AddContenu() {
    if (this.Contenu.titre != '' && this.Contenu.description != '') {
      this.ListContenu.push(this.Contenu);
      this.Contenu = new ContenuChangement();
    }else{
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
    }
  }
  AddContenuAng() {
    if (this.ContenuAng.titre != '' && this.ContenuAng.description != '') {
      this.ListContenuAng.push(this.ContenuAng);
      this.ContenuAng = new ContenuChangement();
    }else{
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
    }
  }
  showCharte(){
    this.AddChangement.contenuChangementList=this.ListContenu;
    this.AddChangementAng.contenuChangementList=this.ListContenuAng;
    this.AddChangementAng.application = this.AddChangement.application;
      this.charteChangeAngFr = true;
  }
  SaveChange(){
    this.AddChangement.dateAjout = new Date();
    if(this.AddChangement.statut =='Planifié'){
      this.Subject = '[PRODUCTION] '+this.AddChangement.application.nomApplication+' '+this.AddChangement.version+' - Planned change - '+moment(this.AddChangement.dateDebut).format('DD/MM/YYYY');
     }else if(this.AddChangement.statut =='Terminé avec succès'){
      this.Subject = '[PRODUCTION] '+this.AddChangement.application.nomApplication+' '+this.AddChangement.version+' - Completed Change - '+moment(this.AddChangement.dateDebut).format('DD/MM/YYYY');
     }
    if(this.AddChangement.titre != '' && this.AddChangement.impactMetier != '' &&this.AddChangement.version != '' && this.AddChangement.dateDebut !=null){
      this.changeService.SaveChangement().subscribe((data) => {
             this.AddChangement=new ChangementPlanifier();
             this.ListContenu = new Array<ContenuChangement>();
             this.router.navigate(['/pilote/changement/registre']);
             const mailtoLink = `mailto:${this.EmailObligatoire.join(';')}&subject=${this.Subject}&cc=${this.EmailEnCC.join(';')}`;
             window.open(mailtoLink, '_blank');
             this.messageService.add({severity:'success', summary: 'Success', detail: 'Changement Ajouter avec succès'});
            },error=>{
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement'});
      })
      }else{
        this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
      }
  }
  takeScreenshot() {
      this.charteChangeAngFr = true;
     
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
        const file = new File([blob], this.AddChangement.titre+'-'+this.AddChangement.application.nomApplication+'.png', { type: 'image/png' });
        saveAs(file);
        this.SaveChange();
      });
      this.charteChangeAngFr = false;

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
    this.AddChangement.contenuChangementList=this.ListContenu;
    this.AddChangementAng.contenuChangementList=this.ListContenuAng;
    this.AddChangementAng.application = this.AddChangement.application;
    this.AddChangement.id=0;
   this.takeScreenshot();
}
}
