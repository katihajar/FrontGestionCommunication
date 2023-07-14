import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./layout/admin/admin.component";
import {ResponsableComponent} from "./layout/responsable/responsable.component";
import {PiloteComponent} from "./layout/pilote/pilote.component";
import {LoginComponent} from "./login/login.component";
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
import { AjoutHealthCheckBwPerimetreComponent } from './views/pilote/healthCheckBwPerimetre/ajout-health-check-bw-perimetre/ajout-health-check-bw-perimetre.component';
import { RegistrHealthCheckProdRespoComponent } from './views/responsable/registr-health-check-prod-respo/registr-health-check-prod-respo.component';
import { RegistrePointVersionComponent } from './views/pilote/pointVersion/registre-point-version/registre-point-version.component';
import { AjoutPointVersionComponent } from './views/pilote/pointVersion/ajout-point-version/ajout-point-version.component';
import { RegistrePointVersionRespoComponent } from './views/responsable/registre-point-version-respo/registre-point-version-respo.component';
import { DashboardPiloteComponent } from './views/pilote/dashboard-pilote/dashboard-pilote.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { DashboardRespoComponent } from './views/responsable/dashboard-respo/dashboard-respo.component';
import { ExpireTokenComponent } from './redirectlogin/expire-token/expire-token.component';
import { AuthGuard } from './auth.guard';
import { AjouterHealthCheckFlamingoComponent } from './views/pilote/healthCheckFlamingo/ajouter-health-check-flamingo/ajouter-health-check-flamingo.component';
import { RegistreAdministrateurComponent } from './views/superAdmin/registre-administrateur/registre-administrateur.component';
import { SupAdminComponent } from './layout/sup-admin/sup-admin.component';
import { AjouterNuitApplicativeComponent } from './views/pilote/nuitApplicative/ajouter-nuit-applicative/ajouter-nuit-applicative.component';
import { RegistreProblemeComponent } from './views/pilote/probleme/registre-probleme/registre-probleme.component';
import { AjouterProblemeFrComponent } from './views/pilote/probleme/ajouter-probleme-fr/ajouter-probleme-fr.component';
import { AjouterProblemeFrAngComponent } from './views/pilote/probleme/ajouter-probleme-fr-ang/ajouter-probleme-fr-ang.component';
import { RegistreProblemeRespoComponent } from './views/responsable/registre-probleme-respo/registre-probleme-respo.component';
import { AjouterMonitoringMstoolboxComponent } from './views/pilote/monitoringMstoolbox/ajouter-monitoring-mstoolbox/ajouter-monitoring-mstoolbox.component';
import { AjouterMonitoringOptirentaComponent } from './views/pilote/monitoringOptirenta/ajouter-monitoring-optirenta/ajouter-monitoring-optirenta.component';


@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: 'admin',
      component: AdminComponent,
      canActivate: [AuthGuard],
      data: { role: 'ROLE_ADMIN' },
      children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'users/register', component: RegistreUserComponent },
        { path: 'application/register', component: RegistreApplicationComponent },
        { path: 'application/save', component: AjouterApplicationComponent },
        { path: 'perimetre/register', component: RegistrePerimetreComponent },
        { path: 'processusMetier/register', component: RegistreProcessusMetierComponent },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      ],
    },
    {
      path: 'superAdmin',
      component: SupAdminComponent,
      canActivate: [AuthGuard],
      data: { role: 'ROLE_SUPERADMIN' },
      children: [
        { path: 'admin/register', component: RegistreAdministrateurComponent },
        { path: '', redirectTo: 'admin/register', pathMatch: 'full' },
      ],
    },
    {
      path: 'responsable',
      component: ResponsableComponent,
      canActivate: [AuthGuard],
      data: { role: 'ROLE_RESPONSABLE' },
      children: [
        { path: 'dashboard', component: DashboardRespoComponent },
        { path: 'incident/registre', component: ResgistreIncidentRespoComponent },
        { path: 'application/registre', component: ResgistreApplicationRespoComponent },
        { path: 'probleme/registre', component: RegistreProblemeRespoComponent },
        { path: 'changement/registre', component: ResgistreChangementRespoComponent },
        { path: 'healthcheck/PreprodProd/registre', component: RegistrHealthCheckProdRespoComponent },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      ],
    },
    {
      path: 'pilote',
      component: PiloteComponent,
      canActivate: [AuthGuard],
      data: { role: 'ROLE_PILOTE' },
      children: [
        { path: 'Dashboard', component: DashboardPiloteComponent },
        { path: 'application/registre', component: RegistreApplicationOfPiloteComponent },
        { path: 'incident/registre', component: RegistreIncidentPiloteComponent },
        { path: 'probleme/registre', component: RegistreProblemeComponent },
        { path: 'incident/save/Français', component: AjouterIncidentPiloteComponent },
        { path: 'incident/save/FrançaisAnglais', component: AjouterIncidentPiloteAngFrComponent },
        { path: 'probleme/save/Français', component: AjouterProblemeFrComponent },
        { path: 'probleme/save/FrançaisAnglais', component: AjouterProblemeFrAngComponent },
        // { path: 'operation/registre', component: RegistreOperationComponent },
        // { path: 'operation/save/Français', component: AjouterOperationComponent },
        // { path: 'operation/save/FrançaisAnglais', component: AjouterOperationFrAngComponent },
        { path: 'changement/registre', component: RegistreChangementPlanifierComponent },
        { path: 'changement/save/Français', component: AjouterChangementFrComponent },
        { path: 'changement/save/FrançaisAnglais', component: AjouterChangementAngFrComponent},
        { path: 'healthcheck/PreprodProd/registre', component: RegistreHealthCheckComponent },
        { path: 'healthcheck/PreprodProd/save', component: AjoutHealthCheckComponent },
        { path: 'healthcheck/Flamingo/save', component: AjouterHealthCheckFlamingoComponent },
        { path: 'healthcheck/Bw/save', component: AjoutHealthCheckBwPerimetreComponent },
        { path: 'healthcheck/Bw/save', component: AjoutHealthCheckBwPerimetreComponent },
        { path: 'monitoring/mstoolbox/save', component: AjouterMonitoringMstoolboxComponent },
        { path: 'monitoring/optirenta/save', component: AjouterMonitoringOptirentaComponent },
        { path: 'nuitApplicative/save', component: AjouterNuitApplicativeComponent },
        { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
      ],
    },
    // no layout views
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'error', component: ErrorPageComponent },
    { path: 'forbidden', component: ForbiddenComponent },
    { path: 'expired-token', component: ExpireTokenComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
  ])],
  exports: [RouterModule],
})
export class AppRoutingModule { }
