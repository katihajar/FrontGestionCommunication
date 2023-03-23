import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PointVersion } from 'src/app/controller/model/point-version';
import { CharteService } from 'src/app/controller/service/charte.service';
import { PointVersionRespoService } from 'src/app/controller/service/point-version-respo.service';
import { PointVersionService } from 'src/app/controller/service/point-version.service';

@Component({
  selector: 'app-registre-point-version-respo',
  templateUrl: './registre-point-version-respo.component.html',
  styleUrls: ['./registre-point-version-respo.component.scss']
})
export class RegistrePointVersionRespoComponent implements OnInit {
  ListPointVersion: Array<PointVersion>= new  Array<PointVersion>();
  loading: boolean = true;
  constructor(private pointService: PointVersionRespoService,private point2: PointVersionService ,private charteService: CharteService, private router: Router) { }
  clear(table: Table) {
    table.clear();
  }

  ngOnInit(): void {
    this.AddPointVersion = new PointVersion();
    this.FindPointVersion();
  }

  FindPointVersion() {
    this.pointService.FindPointVersion().subscribe((data) => {
      // @ts-ignore
      this.ListPointVersion = data.body;
      this.loading = false;
    })
  }

  get AddPointVersion(): PointVersion {
    return this.point2.AddPointVersion;
  }

  set AddPointVersion(value: PointVersion) {
    this.point2.AddPointVersion = value;
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

}
