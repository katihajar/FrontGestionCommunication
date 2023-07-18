import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import { Application } from 'src/app/controller/model/application';
import { AvancementActionProbleme } from 'src/app/controller/model/avancement-action-probleme';
import { PiloteApplication } from 'src/app/controller/model/pilote-application';
import { Probleme } from 'src/app/controller/model/probleme';
import { User } from 'src/app/controller/model/user';
import { ApplicationRespoService } from 'src/app/controller/service/application-respo.service';
import { AuthService } from 'src/app/controller/service/auth.service';
import { CharteService } from 'src/app/controller/service/charte.service';
import { ProblemeService } from 'src/app/controller/service/probleme.service';
import translate from 'translate';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-registre-probleme-respo',
  templateUrl: './registre-probleme-respo.component.html',
  styleUrls: ['./registre-probleme-respo.component.scss']
})
export class RegistreProblemeRespoComponent implements OnInit{
  ActionAng = new AvancementActionProbleme();
  ListAvancementActionProblemeAng = new Array<AvancementActionProbleme>();
  loading: boolean = true;
  statutProbleme: any[] = [];
  ListApp = new Array<Application>();
  searchApp = new Array<Application>();
  ListPiloteApp = new Array<PiloteApplication>();
  showPopUpprbld: boolean = false;
  application: Application = new Application();
  listLangage: any[] = [];
  listLangageCharte: any[] = [];
  langage: string = String();
  viewCharte: boolean = false;
  popUpLangue: boolean = false;
  optionType: boolean = false;
  selectLang: any = '';
  ListType: any[] = [];
  pageSize: number = 10;
  page: number = 0;
  first: number = 0;
  totalRecords: number = 0;
  currentPageReportTemplate: string = '';
  filterProbleme: Probleme = new Probleme();
  statutProblemeFiltre: any[] = [];
  searchActive: boolean = false;
  constructor(private charteService: CharteService, private problemeService: ProblemeService, private confirmationService: ConfirmationService,
    private router: Router, private appService: ApplicationRespoService, private messageService: MessageService, private userService: AuthService) {
  }
  clear() {
    this.searchActive = false;
    this.filterProbleme = new Probleme();
    this.loadProblemesLazy({ first: 0, rows: this.pageSize });
  }
  get User(): User {
    return this.userService.User;
  }

  set User(value: User) {
    this.userService.User = value;
  }
  get ListProblemeOfRespo(): Array<Probleme> {
    return this.problemeService.ListProblemeOfRespo;
  }

