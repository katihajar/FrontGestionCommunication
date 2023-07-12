import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MonitoringOptirenta } from 'src/app/controller/model/monitoring-optirenta';
import { User } from 'src/app/controller/model/user';
import { AuthService } from 'src/app/controller/service/auth.service';
import { CharteService } from 'src/app/controller/service/charte.service';
import { MonitoringOptirentaService } from 'src/app/controller/service/monitoring-optirenta.service';

@Component({
  selector: 'app-charte-monitoring-optirenta',
  templateUrl: './charte-monitoring-optirenta.component.html',
  styleUrls: ['./charte-monitoring-optirenta.component.css']
})
export class CharteMonitoringOptirentaComponent implements OnInit{
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private authService: AuthService,private charteService: CharteService,private monitoringService: MonitoringOptirentaService) { }

  ngOnInit(): void {
  }
  get User(): User {
    return this.authService.User;
  }
  set User(value: User) {
    this.authService.User = value;
  }
  
  get charteMonitoringOptirenta(): boolean {
    return this.charteService.charteMonitoringOptirenta;
  }

  set charteMonitoringOptirenta(value: boolean) {
    this.charteService.charteMonitoringOptirenta = value;
  }
  get AddMonitoringOptirenta(): MonitoringOptirenta{
    return this.monitoringService.AddMonitoringOptirenta;
  }

  set AddMonitoringOptirenta(value: MonitoringOptirenta) {
    this.monitoringService.AddMonitoringOptirenta = value;
  }
}
