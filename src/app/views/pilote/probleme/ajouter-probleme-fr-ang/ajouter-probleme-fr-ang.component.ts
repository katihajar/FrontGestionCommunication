import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AvancementActionProbleme } from 'src/app/controller/model/avancement-action-probleme';
import { DestinataireCommunication } from 'src/app/controller/model/destinataire-communication';
import { MyOptions } from 'src/app/controller/model/myoption';
import { Probleme } from 'src/app/controller/model/probleme';
import { ApplicationService } from 'src/app/controller/service/application.service';
import { AuthService } from 'src/app/controller/service/auth.service';
import { CharteService } from 'src/app/controller/service/charte.service';
import { DestinataireService } from 'src/app/controller/service/destinataire.service';
import { EmaildraftsService } from 'src/app/controller/service/emaildrafts.service';
import { ProblemeService } from 'src/app/controller/service/probleme.service';
import translate from 'translate';
import { CharteProblemeFrAngComponent } from '../charte-probleme-fr-ang/charte-probleme-fr-ang.component';

@Component({
  selector: 'app-ajouter-probleme-fr-ang',
  templateUrl: './ajouter-probleme-fr-ang.component.html',
  styleUrls: ['./ajouter-probleme-fr-ang.component.scss']
})
export class AjouterProblemeFrAngComponent implements OnInit{
  spinner:boolean=false;
  content:string=String();
  AvancementAction = new AvancementActionProbleme();
  AvancementActionAng = new AvancementActionProbleme();
  ListAvancementAction= new Array<AvancementActionProbleme>();
  ListAvancementActionAng= new Array<AvancementActionProbleme>();
  listDestinataire:Array<DestinataireCommunication>= new Array<DestinataireCommunication>();
  EmailObligatoire:any[]=[];
  EmailEnCC:any[]=[];
  Subject:string = String();
  dialogElement:any;
  @ViewChild(CharteProblemeFrAngComponent,{static:false}) myDiv: any ;
  constructor(private emailService:EmaildraftsService,private destService:DestinataireService,private charteService: CharteService, private problemeService: ProblemeService, private confirmationService: ConfirmationService,
    private router: Router, private appService: ApplicationService, private messageService: MessageService, private userService: AuthService) {
      if(this.AddProbleme.application.nomApplication == '' && this.AddProbleme.statut=='' ){
        this.router.navigate(['/pilote/probleme/registre']);
      }
  }
  ngOnInit(): void {
    this.AvancementAction = new AvancementActionProbleme();
    this.AddProblemeAng = new Probleme();
    this.AvancementActionAng = new AvancementActionProbleme();
    this.ListAvancementAction = new Array<AvancementActionProbleme>();
    this.ListAvancementActionAng = new Array<AvancementActionProbleme>();
    this.listDestinataire = new Array<DestinataireCommunication>();
    this.AvancementAction = new AvancementActionProbleme();
    this.ListAvancementAction =this.AddProbleme.avancementActionProbleme;
    if(this.AddProbleme.topic != ''){
    this.translateInput();}
    this.destService.FindDestinataireByApplication(this.AddProbleme.application.id).subscribe((data)=>{
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
    if (this.AddProbleme.statut == "En cours") {
      this.AddProblemeAng.statut = "On-going";
    } else if (this.AddProbleme.statut == "Clos") {
      this.AddProblemeAng.statut = "Closed";
    } 
  }
  translateInput() {
    if(this.AddProbleme.topic){
    translate(this.AddProbleme.topic, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddProblemeAng.topic = result;
    })
      .catch((error: any) => {
        console.error(error);
      });}
      if(this.AddProbleme.description){
    translate(this.AddProbleme.description, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddProblemeAng.description = result;
    })
      .catch((error: any) => {
        console.error(error);
      });
    }
    if(this.AddProbleme.ananlyse){
    translate(this.AddProbleme.ananlyse, { from: 'fr', to: 'en' }).then((result: string) => {
      this.AddProblemeAng.ananlyse = result;
    })
      .catch((error: any) => {
        console.error(error);
      });

    }

    this.AddProblemeAng.dateAjout = this.AddProbleme.dateAjout;
    this.AddProblemeAng.application = this.AddProbleme.application;
    for (let i = 0; i < this.AddProbleme.avancementActionProbleme?.length; i++) {
      if(this.AddProbleme.avancementActionProbleme[i].topic){
      translate(this.AddProbleme.avancementActionProbleme[i].topic, { from: 'fr', to: 'en' }).then((result: string) => {
        this.AvancementActionAng.topic = result; 
        if(this.AddProbleme.avancementActionProbleme[i].update){
        translate(this.AddProbleme.avancementActionProbleme[i].update, { from: 'fr', to: 'en' }).then((result: string) => {
          this.AvancementActionAng.update = result; 
          this.ListAvancementActionAng.push(this.AvancementActionAng);
          this.AvancementActionAng = new AvancementActionProbleme();
        })
          .catch((error: any) => {
            console.error(error);
          });}
      })
        .catch((error: any) => {
          console.error(error);
        });
      }
    }
    this.AddProblemeAng.avancementActionProbleme = this.ListAvancementActionAng;
  }
  get AddProbleme(): Probleme {
    return this.problemeService.AddProbleme;
  }
  
