import { Component, OnInit } from '@angular/core';
import { Incident } from 'src/app/controller/model/incident';
import { IncidentService } from 'src/app/controller/service/incident.service';

@Component({
  selector: 'app-dashboard-pilote',
  templateUrl: './dashboard-pilote.component.html',
  styleUrls: ['./dashboard-pilote.component.scss']
})
export class DashboardPiloteComponent implements OnInit {

listIncident:Array<Incident>=new Array<Incident>();
  constructor(private service: IncidentService) { }

  ngOnInit(): void {
    this.service.FindAllIncident().subscribe(data=>{
      //@ts-ignore
      this.listIncident = data.body;
    })
  }

}
