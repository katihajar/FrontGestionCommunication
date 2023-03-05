import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./layout/admin/admin.component";
import {TestComponent} from "./views/admin/test/test.component";
import {ResponsableComponent} from "./layout/responsable/responsable.component";
import {PiloteComponent} from "./layout/pilote/pilote.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./views/admin/home/home.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import { RegistreUserComponent } from './views/admin/registre-user/registre-user.component';
import { RegistreApplicationComponent } from './views/admin/registre-application/registre-application.component';
import { AjouterApplicationComponent } from './views/admin/ajouter-application/ajouter-application.component';
import { RegistreApplicationOfPiloteComponent } from './views/pilote/registre-application-of-pilote/registre-application-of-pilote.component';
import { RegistreIncidentPiloteComponent } from './views/pilote/registre-incident-pilote/registre-incident-pilote.component';
import { AjouterIncidentPiloteComponent } from './views/pilote/ajouter-incident-pilote/ajouter-incident-pilote.component';


@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: 'admin',
      component: AdminComponent,
      children: [
        { path: 'test', component: TestComponent },
        { path: 'home', component: HomeComponent },
        { path: 'users/register', component: RegistreUserComponent },
        { path: 'application/register', component: RegistreApplicationComponent },
        { path: 'application/save', component: AjouterApplicationComponent },
        { path: '', redirectTo: 'home', pathMatch: 'full' },
      ],
    },
    {
      path: 'responsable',
      component: ResponsableComponent,
      children: [
        { path: 'testRespo', component: TestComponent },
        { path: 'homeRespo', component: HomeComponent },
        { path: '', redirectTo: 'homeRespo', pathMatch: 'full' },
      ],
    },
    {
      path: 'pilote',
      component: PiloteComponent,
      children: [
        { path: 'testPilote', component: TestComponent },
        { path: 'homePilote', component: HomeComponent },
        { path: 'application/registre', component: RegistreApplicationOfPiloteComponent },
        { path: 'incident/registre', component: RegistreIncidentPiloteComponent },
        { path: 'incident/save', component: AjouterIncidentPiloteComponent },
        { path: '', redirectTo: 'homePilote', pathMatch: 'full' },
      ],
    },
    // no layout views
    { path: '', component: LoginComponent },
    { path: 'error', component: ErrorPageComponent },
    { path: 'forbidden', component: ForbiddenComponent },
    { path: '**', redirectTo: 'error', pathMatch: 'full' },
  ])],
  exports: [RouterModule],
})
export class AppRoutingModule { }