  set AddProbleme(value: Probleme) {
    this.problemeService.AddProbleme = value;
  }
  get AddProblemeAng(): Probleme {
    return this.problemeService.AddProblemeAng;
  }

  set AddProblemeAng(value: Probleme) {
    this.problemeService.AddProblemeAng = value;
  }
  get charteProblemefr(): boolean {
    return this.charteService.charteProblemefr;
  }

  set charteProblemefr(value: boolean) {
    this.charteService.charteProblemefr = value;
  }
  get charteProblemefrAng(): boolean {
    return this.charteService.charteProblemefrAng;
  }

  set charteProblemefrAng(value: boolean) {
    this.charteService.charteProblemefrAng = value;
  }
  get charteProblemeAng(): boolean {
    return this.charteService.charteProblemeAng;
  }

  set charteProblemeAng(value: boolean) {
    this.charteService.charteProblemeAng = value;
  }
  
  removeAvancementAction(cont: AvancementActionProbleme) {
    let i = this.ListAvancementAction.indexOf(cont);
    this.ListAvancementAction.splice(i, 1);
  }
  removeAvancementActionAng(cont: AvancementActionProbleme) {
    let i = this.ListAvancementActionAng.indexOf(cont);
    this.ListAvancementActionAng.splice(i, 1);
  }
  AddAvancementAction() {
    if (this.AvancementAction.topic != '' && this.AvancementAction.update != '') {
      this.ListAvancementAction.push(this.AvancementAction);
      this.AvancementAction = new AvancementActionProbleme();
    }else{
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
    }
  }
  AddAvancementActionAng() {
    if (this.AvancementActionAng.topic != '' && this.AvancementActionAng.update != '') {
      this.ListAvancementActionAng.push(this.AvancementActionAng);
      this.AvancementActionAng = new AvancementActionProbleme();
    }else{
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
    }
  }
  showCharte(){
    this.AddProbleme.avancementActionProbleme=this.ListAvancementAction;
    this.AddProblemeAng.avancementActionProbleme=this.ListAvancementActionAng;
    this.AddProblemeAng.application = this.AddProbleme.application;
    this.charteProblemefrAng = true;
  }
  SaveProbleme(){
    this.AddProbleme.dateAjout = new Date();
    this.Subject = '['+this.AddProbleme.application.nomApplication+'] – Problem status – '+moment(this.AddProbleme.dateAjout).format('DD/MM/YYYY');
    this.content = `<div style="width: 600px;">${this.dialogElement.innerHTML}</div>`;

      this.problemeService.SaveProbleme().subscribe((data) => {
        this.emailService.authenticateAndRetrieveAccessToken(this.EmailObligatoire, this.EmailEnCC, this.Subject, this.content);    
                     this.AddProbleme=new Probleme();
                     this.ListAvancementAction = new Array<AvancementActionProbleme>();
                     this.ListAvancementActionAng = new Array<AvancementActionProbleme>();
                     this.spinner= false;
             this.router.navigate(['/pilote/probleme/registre']);
           
             this.messageService.add({severity:'success', summary: 'Success', detail: 'Probleme Ajouter avec succès'});
            },error=>{
              this.spinner= false;
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement'});
      })
     
  }
  takeScreenshot() {
    this.charteProblemefrAng = true;

    setTimeout(() => {
   
      this.dialogElement = this.myDiv.filterComponent.nativeElement;
     
      const options: MyOptions = {
        scale: 2,
        logging: true,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
      };
      html2canvas(this.dialogElement, options).then((canvas) => {
        this.SaveProbleme();
      });
      this.charteProblemefrAng = false;


    }, 1000);
  }
  SendAndSaveProbleme() {
    this.AddProbleme.avancementActionProbleme=this.ListAvancementAction;
    this.AddProblemeAng.avancementActionProbleme=this.ListAvancementActionAng;
    this.AddProblemeAng.application = this.AddProbleme.application;
    this.AddProbleme.id=0;
    this.AddProbleme.dateAjout=new Date();
    if(this.AddProbleme.topic != '' && this.AddProbleme.statut != '' && this.AddProbleme.dateAjout !=null && this.AddProbleme.application !=null && this.AddProbleme.description !=null){
      this.spinner= true;
      this.takeScreenshot();
  }else{
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
  }
}
isSubmitDisabled(){
  return !this.AddProbleme.topic || this.AddProbleme.topic.length < 3||  !this.AddProbleme.dateAjout
  || !this.AddProbleme.description || this.AddProbleme.description.length < 3||
    !this.AddProbleme.ananlyse || this.AddProbleme.ananlyse.length < 3 || this.ListAvancementAction?.length == 0 ||
    !this.AddProblemeAng.topic || this.AddProblemeAng.topic.length < 3 
   || !this.AddProblemeAng.dateAjout || !this.AddProblemeAng.description || this.AddProblemeAng.description.length < 3||
    !this.AddProblemeAng.ananlyse || this.AddProblemeAng.ananlyse.length < 3 || this.ListAvancementActionAng?.length == 0;

 
}
}
