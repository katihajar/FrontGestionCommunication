import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Operation } from 'src/app/controller/model/operation';
import { CharteService } from 'src/app/controller/service/charte.service';
import { OperationService } from 'src/app/controller/service/operation.service';
const translate = require('translate');
import html2canvas from 'html2canvas';
import { MessageService } from 'primeng/api';
import { saveAs } from 'file-saver';
import { MyOptions } from 'src/app/controller/model/myoption';
import { CharteOperationFrAngComponent } from '../charte-operation-fr-ang/charte-operation-fr-ang.component';
import { DestinataireService } from 'src/app/controller/service/destinataire.service';
import { DestinataireCommunication } from 'src/app/controller/model/destinataire-communication';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ajouter-operation-fr-ang',
  templateUrl: './ajouter-operation-fr-ang.component.html',
  styleUrls: ['./ajouter-operation-fr-ang.component.scss']
})
export class AjouterOperationFrAngComponent implements OnInit {
  imageDataUrl:any;
  dialogElement:any;
  date1: Date = new Date();
  date2: Date = new Date();
  date3: Date = new Date();
  Subject:any;
  EmailObligatoire:any[]=[];
  EmailEnCC:any[]=[];
  listDestinataire:Array<DestinataireCommunication>= new Array<DestinataireCommunication>();
  @ViewChild(CharteOperationFrAngComponent,{static:false}) myDiv: any ;
  constructor(private operationService: OperationService,private messageService: MessageService,private router:Router,
    private charte: CharteService,private destService: DestinataireService) { 
      if(this.AddOperation.application.nomApplication == '' && this.AddOperation.statut=='' ){
        this.router.navigate(['/pilote/operation/registre']);
      }
    }
  clear(table: Table) {
    table.clear();
  }

  ngOnInit(): void {
    this.AddOperationAng.statut = this.AddOperation.statut;
    this.AddOperationAng.application = this.AddOperation.application;
    if(this.AddOperation.titre != '' || this.AddOperation.description != '' ){
      this.translateInput();
    }
    this.destService.FindDestinataireByApplication(this.AddOperation.application.id).subscribe((data)=>{
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
  isSubmitDisabled() {
    return !this.AddOperation.titre || this.AddOperation.titre.length < 3 ||
           !this.AddOperation.description || this.AddOperation.description.length < 3 ||
           !this.AddOperation.dateDebut || !this.AddOperationAng.titre || this.AddOperationAng.titre.length < 3 ||
           !this.AddOperationAng.description || this.AddOperationAng.description.length < 3 ||
           !this.AddOperationAng.dateDebut;
  }
  get AddOperation(): Operation{
    return this.operationService.AddOperation;
  }

  set AddOperation(value: Operation) {
    this.operationService.AddOperation = value;
  }
  get AddOperationAng(): Operation{
    return this.operationService.AddOperationAng;
  }

  set AddOperationAng(value: Operation) {
    this.operationService.AddOperationAng = value;
  }
  get charteOperationAngFr(): boolean {
    return this.charte.charteOperationAngFr;
  }

  set charteOperationAngFr(value: boolean) {
    this.charte.charteOperationAngFr = value;
  }
  showCharte() {
    this.charteOperationAngFr = true
  }
  translateInput() {
    translate(this.AddOperation.titre, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddOperationAng.titre = result;
    })
      .catch((error: any) => {
        console.error(error);
      });
    translate(this.AddOperation.description, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddOperationAng.description = result;
    })
      .catch((error: any) => {
        console.error(error);
      });
      translate(this.AddOperation.impactMetier, { from: 'fr', to: 'en' }).then((result: string) => {
        this.AddOperationAng.impactMetier = result;
      })
        .catch((error: any) => {
          console.error(error);
        });
      this.AddOperationAng.numero = this.AddOperation.numero;
      this.AddOperationAng.dateDebut = this.AddOperation.dateDebut;
      this.AddOperationAng.dateFin = this.AddOperation.dateFin;
  }


  takeScreenshot() {  
    this.charteOperationAngFr = true;
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
        const file = new File([blob], this.AddOperation.titre+'-'+this.AddOperation.application.nomApplication+'.png', { type: 'image/png' });
        saveAs(file);
        this.SaveOperation();
      });
        this.charteOperationAngFr = false;
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
  SendAndSaveOper() {
      this.AddOperation.id=0;
      if(this.AddOperation.impactMetier != '' &&this.AddOperation.description != '' && this.AddOperation.titre != '' && this.AddOperation.dateDebut !=null && this.AddOperationAng.impactMetier != '' && this.AddOperationAng.description != '' && this.AddOperationAng.titre != '' && this.AddOperationAng.dateDebut !=null){
        this.takeScreenshot();
      }else{
        this.messageService.add({severity:'warn', summary: 'Warning', detail: 'Insérer tout les champs'});
      }  }
  SaveOperation(){
    this.AddOperation.dateAjout = new Date();
   if(this.AddOperation.statut=='Planifier'){
    this.Subject = '[TOTALENERGIES][COMMUNICATION] -N°.'+this.AddOperation.numero+' - Description Courte de l\'Operation Planiafiée'; 
   }else if(this.AddOperation.statut=='Terminer'){
      this.Subject = '[TOTALENERGIES][COMMUNICATION] -N°.'+this.AddOperation.numero+' - Description Courte de l\'Operation Terminée'; 
   }
      this.operationService.SaveOperation().subscribe((data) => {
             this.AddOperation=new Operation();
             this.AddOperationAng=new Operation();
             const mailtoLink = `mailto:${this.EmailObligatoire.join(';')}&subject=${this.Subject}&cc=${this.EmailEnCC.join(';')}`;
             window.open(mailtoLink, '_blank');
             this.router.navigate(['/pilote/operation/registre']);
             this.messageService.add({severity:'success', summary: 'Success', detail: 'Operation Ajouter avec succès'});
            },error=>{
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement verifier le titre d \'Operation'});
      })
     
    
  }
}


