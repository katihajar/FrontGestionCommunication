import { Component, ElementRef, ViewChild } from '@angular/core';
import { HealthCheckFlamingo } from 'src/app/controller/model/health-check-flamingo';
import { User } from 'src/app/controller/model/user';
import { AuthService } from 'src/app/controller/service/auth.service';
import { CharteService } from 'src/app/controller/service/charte.service';
import { HealthcheckFlamingoService } from 'src/app/controller/service/healthcheck-flamingo.service';

@Component({
  selector: 'app-charte-health-check-flamingo',
  templateUrl: './charte-health-check-flamingo.component.html',
  styleUrls: ['./charte-health-check-flamingo.component.scss']
})
export class CharteHealthCheckFlamingoComponent {
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  constructor(private authService: AuthService,private charteService: CharteService,private healthService: HealthcheckFlamingoService) { }

  ngOnInit(): void {
  }
  get User(): User {
    return this.authService.User;
  }
  set User(value: User) {
    this.authService.User = value;
  }
  
  get charteHealthCheckFlamingo(): boolean {
    return this.charteService.charteHealthCheckFlamingo;
  }

  set charteHealthCheckFlamingo(value: boolean) {
    this.charteService.charteHealthCheckFlamingo = value;
  }
  get AddHealthCheckFlamingo(): HealthCheckFlamingo{
    return this.healthService.AddHealthCheck;
  }

  set AddHealthCheckFlamingo(value: HealthCheckFlamingo) {
    this.healthService.AddHealthCheck = value;
  }
}
