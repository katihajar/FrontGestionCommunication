import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './layout/admin/admin.component';
import { ResponsableComponent } from './layout/responsable/responsable.component';
import { PiloteComponent } from './layout/pilote/pilote.component';
import { TestComponent } from './views/admin/test/test.component';



const routes: Routes = [
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
      { path: 'test', component: TestComponent },
      { path: '', redirectTo: 'test', pathMatch: 'full' },
    ],
  },
  {
    path: 'pilote',
    component: PiloteComponent,
    children: [
      { path: 'test', component: TestComponent },
      { path: '', redirectTo: 'test', pathMatch: 'full' },
    ],
  },
  // no layout views
  { path: 'test', component: TestComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
