import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import {
  ConfirmationService,
  ConfirmEventType,
  LazyLoadEvent,
  MessageService,
} from 'primeng/api';
import { EtatProcessusMetier } from 'src/app/controller/model/etat-processus-metier';
import { HealthCheckBwPerimetre } from 'src/app/controller/model/health-check-bw-perimetre';
import { HealthCheckBwPerimetreDetail } from 'src/app/controller/model/health-check-bw-perimetre-detail';
import { HealthCheckFlamingo } from 'src/app/controller/model/health-check-flamingo';
import { HealthChekPreprodProd } from 'src/app/controller/model/health-chek-preprod-prod';
import { HealthChekPreprodProdDetail } from 'src/app/controller/model/health-chek-preprod-prod-detail';
import { MonitoringMstoolbox } from 'src/app/controller/model/monitoring-mstoolbox';
import { MonitoringOptirenta } from 'src/app/controller/model/monitoring-optirenta';
import { NuitApplicative } from 'src/app/controller/model/nuit-applicative';
import { User } from 'src/app/controller/model/user';
import { AuthService } from 'src/app/controller/service/auth.service';
import { CharteService } from 'src/app/controller/service/charte.service';
import { HealthCheckBwPerimetreService } from 'src/app/controller/service/health-check-bw-perimetre.service';
import { HealthCheckService } from 'src/app/controller/service/health-check.service';
import { HealthcheckFlamingoService } from 'src/app/controller/service/healthcheck-flamingo.service';
import { MonitoringMstoolboxService } from 'src/app/controller/service/monitoring-mstoolbox.service';
import { MonitoringOptirentaService } from 'src/app/controller/service/monitoring-optirenta.service';
import { NuitApplicativeService } from 'src/app/controller/service/nuit-applicative.service';
const moment = require('moment');

@Component({
  selector: 'app-registre-health-check',
  templateUrl: './registre-health-check.component.html',
  styleUrls: ['./registre-health-check.component.scss'],
})
export class RegistreHealthCheckComponent implements OnInit {
  loading: boolean = true;
  loadingNuit: boolean = true;
  loadingBW: boolean = true;
  loadingFlamingo: boolean = true;
  loadingHealthOptirenta: boolean = true;
  loadingHealthMstoolbox: boolean = true;
  ListType: any[] = [];
  popUpAjout: boolean = false;
  popUpAjoutNuit: boolean = false;
  //// monetics ///
  filterHealthMonetics:HealthChekPreprodProd=new HealthChekPreprodProd();
  searchActiveHealthMonetics:boolean=false;
  pageSizeHealthMonetics: number = 10;
  pageHealthMonetics: number = 0;
  firstHealthMonetics: number = 0;
  totalRecordsHealthMonetics: number = 0;
  currentPageReportTemplateHealthMonetics: string = '';
  public dateHealthMonetics: Date |null = null;
    //// nuit ///
    filterNuitApplicative:NuitApplicative=new NuitApplicative();
    searchActiveNuitApplicative:boolean=false;
    pageSizeNuitApplicative: number = 10;
    pageNuitApplicative: number = 0;
    firstNuitApplicative: number = 0;
    totalRecordsNuitApplicative: number = 0;
    currentPageReportTemplateNuitApplicative: string = '';
    public dateNuitApplicative: Date |null = null;
   //// bi ///
   filterHealthBI:HealthCheckBwPerimetre=new HealthCheckBwPerimetre();
   searchActiveHealthBI:boolean=false;
   pageSizeHealthBI: number = 10;
   pageHealthBI: number = 0;
   firstHealthBI: number = 0;
   totalRecordsHealthBI: number = 0;
   currentPageReportTemplateHealthBI: string = '';
   public dateHealthBI: Date |null = null;
    //// suplyFlamingo ///
  filterHealthSuplyFlamingo:HealthCheckFlamingo=new HealthCheckFlamingo();
  searchActiveHealthSuplyFlamingo:boolean=false;
  pageSizeHealthSuplyFlamingo: number = 10;
  pageHealthSuplyFlamingo: number = 0;
  firstHealthSuplyFlamingo: number = 0;
  totalRecordsHealthSuplyFlamingo: number = 0;
  currentPageReportTemplateHealthSuplyFlamingo: string = '';
  public dateHealthSuplyFlamingo: Date |null = null;
   //// HealthOptirenta ///
   filterHealthOptirenta :MonitoringOptirenta=new MonitoringOptirenta();
   searchActiveHealthOptirenta:boolean=false;
   pageSizeHealthOptirenta: number = 10;
   pageHealthOptirenta: number = 0;
   firstHealthOptirenta: number = 0;
   totalRecordsHealthOptirenta: number = 0;
   currentPageReportTemplateHealthOptirenta: string = '';
   public dateHealthOptirenta: Date |null = null;
   //// HealthMstoolbox ///
   filterHealthMstoolbox :MonitoringMstoolbox=new MonitoringMstoolbox();
   searchActiveHealthMstoolbox:boolean=false;
   pageSizeHealthMstoolbox: number = 10;
   pageHealthMstoolbox: number = 0;
   firstHealthMstoolbox: number = 0;
   totalRecordsHealthMstoolbox: number = 0;
   currentPageReportTemplateHealthMstoolbox: string = '';
   public dateHealthMstoolbox: Date |null = null;
  constructor(
    private healthFlamingoService: HealthcheckFlamingoService,
    private healthBWService: HealthCheckBwPerimetreService,
    private healthService: HealthCheckService,
    private nuitService: NuitApplicativeService,
    private mstoolboxService: MonitoringMstoolboxService,
    private optirentaService: MonitoringOptirentaService,
    private charteService: CharteService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private userService: AuthService
  ) { }
  clearBI() {
    this.searchActiveHealthBI=false;
    this.filterHealthBI = new HealthCheckBwPerimetre();
    this.dateHealthBI =null;
    this.loadHealthBILazy({ first: 0, rows: this.pageSizeHealthBI });
  }
  clearMonetics() {
    this.searchActiveHealthMonetics=false;
    this.filterHealthMonetics = new HealthChekPreprodProd();
    this.dateHealthMonetics =null;
    this.loadHealthMoneticsLazy({ first: 0, rows: this.pageSizeHealthMonetics });
  }
  clearSuplyFlamingo() {
    this.searchActiveHealthSuplyFlamingo=false;
    this.filterHealthSuplyFlamingo = new HealthCheckFlamingo();
    this.dateHealthSuplyFlamingo =null;
    this.loadHealthSuplyFlamingoLazy({ first: 0, rows: this.pageSizeHealthSuplyFlamingo });
  }
  clearNuit() {
    this.searchActiveNuitApplicative=false;
    this.filterNuitApplicative = new NuitApplicative();
    this.dateNuitApplicative =null;
    this.loadNuitApplicatibe({ first: 0, rows: this.pageSizeNuitApplicative });
  }
  clearOptirenta() {
    this.searchActiveHealthOptirenta=false;
    this.filterHealthOptirenta = new MonitoringOptirenta();
    this.dateHealthOptirenta =null;
    this.loadOptirenta({ first: 0, rows: this.pageSizeHealthOptirenta });
  }
  clearMstoolbox() {
    this.searchActiveHealthMstoolbox=false;
    this.filterHealthMstoolbox = new MonitoringMstoolbox();
    this.dateHealthMstoolbox =null;
    this.loadMstoolbox({ first: 0, rows: this.pageSizeHealthMstoolbox });
  }
  get User(): User {
    return this.userService.User;
  }

