import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DestinataireCommunication } from 'src/app/controller/model/destinataire-communication';
import { HealthCheckBwPerimetre } from 'src/app/controller/model/health-check-bw-perimetre';
import { HealthCheckBwPerimetreDetail } from 'src/app/controller/model/health-check-bw-perimetre-detail';
import { Perimetre } from 'src/app/controller/model/perimetre';
import { CharteService } from 'src/app/controller/service/charte.service';
import { HealthCheckBwPerimetreService } from 'src/app/controller/service/health-check-bw-perimetre.service';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { MyOptions } from 'src/app/controller/model/myoption';
import { CharteHealthCheckBwPerimetreComponent } from '../charte-health-check-bw-perimetre/charte-health-check-bw-perimetre.component';
import { DestinataireService } from 'src/app/controller/service/destinataire.service';
const moment = require('moment');
@Component({
  selector: 'app-ajout-health-check-bw-perimetre',
  templateUrl: './ajout-health-check-bw-perimetre.component.html',
  styleUrls: ['./ajout-health-check-bw-perimetre.component.scss']
})
export class AjoutHealthCheckBwPerimetreComponent implements OnInit {

  ListStatut:any[]=[];
  userKey:any[]=[];
  ListPerimetre: Array<Perimetre>= new Array<Perimetre>();
  date2: Date = new Date();
  date3: Date = new Date();
  helthchekBwdetail: HealthCheckBwPerimetreDetail= new HealthCheckBwPerimetreDetail();
  listHelthchekBwdetail: Array<HealthCheckBwPerimetreDetail>= new Array<HealthCheckBwPerimetreDetail>();
  listDestinataire:Array<DestinataireCommunication>= new Array<DestinataireCommunication>();
  EmailObligatoire:any[]=[];
  EmailEnCC:any[]=[];
  imageDataUrl: string= String();
  Subject: string= String();
  dialogElement:any;
  @ViewChild(CharteHealthCheckBwPerimetreComponent,{static:false}) myDiv: any ;
  constructor(private healthService: HealthCheckBwPerimetreService,private charteService:CharteService,private router: Router,
    private messageService:MessageService,private destService: DestinataireService) { }

  ngOnInit(): void {
    this.FindPerimetre();
    this.helthchekBwdetail= new HealthCheckBwPerimetreDetail();
    this.listHelthchekBwdetail = new Array<HealthCheckBwPerimetreDetail>();
    this.listHelthchekBwdetail = this.AddHealthCheckBw.healthCheckBwPerimetreDetailList;
    this.ListStatut= [
      { name: 'OK' },
      { name: 'In progress' },
      { name: 'Critical data KO' },
      { name: 'Non critical data KO' }
    ];
    this.userKey= [
      { name: 'Yes' },
      { name: 'No' },
    ];
    this.destService.FindDestinataireHealthCheckBwPerimetre().subscribe((data)=>{
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
  AddDetails(){
    if(this.helthchekBwdetail.perimetre.titre != '' && this.helthchekBwdetail.statusNightTreatment!='' && this.helthchekBwdetail.statusNightTreatment!=''&& this.helthchekBwdetail.statusDataIntegrity!='' ){
    this.listHelthchekBwdetail.push(this.helthchekBwdetail);
    this.helthchekBwdetail = new HealthCheckBwPerimetreDetail();
  }else{
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
  }
}
removeDetails(us: HealthCheckBwPerimetreDetail) {
  let i = this.listHelthchekBwdetail.indexOf(us);
  this.listHelthchekBwdetail.splice(i, 1);
}
  FindPerimetre(){
    this.healthService.FindAllPerimetre().subscribe((data)=>{
      // @ts-ignore
      this.ListPerimetre= data.body;
    })
  }
  get AddHealthCheckBw(): HealthCheckBwPerimetre{
    return this.healthService.AddHealthCheckBw;
  }

  set AddHealthCheckBw(value: HealthCheckBwPerimetre) {
    this.healthService.AddHealthCheckBw = value;
  }

  
  get charteHealthCheckBw(): boolean {
    return this.charteService.charteHealthCheckBw;
  }

  set charteHealthCheckBw(value: boolean) {
    this.charteService.charteHealthCheckBw = value;
  }

  charte(){
    this.AddHealthCheckBw.id=0;
    this.AddHealthCheckBw.healthCheckBwPerimetreDetailList = this.listHelthchekBwdetail;
    this.charteHealthCheckBw = true;
  }
  SaveHealth(){
    this.Subject = this.AddHealthCheckBw.titre;
      this.healthService.SaveHealthCheck().subscribe((data) => {
             this.AddHealthCheckBw=new HealthCheckBwPerimetre();
             this.listHelthchekBwdetail = new Array<HealthCheckBwPerimetreDetail>();
             this.helthchekBwdetail= new HealthCheckBwPerimetreDetail;
             this.router.navigate(['/pilote/healthcheck/Bw/registre']);
             const mailtoLink = `mailto:${this.EmailObligatoire.join(';')}&subject=${this.Subject}&cc=${this.EmailEnCC.join(';')}`;
             window.open(mailtoLink, '_blank');
             this.messageService.add({severity:'success', summary: 'Success', detail: 'Incident Ajouter avec succès'});
            },error=>{
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement'});
      })
     
  }
  takeScreenshot() {

        this.charteHealthCheckBw = true;
      
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
       this.charteHealthCheckBw = false;

      
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
    this.AddHealthCheckBw.id=0;
    this.AddHealthCheckBw.healthCheckBwPerimetreDetailList = this.listHelthchekBwdetail;
    if(this.AddHealthCheckBw.healthCheckBwPerimetreDetailList.length != 0  ){
    this.takeScreenshot();
  }else{
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
  }
  }
}
