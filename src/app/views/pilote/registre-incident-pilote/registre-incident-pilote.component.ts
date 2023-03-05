import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Application } from 'src/app/controller/model/application';
import { Incident } from 'src/app/controller/model/incident';
import { PiloteApplication } from 'src/app/controller/model/pilote-application';
import { ApplicationService } from 'src/app/controller/service/application.service';
import { IncidentService } from 'src/app/controller/service/incident.service';

@Component({
  selector: 'app-registre-incident-pilote',
  templateUrl: './registre-incident-pilote.component.html',
  styleUrls: ['./registre-incident-pilote.component.scss']
})
export class RegistreIncidentPiloteComponent implements OnInit {

  loading: boolean = true;
  statutIncident:any[]=[];
  ListApp =new Array<Application>();
  ListPiloteApp =new Array<PiloteApplication>();
  showPopUpIncd: boolean = false;
  application: Application = new Application();
  constructor(private incidentService: IncidentService, private router: Router,private appService : ApplicationService) { }
  clear(table: Table) {
    table.clear();
  }
  RouteFormAddIncident() {
    console.log('inc : '+JSON.stringify(this.AddIncident));
    this.showPopUpIncd=false;
    this.router.navigate(['/pilote/incident/save']);
  }
  FindIncident(){
    this.incidentService.FindIncidentByPilote().subscribe((data) => {
      // @ts-ignore
      this.ListIncidentOfPilote = data.body;
      this.loading = false;
    })
  }
  ngOnInit(): void {
    this.FindIncident();
    this.FindApp();
    this.statutIncident= [
      {name: 'Ouvert'},
      {name: 'Résolu avec Suivi'},
      {name: 'Clos'},    
  ];

  }
  PopUp(){
    this.showPopUpIncd = true;
  }
  get ListIncidentOfPilote(): Array<Incident>{
    return this.incidentService.ListIncidentOfPilote;
  }

  set ListIncidentOfPilote(value: Array<Incident>) {
    this.incidentService.ListIncidentOfPilote = value;
  }

  get AddIncident(): Incident{
    return this.incidentService.AddIncident;
  }

  set AddIncident(value: Incident) {
    this.incidentService.AddIncident = value;
  }


  FindApp() {
    this.appService.FindApplicationByPilote().subscribe((data) => {
      // @ts-ignore
      this.ListPiloteApp = data.body;
      for(let i=0;i<this.ListPiloteApp.length;i++){
      this.ListApp.push(this.ListPiloteApp[i].application);
    }
    })
  }

}