  set User(value: User) {
    this.userService.User = value;
  }
  ngOnInit(): void {
    this.AddHealthCheck = new HealthChekPreprodProd();
    this.loadHealthMoneticsLazy({ first: 0, rows: this.pageSizeHealthMonetics });
    this.AddHealthCheckBw = new HealthCheckBwPerimetre();
    this.loadHealthBILazy({ first: 0, rows: this.pageSizeHealthBI });
    this.AddHealthCheckFlamingo = new HealthCheckFlamingo();
    this.loadHealthSuplyFlamingoLazy({ first: 0, rows: this.pageSizeHealthSuplyFlamingo });
    this.AddNuitApplicative = new NuitApplicative();
    this.loadNuitApplicatibe({ first: 0, rows: this.pageSizeNuitApplicative });
    this.AddMonitoringOptirenta = new MonitoringOptirenta();
    this.loadOptirenta({ first: 0, rows: this.pageSizeHealthOptirenta });
    this.AddMonitoringMstoolbox = new MonitoringMstoolbox();
    this.loadMstoolbox({ first: 0, rows: this.pageSizeHealthMstoolbox });

    this.ListType = [{ name: 'PREPRODUCTION' }, { name: 'PRODUCTION' }];
  }
  PopAjout() {
    this.AddHealthCheck = new HealthChekPreprodProd();
    this.popUpAjout = true;
  }

