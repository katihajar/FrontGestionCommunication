import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { ConfirmEventType, ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Application } from 'src/app/controller/model/application';
import { HealthCheckBwPerimetre } from 'src/app/controller/model/health-check-bw-perimetre';
import { HealthCheckBwPerimetreDetail } from 'src/app/controller/model/health-check-bw-perimetre-detail';
import { HealthCheckFlamingo } from 'src/app/controller/model/health-check-flamingo';
import { HealthChekPreprodProd } from 'src/app/controller/model/health-chek-preprod-prod';
import { NuitApplicative } from 'src/app/controller/model/nuit-applicative';
import { CharteService } from 'src/app/controller/service/charte.service';
import { HealthCheckBwPerimetreRespoService } from 'src/app/controller/service/health-check-bw-perimetre-respo.service';
import { HealthCheckBwPerimetreService } from 'src/app/controller/service/health-check-bw-perimetre.service';
import { HealthCheckRespoService } from 'src/app/controller/service/health-check-respo.service';
import { HealthCheckService } from 'src/app/controller/service/health-check.service';
import { HealthcheckFlamingoRespoService } from 'src/app/controller/service/healthcheck-flamingo-respo.service';
import { HealthcheckFlamingoService } from 'src/app/controller/service/healthcheck-flamingo.service';
import { NuitApplicativeService } from 'src/app/controller/service/nuit-applicative.service';

@Component({
  selector: 'app-registr-health-check-prod-respo',
  templateUrl: './registr-health-check-prod-respo.component.html',
  styleUrls: ['./registr-health-check-prod-respo.component.scss']
})
export class RegistrHealthCheckProdRespoComponent implements OnInit {
  loadingNuit: boolean = true;
  ListHealthCheckBw: Array<HealthCheckBwPerimetreDetail>= new Array<HealthCheckBwPerimetreDetail>();
  ListHealthCheck : Array<HealthChekPreprodProd>=new Array<HealthChekPreprodProd>();
  ListHealthCheckFlamingo: Array<HealthCheckFlamingo>= new  Array<HealthCheckFlamingo>();
  loading: boolean = true;
  loadingBW: boolean = true;
  loadingFlamingo: boolean = true;
  ListType: any[] = [];
  popUpAjout:boolean = false;
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
  constructor(private healthBW: HealthCheckBwPerimetreService,private healthBWService: HealthCheckBwPerimetreRespoService,private healthService: HealthCheckRespoService,private health2 : HealthCheckService,private charteService:CharteService,private router: Router,
    private nuitService: NuitApplicativeService,
    private healthFlamingoPiloteService: HealthcheckFlamingoService,private healthFlamingoService: HealthcheckFlamingoRespoService,private confirmationService: ConfirmationService,private messageService:MessageService) { }
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
  ngOnInit(): void {
    this.AddHealthCheckBw = new HealthCheckBwPerimetre();
    this.loadHealthBILazy({ first: 0, rows: this.pageSizeHealthBI });
    this.AddHealthCheck = new HealthChekPreprodProd();
    this.loadHealthMoneticsLazy({ first: 0, rows: this.pageSizeHealthMonetics });
    this.AddHealthCheckFlamingo = new HealthCheckFlamingo();
    this.loadHealthSuplyFlamingoLazy({ first: 0, rows: this.pageSizeHealthSuplyFlamingo });
    this.AddNuitApplicative = new NuitApplicative();
    this.loadNuitApplicatibe({ first: 0, rows: this.pageSizeNuitApplicative });
    this.ListType = [{ name: 'PREPRODUCTION' }, { name: 'PRODUCTION' }];
  }


  get AddHealthCheck(): HealthChekPreprodProd{
    return this.health2.AddHealthCheck;
  }

  set AddHealthCheck(value: HealthChekPreprodProd) {
    this.health2.AddHealthCheck = value;
  }

  get charteHealthCheckPreprodProd(): boolean {
    return this.charteService.charteHealthCheckPreprodProd;
  }

  set charteHealthCheckPreprodProd(value: boolean) {
    this.charteService.charteHealthCheckPreprodProd = value;
  }


