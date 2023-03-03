import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { User } from 'src/app/controller/model/user';
import { UserService } from 'src/app/controller/service/user.service';

@Component({
  selector: 'app-registre-user',
  templateUrl: './registre-user.component.html',
  styleUrls: ['./registre-user.component.scss']
})
export class RegistreUserComponent implements OnInit {
  statuses: any[] | undefined;

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  constructor(private userService: UserService) { }
    clear(table: Table) {
        table.clear();
    }
  ngOnInit(): void {
    this.userService.FindAllUsers().subscribe((data) => {
      // @ts-ignore
      this.UserList = data.body;
      this.loading = false;
      console.log("list : "+JSON.stringify(this.UserList));
    }
    )
  }
  get UserList(): Array<User> {
    return this.userService.UserList;
  }
  set UserList(value: Array<User>) {
    this.userService.UserList = value;
  }
}
