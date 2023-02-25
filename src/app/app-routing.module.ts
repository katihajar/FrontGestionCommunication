import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./layout/admin/admin.component";
import {TestComponent} from "./views/admin/test/test.component";
import {ResponsableComponent} from "./layout/responsable/responsable.component";
import {PiloteComponent} from "./layout/pilote/pilote.component";
import {LoginComponent} from "./login/login.component";


@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: 'admin',
      component: AdminComponent,
      children: [
        { path: 'test', component: TestComponent },
        { path: '', redirectTo: 'test', pathMatch: 'full' },
      ],
    },
    {
      path: 'responsable',
      component: ResponsableComponent,
      children: [
        { path: 'testRespo', component: TestComponent },
        { path: '', redirectTo: 'testRespo', pathMatch: 'full' },
      ],
    },
    {
      path: 'pilote',
      component: PiloteComponent,
      children: [
        { path: 'testPilote', component: TestComponent },
        { path: '', redirectTo: 'testPilote', pathMatch: 'full' },
      ],
    },
    // no layout views
    { path: '', component: LoginComponent },
    { path: 'error', component: TestComponent },
    { path: '**', redirectTo: 'error', pathMatch: 'full' },
  ])],
  exports: [RouterModule],
})
export class AppRoutingModule { }