  charte(helth:HealthChekPreprodProd){
    this.AddHealthCheck=helth;
    this.healthService.FindDetailByHealthCheck(helth.id).subscribe((data)=>{
      // @ts-ignore
      this.AddHealthCheck.healthChekPreprodProdDetailList=data.body;
    }); 
    this.healthService.FindEtatProcessusByHealthCheck(helth.id).subscribe((data)=>{
      // @ts-ignore
      this.AddHealthCheck.etatProcessusMetierList=data.body;
    });
    this.healthService.FindStatutAppByHealthCheck(helth.id).subscribe((data)=>{
      // @ts-ignore
      this.AddHealthCheck.statutApplicationList=data.body;
    });
    this.charteHealthCheckPreprodProd = true;
  }
  loadHealthMoneticsLazy(event: LazyLoadEvent): void {
    this.loading = true;
    this.healthService.FindHealthCheckByRespo(this.pageHealthMonetics, this.pageSizeHealthMonetics).subscribe((data) => {      
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

  charteNuit(nuit: NuitApplicative) {
    this.AddNuitApplicative = cloneDeep(nuit);
    this.nuitService.FindNbOccurenceByNuitAppRespo(nuit.id).subscribe((data) => {
      // @ts-ignore
      this.AddNuitApplicative.nbOccurenceList = data.body;
    });
    this.nuitService
      .FindSuiviVolumetrieByNuitAppRespo(nuit.id)
      .subscribe((data) => {
        // @ts-ignore
        this.AddNuitApplicative.suiviVolumetrieList = data.body;
      });

    this.charteNuitApplicative = true;
  }

  loadNuitApplicatibe(event: LazyLoadEvent): void {
    this.loadingNuit = true;
    this.nuitService.FindNuitApplicativeByRespo(this.pageNuitApplicative, this.pageSizeNuitApplicative).subscribe((data) => {      
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
    this.nuitService.SearchNuitRespo(this.dateNuitApplicative,this.filterNuitApplicative,this.pageNuitApplicative, this.pageSizeNuitApplicative).subscribe((data)=>{
      this.searchActiveNuitApplicative=true;
      //@ts-ignore
      this.ListNuitApplicative = data.body.content;
      //@ts-ignore
      this.totalRecordsNuitApplicative = data.body.totalElements;
      this.currentPageReportTemplateNuitApplicative = `Showing ${this.firstNuitApplicative + 1} to ${this.firstNuitApplicative + this.pageSizeNuitApplicative} of ${this.totalRecordsNuitApplicative} entries`;
      this.loadingNuit = false;
  
    })}
  }
///////////////BI/////////////
  get AddHealthCheckBw(): HealthCheckBwPerimetre{
    return this.healthBW.AddHealthCheckBw;
  }

  set AddHealthCheckBw(value: HealthCheckBwPerimetre) {
    this.healthBW.AddHealthCheckBw = value;
  }


  get charteHealthCheckBw(): boolean {
    return this.charteService.charteHealthCheckBw;
  }

  set charteHealthCheckBw(value: boolean) {
    this.charteService.charteHealthCheckBw = value;
  }
  charteBW(helth:HealthCheckBwPerimetre){
    this.AddHealthCheckBw=helth;
    this.healthBWService.FindDetailByHealthCheckBw(helth.id).subscribe((data)=>{
            // @ts-ignore
      this.AddHealthCheckBw.healthCheckBwPerimetreDetailList=data.body;
    }); 

    this.charteHealthCheckBw = true;
  }
  loadHealthBILazy(event: LazyLoadEvent): void {
    this.loadingBW = true;
    this.healthBWService.FindHealthCheckBwByRespo(this.pageHealthBI, this.pageSizeHealthBI).subscribe((data) => {      
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
  /////Flamingo

  get AddHealthCheckFlamingo(): HealthCheckFlamingo {
    return this.healthFlamingoPiloteService.AddHealthCheck;
  }

  set AddHealthCheckFlamingo(value: HealthCheckFlamingo) {
    this.healthFlamingoPiloteService.AddHealthCheck = value;
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
  loadHealthSuplyFlamingoLazy(event: LazyLoadEvent): void {
    this.loadingFlamingo = true;
    this.healthFlamingoService.FindHealthCheckByRespo(this.pageHealthSuplyFlamingo, this.pageSizeHealthSuplyFlamingo).subscribe((data) => {      
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
   get charteHealthCheckFlamingo(): boolean {
    return this.charteService.charteHealthCheckFlamingo;
  }

  set charteHealthCheckFlamingo(value: boolean) {
    this.charteService.charteHealthCheckFlamingo = value;
  }
}
