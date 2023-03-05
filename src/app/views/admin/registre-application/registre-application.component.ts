import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Application } from 'src/app/controller/model/application';
import { ApplicationService } from 'src/app/controller/service/application.service';

@Component({
  selector: 'app-registre-application',
  templateUrl: './registre-application.component.html',
  styleUrls: ['./registre-application.component.scss']
})
export class RegistreApplicationComponent implements OnInit {
  loading: boolean = true;
  constructor(private appService: ApplicationService, private router: Router) { }
  clear(table: Table) {
    table.clear();
  }

  ngOnInit(): void {
    this.FindAllApp();
  }

  FindAllApp() {
    this.appService.FindAllApplcation().subscribe((data) => {
      // @ts-ignore
      this.ListApplication = data.body;
      this.loading = false;
    })
  }
  get ListApplication(): Array<Application> {
    return this.appService.ListApplication;
  }
  set ListApplication(value: Array<Application>) {
    this.appService.ListApplication = value;
  }

  RouteFormAddApp() {
    this.router.navigate(['/admin/application/save']);
}
}