  RouterAjout() {
    if (this.AddHealthCheck.type != '') {
      this.router.navigate(['/pilote/healthcheck/Monetics/save']);
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Selectionner le Type',
      });
    }
  }

  onDialogHideLang() {
    this.AddHealthCheck = new HealthChekPreprodProd();
  }

  Edite(helth: HealthChekPreprodProd) {
    this.AddHealthCheck = cloneDeep(helth);
    this.healthService.FindDetailByHealthCheck(helth.id).subscribe((data) => {
      // @ts-ignore
      this.AddHealthCheck.healthChekPreprodProdDetailList = data.body;
    });
    this.healthService
      .FindEtatProcessusByHealthCheck(helth.id)
      .subscribe((data) => {
        // @ts-ignore
        this.AddHealthCheck.etatProcessusMetierList = data.body;
      });
    this.healthService
      .FindStatutAppByHealthCheck(helth.id)
      .subscribe((data) => {
        // @ts-ignore
        this.AddHealthCheck.statutApplicationList = data.body;
      });
    this.popUpAjout = true;
  }
  get AddHealthCheck(): HealthChekPreprodProd {
    return this.healthService.AddHealthCheck;
  }

  set AddHealthCheck(value: HealthChekPreprodProd) {
    this.healthService.AddHealthCheck = value;
  }

  get ListEtatProcess(): Array<EtatProcessusMetier> {
    return this.healthService.ListEtatProcess;
  }

  set ListEtatProcess(value: Array<EtatProcessusMetier>) {
    this.healthService.ListEtatProcess = value;
  }

  get ListHealthDetail(): Array<HealthChekPreprodProdDetail> {
    return this.healthService.ListHealthDetail;
  }

  set ListHealthDetail(value: Array<HealthChekPreprodProdDetail>) {
    this.healthService.ListHealthDetail = value;
  }

  get ListHealthCheck(): Array<HealthChekPreprodProd> {
    return this.healthService.ListHealthCheck;
  }

  set ListHealthCheck(value: Array<HealthChekPreprodProd>) {
    this.healthService.ListHealthCheck = value;
  }
  get charteHealthCheckPreprodProd(): boolean {
    return this.charteService.charteHealthCheckPreprodProd;
  }

  set charteHealthCheckPreprodProd(value: boolean) {
    this.charteService.charteHealthCheckPreprodProd = value;
  }
  charte(helth: HealthChekPreprodProd) {
    this.AddHealthCheck = helth;
    this.healthService.FindDetailByHealthCheck(helth.id).subscribe((data) => {
      // @ts-ignore
      this.AddHealthCheck.healthChekPreprodProdDetailList = data.body;
    });
    this.healthService
      .FindEtatProcessusByHealthCheck(helth.id)
      .subscribe((data) => {
        // @ts-ignore
        this.AddHealthCheck.etatProcessusMetierList = data.body;
      });
    this.healthService
      .FindStatutAppByHealthCheck(helth.id)
      .subscribe((data) => {
        // @ts-ignore
        this.AddHealthCheck.statutApplicationList = data.body;
      });
    this.charteHealthCheckPreprodProd = true;
  }
  DeleteHealthCheck(id: number) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr(e) de vouloir continuer?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.healthService.DeleteHealthCheck(id).subscribe(
          (data) => {
            this.loadHealthMoneticsLazy({ first: 0, rows: this.pageSizeHealthMonetics });
            // @ts-ignore
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Etat de Santé supprimer avec succès',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Erreur lors de la suppression',
            });
          }
        );
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'Suppression Rejeter',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'Suppression Annuler',
            });
            break;
        }
      },
    });
  }
  loadHealthMoneticsLazy(event: LazyLoadEvent): void {
    this.loading = true;
    this.healthService.FindHealthCheckByPilote(this.pageHealthMonetics, this.pageSizeHealthMonetics).subscribe((data) => {      
      //@ts-ignore
      this.ListHealthCheck = data.body.content;
      //@ts-ignore
      this.totalRecordsHealthMonetics = data.body.totalElements;
      this.currentPageReportTemplateHealthMonetics = `Showing ${this.firstHealthMonetics + 1} to ${this.firstHealthMonetics + this.pageSizeHealthMonetics} of ${this.totalRecordsHealthMonetics} entries`;
      this.loading = false;
    });
  }
  lazyLoadHandlerHealthMonetics(event: LazyLoadEvent): void {
    if (event.first !== this.firstHealthMonetics || event.rows !== this.pageSizeHealthMonetics) {
        this.firstHealthMonetics = event.first ?? 0;
        this.pageSizeHealthMonetics = event.rows ?? 10;
        this.pageHealthMonetics = Math.floor(this.firstHealthMonetics / this.pageSizeHealthMonetics);
    if( this.searchActiveHealthMonetics==true){
          this.searchHealthMonetics();

    }else{
      this.loadHealthMoneticsLazy(event);
    }
  }

  }

  searchHealthMonetics(){
    this.loading = true;
    if(!this.dateHealthMonetics && !this.filterHealthMonetics.titre && !this.filterHealthMonetics.type){      
      this.clearMonetics();
    }else{
    this.healthService.SearchHealth(this.dateHealthMonetics,this.filterHealthMonetics,this.pageHealthMonetics, this.pageSizeHealthMonetics).subscribe((data)=>{
      this.searchActiveHealthMonetics=true;
      //@ts-ignore
      this.ListHealthCheck = data.body.content;
      //@ts-ignore
      this.totalRecordsHealthMonetics = data.body.totalElements;
      this.currentPageReportTemplateHealthMonetics = `Showing ${this.firstHealthMonetics + 1} to ${this.firstHealthMonetics + this.pageSizeHealthMonetics} of ${this.totalRecordsHealthMonetics} entries`;
      this.loading = false;
  
    })}
  }
  ////////////////Nuit//////////// 
  RouterAjoutNuit() {
    if (this.AddNuitApplicative.statut != '') {
      this.router.navigate(['/pilote/nuitApplicative/save']);
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Selectionner le Type',
      });
    }
  }

  onDialogHideNuit() {
    this.AddNuitApplicative = new NuitApplicative();
  }
   PopAjoutNuit() {
    this.AddNuitApplicative = new NuitApplicative();
    this.popUpAjoutNuit = true;
  }
  get charteNuitApplicative(): boolean {
    return this.charteService.charteNuitApplicative;
  }

  set charteNuitApplicative(value: boolean) {
    this.charteService.charteNuitApplicative = value;
  }
  get AddNuitApplicative(): NuitApplicative {
    return this.nuitService.AddNuitApplicative;
  }

  set AddNuitApplicative(value: NuitApplicative) {
    this.nuitService.AddNuitApplicative = value;
  }
  get ListNuitApplicative(): Array<NuitApplicative> {
    return this.nuitService.ListNuitApplicative;
  }

  set ListNuitApplicative(value: Array<NuitApplicative>) {
    this.nuitService.ListNuitApplicative = value;
  }
  EditeNuit(nuit: NuitApplicative) {
    this.AddNuitApplicative = cloneDeep(nuit);
    this.nuitService.FindNbOccurenceByNuitApp(nuit.id).subscribe((data) => {
      // @ts-ignore
      this.AddNuitApplicative.nbOccurenceList = data.body;
    });
    this.nuitService
      .FindSuiviVolumetrieByNuitApp(nuit.id)
      .subscribe((data) => {
        // @ts-ignore
        this.AddNuitApplicative.suiviVolumetrieList = data.body;
      });

    this.popUpAjoutNuit = true;
  }
  charteNuit(nuit: NuitApplicative) {
    this.AddNuitApplicative = cloneDeep(nuit);
    this.nuitService.FindNbOccurenceByNuitApp(nuit.id).subscribe((data) => {
      // @ts-ignore
      this.AddNuitApplicative.nbOccurenceList = data.body;
    });
    this.nuitService
      .FindSuiviVolumetrieByNuitApp(nuit.id)
      .subscribe((data) => {
        // @ts-ignore
        this.AddNuitApplicative.suiviVolumetrieList = data.body;
      });

    this.charteNuitApplicative = true;
  }
  DeleteNuit(id: number) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr(e) de vouloir continuer?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.nuitService.DeleteNuitApplicative(id).subscribe(
          (data) => {
            this.loadNuitApplicatibe({ first: 0, rows: this.pageSizeHealthMonetics });
            // @ts-ignore
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Nuit Applicarive supprimer avec succès',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Erreur lors de la suppression',
            });
          }
        );
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'Suppression Rejeter',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'Suppression Annuler',
            });
            break;
        }
      },
    });
  }
  loadNuitApplicatibe(event: LazyLoadEvent): void {
    this.loadingNuit = true;
    this.nuitService.FindNuitApplicativeByPilote(this.pageNuitApplicative, this.pageSizeNuitApplicative).subscribe((data) => {      
      //@ts-ignore
      this.ListNuitApplicative = data.body.content;
      //@ts-ignore
      this.totalRecordsNuitApplicative= data.body.totalElements;      
      this.currentPageReportTemplateNuitApplicative = `Showing ${this.firstNuitApplicative + 1} to ${this.firstNuitApplicative + this.pageSizeNuitApplicative} of ${this.totalRecordsNuitApplicative} entries`;
      this.loadingNuit = false;
    });
  }
  lazyLoadHandlerNuitApplicative(event: LazyLoadEvent): void {
    if (event.first !== this.firstNuitApplicative || event.rows !== this.pageSizeNuitApplicative) {
        this.firstNuitApplicative = event.first ?? 0;
        this.pageSizeNuitApplicative = event.rows ?? 10;
        this.pageNuitApplicative = Math.floor(this.firstNuitApplicative / this.pageSizeNuitApplicative);
    if( this.searchActiveNuitApplicative==true){
          this.searchNuitApplicative();

    }else{
      this.loadNuitApplicatibe(event);
    }
  }

  }

  searchNuitApplicative(){
    this.loadingNuit = true;
    if(!this.dateNuitApplicative && !this.filterNuitApplicative.titre && !this.filterNuitApplicative.statut){      
      this.clearNuit();
    }else{
    this.nuitService.SearchNuit(this.dateNuitApplicative,this.filterNuitApplicative,this.pageNuitApplicative, this.pageSizeNuitApplicative).subscribe((data)=>{
      this.searchActiveNuitApplicative=true;
      //@ts-ignore
      this.ListNuitApplicative = data.body.content;
      //@ts-ignore
      this.totalRecordsNuitApplicative = data.body.totalElements;
      this.currentPageReportTemplateNuitApplicative = `Showing ${this.firstNuitApplicative + 1} to ${this.firstNuitApplicative + this.pageSizeNuitApplicative} of ${this.totalRecordsNuitApplicative} entries`;
      this.loadingNuit = false;
  
    })}
  }
