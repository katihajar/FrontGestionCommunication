import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { ResponsableComponent } from './layout/responsable/responsable.component';
import { AdminComponent } from './layout/admin/admin.component';
import { PiloteComponent } from './layout/pilote/pilote.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { HeaderAdminComponent } from './components/headers/header-admin/header-admin.component';
import { HeaderPiloteComponent } from './components/headers/header-pilote/header-pilote.component';
import { HeaderResponsableComponent } from './components/headers/header-responsable/header-responsable.component';
import { TestComponent } from './views/admin/test/test.component';
import { SideBarAdminComponent } from './components/sideBar/side-bar-admin/side-bar-admin.component';
import { SideBarResponsableComponent } from './components/sideBar/side-bar-responsable/side-bar-responsable.component';
import { SideBarPiloteComponent } from './components/sideBar/side-bar-pilote/side-bar-pilote.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResponsableComponent,
    AdminComponent,
    PiloteComponent,
    SideBarAdminComponent,
    SideBarResponsableComponent,
    SideBarPiloteComponent,
    FooterComponent,
    HeaderAdminComponent,
    HeaderPiloteComponent,
    HeaderResponsableComponent,
    TestComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule,HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
