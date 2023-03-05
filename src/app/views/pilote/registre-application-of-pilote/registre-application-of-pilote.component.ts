import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { PiloteApplication } from 'src/app/controller/model/pilote-application';
import { ApplicationService } from 'src/app/controller/service/application.service';
import { UserService } from 'src/app/controller/service/user.service';

@Component({
  selector: 'app-registre-application-of-pilote',
  templateUrl: './registre-application-of-pilote.component.html',
  styleUrls: ['./registre-application-of-pilote.component.scss']
})
export class RegistreApplicationOfPiloteComponent implements OnInit {

  loading: boolean = true;
  constructor(private appService: ApplicationService, private userService: UserService, private router: Router) { }
  clear(table: Table) {
    table.clear();
  }

  ngOnInit(): void {
    this.FindApp();
  }

  FindApp() {
    this.appService.FindApplicationByPilote().subscribe((data) => {
      // @ts-ignore
      this.ListApplicationOfPilote = data.body;
      this.loading = false;
      console.log('FirstApp : ' + JSON.stringify(this.ListApplicationOfPilote[0]));

    })
  }

  get ListApplicationOfPilote(): Array<PiloteApplication>{
    return this.appService.ListApplicationOfPilote;
  }

  set ListApplicationOfPilote(value: Array<PiloteApplication>) {
    this.appService.ListApplicationOfPilote = value;
  }

}