////////////////////BI///////////
  RouterAjoutBW() {
    this.AddHealthCheckBw.dateAjout = new Date();
    this.AddHealthCheckBw.titre =
      'Health Check  BW perimeter - ' +
      moment(this.AddHealthCheckBw.dateAjout).format('DD/MM/YYYY');
    this.router.navigate(['/pilote/healthcheck/BI/save']);
  }
  loadHealthBILazy(event: LazyLoadEvent): void {
    this.loadingBW = true;
    this.healthBWService.FindHealthCheckBwByPilote(this.pageHealthBI, this.pageSizeHealthBI).subscribe((data) => {      
      //@ts-ignore
      this.ListHealthCheckBw = data.body.content;
      //@ts-ignore
      this.totalRecordsHealthBI = data.body.totalElements;
      this.currentPageReportTemplateHealthBI = `Showing ${this.firstHealthBI + 1} to ${this.firstHealthBI + this.pageSizeHealthBI} of ${this.totalRecordsHealthBI} entries`;
      this.loadingBW = false;
    });
  }
  lazyLoadHandlerHealthBI(event: LazyLoadEvent): void {
    if (event.first !== this.firstHealthBI || event.rows !== this.pageSizeHealthBI) {
        this.firstHealthBI = event.first ?? 0;
        this.pageSizeHealthBI = event.rows ?? 10;
        this.pageHealthBI = Math.floor(this.firstHealthBI / this.pageSizeHealthBI);
    if( this.searchActiveHealthBI==true){
          this.searchHealthBI();

    }else{
      this.loadHealthBILazy(event);
    }
  }

  }

  searchHealthBI(){
    this.loadingBW = true;
    if(!this.dateHealthBI && !this.filterHealthBI.titre){      
      this.clearBI();
    }else{
    this.healthBWService.SearchHealth(this.dateHealthBI,this.filterHealthBI,this.pageHealthBI, this.pageSizeHealthBI).subscribe((data)=>{
      this.searchActiveHealthBI=true;
      //@ts-ignore
      this.ListHealthCheckBw = data.body.content;
      //@ts-ignore
      this.totalRecordsHealthBI = data.body.totalElements;
      this.currentPageReportTemplateHealthBI = `Showing ${this.firstHealthBI + 1} to ${this.firstHealthBI + this.pageSizeHealthBI} of ${this.totalRecordsHealthBI} entries`;
      this.loadingBW = false;
  
    })}
  }
  EditeBW(helth: HealthCheckBwPerimetre) {
    this.AddHealthCheckBw = cloneDeep(helth);
    this.healthBWService
      .FindDetailByHealthCheckBw(helth.id)
      .subscribe((data) => {
        // @ts-ignore
        this.AddHealthCheckBw.healthCheckBwPerimetreDetailList = data.body;
        this.AddHealthCheckBw.dateAjout = new Date();
        this.AddHealthCheckBw.titre =
          'Health Check  BW perimeter - ' +
          moment(this.AddHealthCheckBw.dateAjout).format('DD/MM/YYYY');
        this.router.navigate(['/pilote/healthcheck/BI/save']);
      });
  }
  get AddHealthCheckBw(): HealthCheckBwPerimetre {
    return this.healthBWService.AddHealthCheckBw;
  }

  set AddHealthCheckBw(value: HealthCheckBwPerimetre) {
    this.healthBWService.AddHealthCheckBw = value;
  }

  get ListHealthBwDetail(): Array<HealthCheckBwPerimetreDetail> {
    return this.healthBWService.ListHealthBwDetail;
  }

  set ListHealthBwDetail(value: Array<HealthCheckBwPerimetreDetail>) {
    this.healthBWService.ListHealthBwDetail = value;
  }

  get ListHealthCheckBw(): Array<HealthCheckBwPerimetre> {
    return this.healthBWService.ListHealthCheckBw;
  }

  set ListHealthCheckBw(value: Array<HealthCheckBwPerimetre>) {
    this.healthBWService.ListHealthCheckBw = value;
  }
  get newcharteHealthCheckBw(): boolean {
    return this.charteService.newcharteHealthCheckBw;
  }

  set newcharteHealthCheckBw(value: boolean) {
    this.charteService.newcharteHealthCheckBw = value;
  }
  charteBW(helth: HealthCheckBwPerimetre) {
    this.AddHealthCheckBw = helth;
    this.healthBWService
      .FindDetailByHealthCheckBw(helth.id)
      .subscribe((data) => {
        // @ts-ignore
        this.AddHealthCheckBw.healthCheckBwPerimetreDetailList = data.body;
      });

    this.newcharteHealthCheckBw = true;
  }
  DeleteHealthCheckBW(id: number) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr(e) de vouloir continuer?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.healthBWService.DeleteHealthCheckBw(id).subscribe(
          (data) => {
            this.loadHealthBILazy({ first: 0, rows: this.pageSizeHealthBI });
            // @ts-ignore
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Etat de Santé Bw Perimetre supprimer avec succès',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Erreur lors de la suppression',
            });
          }
        );
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'Suppression Rejeter',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'Suppression Annuler',
            });
            break;
        }
      },
    });
  }

  ////Flamingo
  get ListHealthCheckFlamingo(): Array<HealthCheckFlamingo> {
    return this.healthFlamingoService.ListHealthCheck;
  }

  set ListHealthCheckFlamingo(value: Array<HealthCheckFlamingo>) {
    this.healthFlamingoService.ListHealthCheck = value;
  }
  get AddHealthCheckFlamingo(): HealthCheckFlamingo {
    return this.healthFlamingoService.AddHealthCheck;
  }

  set AddHealthCheckFlamingo(value: HealthCheckFlamingo) {
    this.healthFlamingoService.AddHealthCheck = value;
  }
 
  loadHealthSuplyFlamingoLazy(event: LazyLoadEvent): void {
    this.loadingFlamingo = true;
    this.healthFlamingoService.FindHealthCheckByPilote(this.pageHealthSuplyFlamingo, this.pageSizeHealthSuplyFlamingo).subscribe((data) => {      
      //@ts-ignore
      this.ListHealthCheckFlamingo = data.body.content;
      //@ts-ignore
      this.totalRecordsHealthSuplyFlamingo = data.body.totalElements;
      this.currentPageReportTemplateHealthSuplyFlamingo = `Showing ${this.firstHealthSuplyFlamingo + 1} to ${this.firstHealthSuplyFlamingo + this.pageSizeHealthSuplyFlamingo} of ${this.totalRecordsHealthSuplyFlamingo} entries`;
      this.loadingFlamingo = false;
    });
  }
  lazyLoadHandlerHealthSuplyFlamingo(event: LazyLoadEvent): void {
    if (event.first !== this.firstHealthSuplyFlamingo || event.rows !== this.pageSizeHealthSuplyFlamingo) {
        this.firstHealthSuplyFlamingo = event.first ?? 0;
        this.pageSizeHealthSuplyFlamingo = event.rows ?? 10;
        this.pageHealthSuplyFlamingo = Math.floor(this.firstHealthSuplyFlamingo / this.pageSizeHealthSuplyFlamingo);
    if( this.searchActiveHealthSuplyFlamingo==true){
          this.searchHealthSuplyFlamingo();

    }else{
      this.loadHealthSuplyFlamingoLazy(event);
    }
  }

  }

  searchHealthSuplyFlamingo(){
    this.loadingFlamingo = true;
    if(!this.dateHealthSuplyFlamingo && !this.filterHealthSuplyFlamingo.titre){      
      this.clearSuplyFlamingo();
    }else{
    this.healthFlamingoService.SearchHealth(this.dateHealthSuplyFlamingo,this.filterHealthSuplyFlamingo,this.pageHealthSuplyFlamingo, this.pageSizeHealthSuplyFlamingo).subscribe((data)=>{
      this.searchActiveHealthSuplyFlamingo=true;
      //@ts-ignore
      this.ListHealthCheckFlamingo = data.body.content;
      //@ts-ignore
      this.totalRecordsHealthSuplyFlamingo = data.body.totalElements;
      this.currentPageReportTemplateHealthSuplyFlamingo = `Showing ${this.firstHealthSuplyFlamingo + 1} to ${this.firstHealthSuplyFlamingo + this.pageSizeHealthSuplyFlamingo} of ${this.totalRecordsHealthSuplyFlamingo} entries`;
      this.loadingFlamingo = false;
  
    })}
  }
  charteFlamingo(helth: HealthCheckFlamingo) {
    this.AddHealthCheckFlamingo = helth;
    this.healthFlamingoService
      .FindFluxEAIByHealthCheck(helth.id)
      .subscribe((data) => {
        // @ts-ignore
        this.AddHealthCheckFlamingo.fluxEAIList = data.body;
        this.healthFlamingoService
          .FindFluxSalesOrderEAIByHealthCheck(helth.id)
          .subscribe((data) => {
            // @ts-ignore
            this.AddHealthCheckFlamingo.fluxSalesOrderList = data.body;
            this.healthFlamingoService
              .FindFluxSapEuropeByHealthCheck(helth.id)
              .subscribe((data) => {
                // @ts-ignore
                this.AddHealthCheckFlamingo.fluxSapEuropeList = data.body;
                this.healthFlamingoService
                  .FindFluxSapHarmonieByHealthCheck(helth.id)
                  .subscribe((data) => {
                    // @ts-ignore
                    this.AddHealthCheckFlamingo.fluxSapHarmonies = data.body;
                  });
              });
          });
      });

    this.charteHealthCheckFlamingo = true;
  } 
   get charteHealthCheckFlamingo(): boolean {
    return this.charteService.charteHealthCheckFlamingo;
  }

  set charteHealthCheckFlamingo(value: boolean) {
    this.charteService.charteHealthCheckFlamingo = value;
  }
  EditeFlamingo(helth: HealthCheckFlamingo) {
    this.AddHealthCheckFlamingo = cloneDeep(helth);
    this.healthFlamingoService
      .FindFluxEAIByHealthCheck(helth.id)
      .subscribe((data) => {
        // @ts-ignore
        this.AddHealthCheckFlamingo.fluxEAIList = data.body;
        this.healthFlamingoService
          .FindFluxSalesOrderEAIByHealthCheck(helth.id)
          .subscribe((data) => {
            // @ts-ignore
            this.AddHealthCheckFlamingo.fluxSalesOrderList = data.body;
            this.healthFlamingoService
              .FindFluxSapEuropeByHealthCheck(helth.id)
              .subscribe((data) => {
                // @ts-ignore
                this.AddHealthCheckFlamingo.fluxSapEuropeList = data.body;
                this.healthFlamingoService
                  .FindFluxSapHarmonieByHealthCheck(helth.id)
                  .subscribe((data) => {
                    // @ts-ignore
                    this.AddHealthCheckFlamingo.fluxSapHarmonies = data.body;
                    this.router.navigate(['/pilote/healthcheck/Flamingo/save']);
                  });
              });
          });
      });
  }

  DeleteHealthCheckFlamingo(id: number) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr(e) de vouloir continuer?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.healthFlamingoService.DeleteHealthCheck(id).subscribe(
          (data) => {
            this.loadHealthSuplyFlamingoLazy({ first: 0, rows: this.pageSizeHealthSuplyFlamingo });
            // @ts-ignore
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'supprimer avec succès',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Erreur lors de la suppression',
            });
          }
        );
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'Suppression Rejeter',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'Suppression Annuler',
            });
            break;
        }
      },
    });
  }
  RouterAjoutFlamingo() {
    this.router.navigate(['/pilote/healthcheck/Flamingo/save']);
  }
    ////////////////Optirenta//////////// 
    RouterAjoutOptirenta() {
        this.router.navigate(['/pilote/monitoring/optirenta/save']);
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
    get ListMonitoringOptirenta(): Array<MonitoringOptirenta> {
      return this.optirentaService.ListMonitoringOptirenta;
    }
  
    set ListMonitoringOptirenta(value: Array<MonitoringOptirenta>) {
      this.optirentaService.ListMonitoringOptirenta = value;
    }
    EditeOptirenta(moni: MonitoringOptirenta) {
      this.AddMonitoringOptirenta = cloneDeep(moni);
      this.optirentaService.FindFluxOptirentaBymonitoring(moni.id).subscribe((data) => {
        // @ts-ignore
        this.AddMonitoringOptirenta.fluxOptirentaList = data.body;
        this.router.navigate(['/pilote/monitoring/optirenta/save']);
      });
  
    }
    charteOptirenta(moni: MonitoringOptirenta) {
      this.AddMonitoringOptirenta = cloneDeep(moni);
      this.optirentaService.FindFluxOptirentaBymonitoring(moni.id).subscribe((data) => {
        // @ts-ignore
        this.AddMonitoringOptirenta.fluxOptirentaList = data.body;
        this.charteMonitoringOptirenta = true;
      });
   
    }
    DeleteOptirenta(id: number) {
      this.confirmationService.confirm({
        message: 'Êtes-vous sûr(e) de vouloir continuer?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.optirentaService.DeleteMonitoringOptirenta(id).subscribe(
            (data) => {
              this.loadOptirenta({ first: 0, rows: this.pageSizeHealthOptirenta });
              // @ts-ignore
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Monitoring supprimer avec succès',
              });
            },
            (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Erreur lors de la suppression',
              });
            }
          );
        },
        reject: (type: any) => {
          switch (type) {
            case ConfirmEventType.REJECT:
              this.messageService.add({
                severity: 'error',
                summary: 'Rejected',
                detail: 'Suppression Rejeter',
              });
              break;
            case ConfirmEventType.CANCEL:
              this.messageService.add({
                severity: 'warn',
                summary: 'Cancelled',
                detail: 'Suppression Annuler',
              });
              break;
          }
        },
      });
    }
    loadOptirenta(event: LazyLoadEvent): void {
      this.loadingHealthOptirenta = true;
      this.optirentaService.FindMonitoringOptirentaByPilote(this.pageHealthOptirenta, this.pageSizeHealthOptirenta).subscribe((data) => {      
        //@ts-ignore
        this.ListMonitoringOptirenta = data.body.content;
        //@ts-ignore
        this.totalRecordsHealthOptirenta= data.body.totalElements;      
        this.currentPageReportTemplateHealthOptirenta = `Showing ${this.firstHealthOptirenta + 1} to ${this.firstHealthOptirenta + this.pageSizeHealthOptirenta} of ${this.totalRecordsHealthOptirenta} entries`;
        this.loadingHealthOptirenta = false;
      });
    }
    lazyLoadHandlerOptirenta(event: LazyLoadEvent): void {
      if (event.first !== this.firstHealthOptirenta || event.rows !== this.pageSizeHealthOptirenta) {
          this.firstHealthOptirenta = event.first ?? 0;
          this.pageSizeHealthOptirenta = event.rows ?? 10;
          this.pageHealthOptirenta = Math.floor(this.firstHealthOptirenta / this.pageSizeHealthOptirenta);
      if( this.searchActiveHealthOptirenta==true){
            this.searchHealthOptirenta();
  
      }else{
        this.loadOptirenta(event);
      }
    }
  
    }
  
    searchHealthOptirenta(){
      this.loadingHealthOptirenta = true;
      if(!this.dateHealthOptirenta && !this.filterHealthOptirenta.titre ){      
        this.clearOptirenta();
      }else{
      this.optirentaService.SearchMonitoring(this.dateHealthOptirenta,this.filterHealthOptirenta,this.pageHealthOptirenta, this.pageSizeHealthOptirenta).subscribe((data)=>{
        this.searchActiveHealthOptirenta=true;
        //@ts-ignore
        this.ListHealthOptirenta = data.body.content;
        //@ts-ignore
        this.totalRecordsHealthOptirenta = data.body.totalElements;
        this.currentPageReportTemplateHealthOptirenta = `Showing ${this.firstHealthOptirenta + 1} to ${this.firstHealthOptirenta + this.pageSizeHealthOptirenta} of ${this.totalRecordsHealthOptirenta} entries`;
        this.loadingHealthOptirenta = false;
    
      })}
    }
        ////////////////Mstoolbox//////////// 
        RouterAjoutMstoolbox() {
          this.router.navigate(['/pilote/monitoring/mstoolbox/save']);
      }
    
  
      get charteMonitoringMstoolbox(): boolean {
        return this.charteService.charteMonitoringMstoolbox;
      }
    
      set charteMonitoringMstoolbox(value: boolean) {
        this.charteService.charteMonitoringMstoolbox = value;
      }
      get AddMonitoringMstoolbox(): MonitoringMstoolbox {
        return this.mstoolboxService.AddMonitoringMstoolbox;
      }
    
      set AddMonitoringMstoolbox(value: MonitoringMstoolbox) {
        this.mstoolboxService.AddMonitoringMstoolbox = value;
      }
      get ListMonitoringMstoolbox(): Array<MonitoringMstoolbox> {
        return this.mstoolboxService.ListMonitoringMstoolbox;
      }
    
      set ListMonitoringMstoolbox(value: Array<MonitoringMstoolbox>) {
        this.mstoolboxService.ListMonitoringMstoolbox = value;
      }
      EditeMstoolbox(moni: MonitoringMstoolbox) {        
        this.AddMonitoringMstoolbox = cloneDeep(moni);
        this.mstoolboxService.FindImplantsBymonitoring(moni.id).subscribe((data) => {
          // @ts-ignore
          this.AddMonitoringMstoolbox.implantsList = data.body;
          this.mstoolboxService.FindTransactionHandbidBymonitoring(moni.id).subscribe((data) => {
            // @ts-ignore
            this.AddMonitoringMstoolbox.transactionHandbidList = data.body;
            this.mstoolboxService.FindTransactionSmileBymonitoring(moni.id).subscribe((data) => {
              // @ts-ignore
              this.AddMonitoringMstoolbox.transactionSmileList = data.body;
              this.router.navigate(['/pilote/monitoring/mstoolbox/save']);
            });
          });
        });
    
      }
      charteMstoolbox(moni: MonitoringMstoolbox) {
        this.AddMonitoringMstoolbox = cloneDeep(moni);
        this.mstoolboxService.FindImplantsBymonitoring(moni.id).subscribe((data) => {
          // @ts-ignore
          this.AddMonitoringMstoolbox.implantsList = data.body;
          this.mstoolboxService.FindTransactionHandbidBymonitoring(moni.id).subscribe((data) => {
            // @ts-ignore
            this.AddMonitoringMstoolbox.transactionHandbidList = data.body;
            this.mstoolboxService.FindTransactionSmileBymonitoring(moni.id).subscribe((data) => {
              // @ts-ignore
              this.AddMonitoringMstoolbox.transactionSmileList = data.body;
              this.charteMonitoringMstoolbox = true;
            });
          });
        });
      }
      DeleteMstoolbox(id: number) {
        this.confirmationService.confirm({
          message: 'Êtes-vous sûr(e) de vouloir continuer?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.mstoolboxService.DeleteMonitoringMstoolbox(id).subscribe(
              (data) => {
                this.loadMstoolbox({ first: 0, rows: this.pageSizeHealthMstoolbox });
                // @ts-ignore
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Monitoring supprimer avec succès',
                });
              },
              (error) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Erreur lors de la suppression',
                });
              }
            );
          },
          reject: (type: any) => {
            switch (type) {
              case ConfirmEventType.REJECT:
                this.messageService.add({
                  severity: 'error',
                  summary: 'Rejected',
                  detail: 'Suppression Rejeter',
                });
                break;
              case ConfirmEventType.CANCEL:
                this.messageService.add({
                  severity: 'warn',
                  summary: 'Cancelled',
                  detail: 'Suppression Annuler',
                });
                break;
            }
          },
        });
      }
      loadMstoolbox(event: LazyLoadEvent): void {
        this.loadingHealthMstoolbox = true;
        this.mstoolboxService.FindMonitoringMstoolboxByPilote(this.pageHealthMstoolbox, this.pageSizeHealthMstoolbox).subscribe((data) => {      
          //@ts-ignore
          this.ListMonitoringMstoolbox = data.body.content;
          //@ts-ignore
          this.totalRecordsHealthMstoolbox= data.body.totalElements;      
          this.currentPageReportTemplateHealthMstoolbox = `Showing ${this.firstHealthMstoolbox + 1} to ${this.firstHealthMstoolbox + this.pageSizeHealthMstoolbox} of ${this.totalRecordsHealthMstoolbox} entries`;
          this.loadingHealthMstoolbox = false;
        });
      }
      lazyLoadHandlerMstoolbox(event: LazyLoadEvent): void {
        if (event.first !== this.firstHealthMstoolbox || event.rows !== this.pageSizeHealthMstoolbox) {
            this.firstHealthMstoolbox = event.first ?? 0;
            this.pageSizeHealthMstoolbox = event.rows ?? 10;
            this.pageHealthMstoolbox = Math.floor(this.firstHealthMstoolbox / this.pageSizeHealthMstoolbox);
        if( this.searchActiveHealthMstoolbox==true){
              this.searchHealthMstoolbox();
    
        }else{
          this.loadMstoolbox(event);
        }
      }
    
      }
    
      searchHealthMstoolbox(){
        this.loadingHealthMstoolbox = true;
        if(!this.dateHealthMstoolbox && !this.filterHealthMstoolbox.titre ){      
          this.clearMstoolbox();
        }else{
        this.mstoolboxService.SearchMonitoring(this.dateHealthMstoolbox,this.filterHealthMstoolbox,this.pageHealthMstoolbox, this.pageSizeHealthMstoolbox).subscribe((data)=>{
          this.searchActiveHealthMstoolbox=true;
          //@ts-ignore
          this.ListHealthMstoolbox = data.body.content;
          //@ts-ignore
          this.totalRecordsHealthMstoolbox = data.body.totalElements;
          this.currentPageReportTemplateHealthMstoolbox = `Showing ${this.firstHealthMstoolbox + 1} to ${this.firstHealthMstoolbox + this.pageSizeHealthMstoolbox} of ${this.totalRecordsHealthMstoolbox} entries`;
          this.loadingHealthMstoolbox = false;
      
        })}
      }
}