  set ListProblemeOfRespo(value: Array<Probleme>) {
    this.problemeService.ListProblemeOfRespo = value;
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
  exportExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.ListProblemeOfRespo.map(Probleme => {
        return {
          application: Probleme.application.nomApplication,
          Sujet: Probleme.topic,
          statut: Probleme.statut,
          description: Probleme.description,
          MethodeAnalyse: Probleme.ananlyse,
          date: Probleme.dateAjout,

        };
      })
    );

    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(excelData, 'probleme_export_' + new Date().getTime() + '.xlsx');
  }

  ShowCharte(prbl: Probleme) {
    this.AddProbleme = prbl;
    this.problemeService.FindAvancementActionProblemeByProblemeRespo(prbl.id).subscribe((data) => {
      // @ts-ignore
      this.AddProbleme.avancementActionProbleme = data.body;

      this.popUpLangue = true;
      this.AddProblemeAng = new Probleme();
      this.ListAvancementActionProblemeAng = new Array<AvancementActionProbleme>();
      if (this.AddProbleme.statut == "En cours") {
        this.AddProblemeAng.statut = "On-going";
      } else if (this.AddProbleme.statut == "Clos") {
        this.AddProblemeAng.statut = "Closed";
      }
    })
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
        this.ActionAng.topic = result; 
        if(this.AddProbleme.avancementActionProbleme[i].update){
        translate(this.AddProbleme.avancementActionProbleme[i].update, { from: 'fr', to: 'en' }).then((result: string) => {
          this.ActionAng.update = result; 
          this.ListAvancementActionProblemeAng.push(this.ActionAng);
          this.ActionAng = new AvancementActionProbleme();
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
    this.AddProblemeAng.avancementActionProbleme = this.ListAvancementActionProblemeAng;
  }
  
  loadProblemesLazy(event: LazyLoadEvent): void {
    this.loading = true;
    this.problemeService.FindProblemeByRespo(this.page, this.pageSize).subscribe((data) => {
      //@ts-ignore
      this.ListProblemeOfRespo = data.body.content;
      //@ts-ignore
      this.totalRecords = data.body.totalElements;
      this.currentPageReportTemplate = `Showing ${this.first + 1} to ${this.first + this.pageSize} of ${this.totalRecords} entries`;
      this.loading = false;
    });
  }
  lazyLoadHandler(event: LazyLoadEvent): void {

    if (this.searchActive == true) {
      if (event.first !== this.first || event.rows !== this.pageSize) {
        this.first = event.first ?? 0;
        this.pageSize = event.rows ?? 10;
        this.page = Math.floor(this.first / this.pageSize);
        this.searchProbleme();
      }
    } else {
      if (event.first !== this.first || event.rows !== this.pageSize) {
        this.first = event.first ?? 0;
        this.pageSize = event.rows ?? 10;
        this.page = Math.floor(this.first / this.pageSize);
        // Only trigger the loadProblemesLazy function if the page or pageSize has changed
        this.loadProblemesLazy(event);
      }
    }
  }
  SelectLanguage() {
    if (this.selectLang == "Français") {
      this.popUpLangue = false;

      this.charteProblemefr = true;
      this.selectLang = '';

    } else if (this.selectLang == "Français-Anglais") {
      this.translateInput();
      this.popUpLangue = false;
        this.charteProblemefrAng = true;
        this.selectLang = '';
      
    } else if (this.selectLang == "Anglais") {
      this.translateInput();
      this.popUpLangue = false;
      this.charteProblemeAng = true;
        this.selectLang = '';
      
    }
  }

  ngOnInit(): void {
    this.loadProblemesLazy({ first: 0, rows: this.pageSize });
    this.FindApp();
    this.getAppforSearch();
    this.AddProbleme = new Probleme();

    this.listLangage = [
      { name: 'Français' },
      { name: 'Français-Anglais' },
    ];
    this.listLangageCharte = [
      { name: 'Français' },
      { name: 'Français-Anglais' },
      { name: 'Anglais' }
    ];
    this.statutProblemeFiltre = [
      { name: 'En cours' },
      { name: 'Clos' },
    ];
    this.statutProbleme = [
      { name: 'En cours' },
      { name: 'Clos' },
    ];
  }


  searchProbleme() {
    this.loading = true;
    if (this.filterProbleme.application.id == null) {
      this.filterProbleme.application.id = 0;
    }
    if (!this.filterProbleme.description && !this.filterProbleme.dateAjout && !this.filterProbleme.topic && !this.filterProbleme.ananlyse && this.filterProbleme.application.id == 0 && !this.filterProbleme.statut) {
      this.clear();
    } else {
      this.problemeService.SearchProblemeRespo(this.filterProbleme.dateAjout, this.filterProbleme, this.page, this.pageSize).subscribe((data) => {
        this.searchActive = true;
        //@ts-ignore
        this.ListProblemeOfRespo = data.body.content;
        //@ts-ignore
        this.totalRecords = data.body.totalElements;
        this.currentPageReportTemplate = `Showing ${this.first + 1} to ${this.first + this.pageSize} of ${this.totalRecords} entries`;
        this.loading = false;

      })
    }
  }
  PopUp() {
    this.AddProbleme = new Probleme();
    this.AddProblemeAng = new Probleme();
    this.showPopUpprbld = true;
  }
  FindApp() {
    this.appService.FindApplicationByRespo().subscribe((data) => {
      // @ts-ignore
      this.ListPiloteApp = data.body;
      for (let i = 0; i < this.ListPiloteApp.length; i++) {
        let app = new Array<Application>;
        app.push(this.ListPiloteApp[i].application);
        for(let i= 0; i<app.length; i++){
          if(app[i]?.nomApplication != 'Health Check BI' && app[i]?.nomApplication != 'Health Check Monetics'){
            this.ListApp.push(app[i]);
          }
        }
      }
    })
  }


  getAppforSearch(){
    this.appService.FindApplicationBylotforRespo().subscribe((data) => {
      let app = new Array<Application>;
      // @ts-ignore
       app = data.body;
      for(let i= 0; i<app.length; i++){
        if(app[i].nomApplication != 'Health Check BI' && app[i].nomApplication != 'Health Check Monetics'){
          this.searchApp.push(app[i]);
        }
      }
  })
  }
  onDialogHideLang(){
    this.loadProblemesLazy({ first: 0, rows: this.pageSize });
    }

}
