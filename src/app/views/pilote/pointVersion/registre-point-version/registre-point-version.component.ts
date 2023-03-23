import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Table } from 'primeng/table';
import { PointVersion } from 'src/app/controller/model/point-version';
import { CharteService } from 'src/app/controller/service/charte.service';
import { PointVersionService } from 'src/app/controller/service/point-version.service';

@Component({
  selector: 'app-registre-point-version',
  templateUrl: './registre-point-version.component.html',
  styleUrls: ['./registre-point-version.component.scss']
})
export class RegistrePointVersionComponent implements OnInit {

  loading: boolean = true;
  constructor(private pointService: PointVersionService, private charteService: CharteService, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService) { }
  clear(table: Table) {
    table.clear();
  }

  ngOnInit(): void {
    this.AddPointVersion = new PointVersion();
    this.FindPointVersion();
  }
  RouterAjout() {
    this.AddPointVersion = new PointVersion();
    this.router.navigate(['/pilote/pointversion/save']);
  }

  FindPointVersion() {
    this.pointService.FindPointVersionByPilote().subscribe((data) => {
      // @ts-ignore
      this.ListPointVersion = data.body;
      this.loading = false;
    })
  }
  Edite(point: PointVersion) {
    this.AddPointVersion = point;
    this.pointService.FindLivraisonByPointVersion(point.id).subscribe((data) => {
      //@ts-ignore
      this.AddPointVersion.livraisonCARMList = data.body;
    });
    this.pointService.FindPlanningByPointVersion(point.id).subscribe((data) => {
      // @ts-ignore
      this.AddPointVersion.planningPointVersionList = data.body;
    });
    this.pointService.FindTicketByPointVersion(point.id).subscribe((data) => {
      //@ts-ignore
      this.AddPointVersion.ticketList = data.body;
    });
    this.router.navigate(['/pilote/pointversion/save']);

  }
  get AddPointVersion(): PointVersion {
    return this.pointService.AddPointVersion;
  }

  set AddPointVersion(value: PointVersion) {
    this.pointService.AddPointVersion = value;
  }



  get ListPointVersion(): Array<PointVersion> {
    return this.pointService.ListPointVersion;
  }

  set ListPointVersion(value: Array<PointVersion>) {
    this.pointService.ListPointVersion = value;
  }
  get chartePointVersion(): boolean {
    return this.charteService.chartePointVersion;
  }

  set chartePointVersion(value: boolean) {
    this.charteService.chartePointVersion = value;
  }
  charte(point: PointVersion) {
    this.AddPointVersion = point;
    this.pointService.FindLivraisonByPointVersion(point.id).subscribe((data) => {
      //@ts-ignore
      this.AddPointVersion.livraisonCARMList = data.body;
    });
    this.pointService.FindPlanningByPointVersion(point.id).subscribe((data) => {
      // @ts-ignore
      this.AddPointVersion.planningPointVersionList = data.body;
    });
    this.pointService.FindTicketByPointVersion(point.id).subscribe((data) => {
      //@ts-ignore
      this.AddPointVersion.ticketList = data.body;
    });

    this.chartePointVersion = true;
  }
  DeletePointVersion(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.pointService.DeletePointVersion(id).subscribe((data) => {
          this.FindPointVersion();
          // @ts-ignore
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Point Version supprimer avec succès' });
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de la suppression' });
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Suppression Rejeter' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Suppression Annuler' });
            break;
        }
      }
    });

  }
}
