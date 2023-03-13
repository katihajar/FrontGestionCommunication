import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Action } from 'rxjs/internal/scheduler/Action';
import { DestinataireCommunication } from 'src/app/controller/model/destinataire-communication';
import { Incident } from 'src/app/controller/model/incident';
import { PlanAction } from 'src/app/controller/model/plan-action';
import { CharteService } from 'src/app/controller/service/charte.service';
import { DestinataireService } from 'src/app/controller/service/destinataire.service';
import { IncidentService } from 'src/app/controller/service/incident.service';
import { CharteIncident3bfrComponent } from '../charte-incident3bfr/charte-incident3bfr.component';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { MyOptions } from 'src/app/controller/model/myoption';
import { CharteIncidentMoneticComponent } from '../charte-incident-monetic/charte-incident-monetic.component';

@Component({
  selector: 'app-ajouter-incident-pilote',
  templateUrl: './ajouter-incident-pilote.component.html',
  styleUrls: ['./ajouter-incident-pilote.component.scss']
})
export class AjouterIncidentPiloteComponent implements OnInit {
  StatutPlan:any[]=[];
  date1: Date = new Date();
  date2: Date = new Date();
  date3: Date = new Date();
  Action= new PlanAction();
  num:number= Number(0);
  listDestinataire:Array<DestinataireCommunication>= new Array<DestinataireCommunication>();
  EmailObligatoire:any[]=[];
  EmailEnCC:any[]=[];
  imageDataUrl: string= String();
  Subject: string= String();
  dialogElement:any;
  @ViewChild(CharteIncident3bfrComponent,{static:false}) myDiv: any ;
  @ViewChild(CharteIncidentMoneticComponent,{static:false}) myDivMonetic: any ;
  constructor(private incidentService: IncidentService, private messageService: MessageService,
    private charteService:CharteService,private router: Router,private destService:DestinataireService) { }
  clear(table: Table) {
    table.clear();
  }

  get ListPlanAction(): Array<PlanAction>{

    return this.incidentService.ListPlanAction;
  }

  set ListPlanAction(value: Array<PlanAction>) {
    this.incidentService.ListPlanAction = value;
  }

  ngOnInit(): void {
    this.listDestinataire = new Array<DestinataireCommunication>();
    this.Action = new PlanAction();
    this.num=1;
    this.ListPlanAction =this.AddIncident.planActionList;
    this.StatutPlan= [
      {name: 'En cours'},
      {name: 'A Démarer'},
      {name: 'Clos'},
  ];

this.destService.FindDestinataireByApplication(this.AddIncident.application.id).subscribe((data)=>{
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

  get AddIncident(): Incident{
    return this.incidentService.AddIncident;
  }

  set AddIncident(value: Incident) {
    this.incidentService.AddIncident = value;
  }

  AddAction(){
    if(this.Action.statut != null && this.Action.description!=null && this.num != null  ){
      this.Action.numero = this.num;
    this.ListPlanAction.push(this.Action);
    this.Action = new PlanAction();
    this.num = this.num+1;
  }
  }

  removeAction(us: PlanAction) {
    let i = this.ListPlanAction.indexOf(us);
    this.ListPlanAction.splice(i, 1);
    this.num = this.num - 1;
  }

  showCharte(){
    this.AddIncident.planActionList=this.ListPlanAction;
    if(this.AddIncident.application.charteIncident =='charte Incident'){
      this.charteIncident3Bfr = true;
    } else if(this.AddIncident.application.charteIncident =='charte Incident Monetics'){
        this.charteIncidentMonetic = true;
      }    
  }
  SaveIncident(){
    if(this.AddIncident.application.charteIncident =='charte Incident'){
      this.Subject = '[INCIDENT]['+this.AddIncident.application.nomApplication+'][Communication No.'+this.AddIncident.numeroIncident+'] '+this.AddIncident.titreIncident+' -  '+this.AddIncident.statut;
     }else if(this.AddIncident.application.charteIncident =='charte Incident Monetics'){
      this.Subject = '[PRODUCTION] '+this.AddIncident.application.nomApplication+' Incident '+this.AddIncident.numeroIncident+' - '+this.AddIncident.titreIncident;
     }
    if(this.AddIncident.description != null && this.AddIncident.causePrincipale != null &&this.AddIncident.situationActuelle != null && this.AddIncident.prochaineCommunication !=null){
      this.incidentService.SaveIncident().subscribe((data) => {
             this.AddIncident=new Incident();
             this.ListPlanAction = new Array<PlanAction>();
             this.router.navigate(['/pilote/incident/registre']);
             const mailtoLink = `mailto:${this.EmailObligatoire.join(',')}&subject=${this.Subject}&cc=${this.EmailEnCC.join(',')}`;
             window.open(mailtoLink, '_blank');
             this.messageService.add({severity:'success', summary: 'Success', detail: 'Incident Ajouter avec succès'});
            },error=>{
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement'});
      })
      }else{
        this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
      }
  }
  takeScreenshot() {
    if(this.AddIncident.application.charteIncident =='charte Incident'){
      this.charteIncident3Bfr = true;
    } else if(this.AddIncident.application.charteIncident =='charte Incident Monetics'){
        this.charteIncidentMonetic = true;
      }
    setTimeout(() => {
      if(this.AddIncident.application.charteIncident =='charte Incident'){
        this.dialogElement = this.myDiv.filterComponent.nativeElement;
        } else if(this.AddIncident.application.charteIncident =='charte Incident Monetics'){
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
        const file = new File([blob], this.AddIncident.titreIncident+'-'+this.AddIncident.application.nomApplication+'.png', { type: 'image/png' });
        saveAs(file);
        this.SaveIncident();
      });
      if(this.AddIncident.application.charteIncident =='charte Incident'){
        this.charteIncident3Bfr = false;
      } else if(this.AddIncident.application.charteIncident =='charte Incident Monetics'){
          this.charteIncidentMonetic = false;
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
    this.AddIncident.id=0;
    this.takeScreenshot();
  }
  get charteIncident3Bfr(): boolean {
    return this.charteService.charteIncident3Bfr;
  }

  set charteIncident3Bfr(value: boolean) {
    this.charteService.charteIncident3Bfr = value;
  }
  get charteIncidentMonetic(): boolean {
    return this.charteService.charteIncidentMonetic;
  }

  set charteIncidentMonetic(value: boolean) {
    this.charteService.charteIncidentMonetic = value;
  }
}
