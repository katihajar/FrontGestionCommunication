import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { Table } from 'primeng/table';
import { Application } from 'src/app/controller/model/application';
import { EtatProcessusMetier } from 'src/app/controller/model/etat-processus-metier';
import { HealthCheckBwPerimetre } from 'src/app/controller/model/health-check-bw-perimetre';
import { HealthCheckBwPerimetreDetail } from 'src/app/controller/model/health-check-bw-perimetre-detail';
import { HealthCheckFlamingo } from 'src/app/controller/model/health-check-flamingo';
import { HealthChekPreprodProd } from 'src/app/controller/model/health-chek-preprod-prod';
import { HealthChekPreprodProdDetail } from 'src/app/controller/model/health-chek-preprod-prod-detail';
import { User } from 'src/app/controller/model/user';
import { AuthService } from 'src/app/controller/service/auth.service';
import { CharteService } from 'src/app/controller/service/charte.service';
import { HealthCheckBwPerimetreService } from 'src/app/controller/service/health-check-bw-perimetre.service';
import { HealthCheckService } from 'src/app/controller/service/health-check.service';
import { HealthcheckFlamingoService } from 'src/app/controller/service/healthcheck-flamingo.service';
const moment = require('moment');

@Component({
  selector: 'app-registre-health-check',
  templateUrl: './registre-health-check.component.html',
  styleUrls: ['./registre-health-check.component.scss'],
})
export class RegistreHealthCheckComponent implements OnInit {
  loading: boolean = true;
  loadingBW: boolean = true;
  loadingFlamingo: boolean = true;
  ListType: any[] = [];
  popUpAjout: boolean = false;
  constructor(
    private healthFlamingoService: HealthcheckFlamingoService,
    private healthBWService: HealthCheckBwPerimetreService,
    private healthService: HealthCheckService,
    private charteService: CharteService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private userService: AuthService
  ) { }
  clear(table: Table) {
    table.clear();
  }
  get User(): User {
    return this.userService.User;
  }

  set User(value: User) {
    this.userService.User = value;
  }
  ngOnInit(): void {
    this.AddHealthCheck = new HealthChekPreprodProd();
    this.FindHealth();
    this.AddHealthCheckBw = new HealthCheckBwPerimetre();
    this.FindHealthBW();
    this.AddHealthCheckFlamingo = new HealthCheckFlamingo();
    this.FindHealthFlamingo();
    this.ListType = [{ name: 'PREPRODUCTION' }, { name: 'PRODUCTION' }];
  }
  PopAjout() {
    this.AddHealthCheck = new HealthChekPreprodProd();
    this.popUpAjout = true;
  }
  RouterAjout() {
    if (this.AddHealthCheck.type != '') {
      this.router.navigate(['/pilote/healthcheck/PreprodProd/save']);
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

  FindHealth() {
    this.healthService.FindHealthCheckByPilote().subscribe((data) => {
      // @ts-ignore
      this.ListHealthCheck = data.body;
      this.loading = false;
    });
  }
  Edite(helth: HealthChekPreprodProd) {
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
            this.FindHealth();
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

  RouterAjoutBW() {
    this.AddHealthCheckBw.dateAjout = new Date();
    this.AddHealthCheckBw.titre =
      'Health Check  BW perimeter - ' +
      moment(this.AddHealthCheckBw.dateAjout).format('DD/MM/YYYY');
    this.router.navigate(['/pilote/healthcheck/Bw/save']);
  }

  FindHealthBW() {
    this.healthBWService.FindHealthCheckBwByPilote().subscribe((data) => {
      // @ts-ignore
      this.ListHealthCheckBw = data.body;
      this.loadingBW = false;
    });
  }
  EditeBW(helth: HealthCheckBwPerimetre) {
    this.AddHealthCheckBw = helth;
    this.healthBWService
      .FindDetailByHealthCheckBw(helth.id)
      .subscribe((data) => {
        // @ts-ignore
        this.AddHealthCheckBw.healthCheckBwPerimetreDetailList = data.body;
        this.AddHealthCheckBw.dateAjout = new Date();
        this.AddHealthCheckBw.titre =
          'Health Check  BW perimeter - ' +
          moment(this.AddHealthCheckBw.dateAjout).format('DD/MM/YYYY');
        this.router.navigate(['/pilote/healthcheck/Bw/save']);
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
  get charteHealthCheckBw(): boolean {
    return this.charteService.charteHealthCheckBw;
  }

  set charteHealthCheckBw(value: boolean) {
    this.charteService.charteHealthCheckBw = value;
  }
  charteBW(helth: HealthCheckBwPerimetre) {
    this.AddHealthCheckBw = helth;
    this.healthBWService
      .FindDetailByHealthCheckBw(helth.id)
      .subscribe((data) => {
        // @ts-ignore
        this.AddHealthCheckBw.healthCheckBwPerimetreDetailList = data.body;
      });

    this.charteHealthCheckBw = true;
  }
  DeleteHealthCheckBW(id: number) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr(e) de vouloir continuer?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.healthBWService.DeleteHealthCheckBw(id).subscribe(
          (data) => {
            this.FindHealthBW();
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
  FindHealthFlamingo() {
    this.healthFlamingoService.FindHealthCheckByPilote().subscribe((data) => {
      // @ts-ignore
      this.ListHealthCheckFlamingo = data.body;
      console.log(data.body);

      this.loadingFlamingo = false;
    });
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
            this.FindHealthFlamingo();
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
}
