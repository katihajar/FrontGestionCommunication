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
import { RegistreIncidentPiloteComponent } from './views/pilote/Incident/registre-incident-pilote/registre-incident-pilote.component';
import { AjouterIncidentPiloteComponent } from './views/pilote/Incident/ajouter-incident-pilote/ajouter-incident-pilote.component';
import { AjouterIncidentPiloteAngFrComponent } from './views/pilote/Incident/ajouter-incident-pilote-ang-fr/ajouter-incident-pilote-ang-fr.component';
import { RegistrePerimetreComponent } from './views/admin/registre-perimetre/registre-perimetre.component';
import { RegistreProcessusMetierComponent } from './views/admin/registre-processus-metier/registre-processus-metier.component';
import { RegistreOperationComponent } from './views/pilote/operation/registre-operation/registre-operation.component';
import { AjouterOperationComponent } from './views/pilote/operation/ajouter-operation/ajouter-operation.component';
import { AjouterOperationFrAngComponent } from './views/pilote/operation/ajouter-operation-fr-ang/ajouter-operation-fr-ang.component';
import { RegistreChangementPlanifierComponent } from './views/pilote/changementplanifier/registre-changement-planifier/registre-changement-planifier.component';
import { AjouterChangementFrComponent } from './views/pilote/changementplanifier/ajouter-changement-fr/ajouter-changement-fr.component';
import { AjouterChangementAngFrComponent } from './views/pilote/changementplanifier/ajouter-changement-ang-fr/ajouter-changement-ang-fr.component';
import { ResgistreApplicationRespoComponent } from './views/responsable/resgistre-application-respo/resgistre-application-respo.component';
import { ResgistreIncidentRespoComponent } from './views/responsable/resgistre-incident-respo/resgistre-incident-respo.component';
import { ResgistreOperationRespoComponent } from './views/responsable/resgistre-operation-respo/resgistre-operation-respo.component';
import { ResgistreChangementRespoComponent } from './views/responsable/resgistre-changement-respo/resgistre-changement-respo.component';
import { RegistreHealthCheckComponent } from './views/pilote/healthCheckPreprodProd/registre-health-check/registre-health-check.component';
import { AjoutHealthCheckComponent } from './views/pilote/healthCheckPreprodProd/ajout-health-check/ajout-health-check.component';
import { RegistrehealthCheckBwPerimetreComponent } from './views/pilote/healthCheckBwPerimetre/registrehealth-check-bw-perimetre/registrehealth-check-bw-perimetre.component';
import { AjoutHealthCheckBwPerimetreComponent } from './views/pilote/healthCheckBwPerimetre/ajout-health-check-bw-perimetre/ajout-health-check-bw-perimetre.component';
import { RegistrHealthCheckProdRespoComponent } from './views/responsable/registr-health-check-prod-respo/registr-health-check-prod-respo.component';
import { RegistrHealthBwPerimetreRespoComponent } from './views/responsable/registr-health-bw-perimetre-respo/registr-health-bw-perimetre-respo.component';
import { RegistrePointVersionComponent } from './views/pilote/pointVersion/registre-point-version/registre-point-version.component';
import { AjoutPointVersionComponent } from './views/pilote/pointVersion/ajout-point-version/ajout-point-version.component';
import { RegistrePointVersionRespoComponent } from './views/responsable/registre-point-version-respo/registre-point-version-respo.component';
import { DashboardPiloteComponent } from './views/pilote/dashboard-pilote/dashboard-pilote.component';


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
        { path: 'perimetre/register', component: RegistrePerimetreComponent },
        { path: 'processusMetier/register', component: RegistreProcessusMetierComponent },
        { path: '', redirectTo: 'test', pathMatch: 'full' },
      ],
    },
    {
      path: 'responsable',
      component: ResponsableComponent,
      children: [
        { path: 'testRespo', component: TestComponent },
        { path: 'homeRespo', component: HomeComponent },
        { path: 'incident/registre', component: ResgistreIncidentRespoComponent },
        { path: 'application/registre', component: ResgistreApplicationRespoComponent },
        { path: 'operation/registre', component: ResgistreOperationRespoComponent },
        { path: 'changement/registre', component: ResgistreChangementRespoComponent },
        { path: 'healthcheck/PreprodProd/registre', component: RegistrHealthCheckProdRespoComponent },
        { path: 'healthcheck/Bw/registre', component: RegistrHealthBwPerimetreRespoComponent },
        { path: 'pointversion/registre', component: RegistrePointVersionRespoComponent },
        { path: '', redirectTo: 'testRespo', pathMatch: 'full' },
      ],
    },
    {
      path: 'pilote',
      component: PiloteComponent,
      children: [
        { path: 'Dashboard', component: DashboardPiloteComponent },
        { path: 'application/registre', component: RegistreApplicationOfPiloteComponent },
        { path: 'incident/registre', component: RegistreIncidentPiloteComponent },
        { path: 'incident/save/Français', component: AjouterIncidentPiloteComponent },
        { path: 'incident/save/FrançaisAnglais', component: AjouterIncidentPiloteAngFrComponent },
        { path: 'operation/registre', component: RegistreOperationComponent },
        { path: 'operation/save/Français', component: AjouterOperationComponent },
        { path: 'operation/save/FrançaisAnglais', component: AjouterOperationFrAngComponent },
        { path: 'changement/registre', component: RegistreChangementPlanifierComponent },
        { path: 'changement/save/Français', component: AjouterChangementFrComponent },
        { path: 'changement/save/FrançaisAnglais', component: AjouterChangementAngFrComponent},
        { path: 'healthcheck/PreprodProd/registre', component: RegistreHealthCheckComponent },
        { path: 'healthcheck/PreprodProd/save', component: AjoutHealthCheckComponent },
        { path: 'healthcheck/Bw/registre', component: RegistrehealthCheckBwPerimetreComponent },
        { path: 'healthcheck/Bw/save', component: AjoutHealthCheckBwPerimetreComponent },
        { path: 'pointversion/registre', component: RegistrePointVersionComponent },
        { path: 'pointversion/save', component: AjoutPointVersionComponent },
        { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
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
