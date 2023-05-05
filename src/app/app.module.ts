import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { ResponsableComponent } from './layout/responsable/responsable.component';
import { AdminComponent } from './layout/admin/admin.component';
import { PiloteComponent } from './layout/pilote/pilote.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { HeaderAdminComponent } from './components/headers/header-admin/header-admin.component';
import { HeaderPiloteComponent } from './components/headers/header-pilote/header-pilote.component';
import { HeaderResponsableComponent } from './components/headers/header-responsable/header-responsable.component';
import { SideBarAdminComponent } from './components/sideBar/side-bar-admin/side-bar-admin.component';
import { SideBarResponsableComponent } from './components/sideBar/side-bar-responsable/side-bar-responsable.component';
import { SideBarPiloteComponent } from './components/sideBar/side-bar-pilote/side-bar-pilote.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatLegacyMenuModule as MatMenuModule } from "@angular/material/legacy-menu";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { ErrorPageComponent } from './error-page/error-page.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { StyleClassModule } from 'primeng/styleclass';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { InplaceModule } from 'primeng/inplace';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ConfirmationService, MessageService} from "primeng/api";
import { RegistreUserComponent } from './views/admin/registre-user/registre-user.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RegistreApplicationComponent } from './views/admin/registre-application/registre-application.component';
import { AjouterApplicationComponent } from './views/admin/ajouter-application/ajouter-application.component';
import { RegistreApplicationOfPiloteComponent } from './views/pilote/registre-application-of-pilote/registre-application-of-pilote.component';
import { CharteIncident3BfrAngComponent } from './views/pilote/Incident/charte-incident3-bfr-ang/charte-incident3-bfr-ang.component';
import { RegistreIncidentPiloteComponent } from './views/pilote/Incident/registre-incident-pilote/registre-incident-pilote.component';
import { AjouterIncidentPiloteComponent } from './views/pilote/Incident/ajouter-incident-pilote/ajouter-incident-pilote.component';
import { AjouterIncidentPiloteAngFrComponent } from './views/pilote/Incident/ajouter-incident-pilote-ang-fr/ajouter-incident-pilote-ang-fr.component';
import { CharteIncident3bfrComponent } from './views/pilote/Incident/charte-incident3bfr/charte-incident3bfr.component';
import { RegistrePerimetreComponent } from './views/admin/registre-perimetre/registre-perimetre.component';
import { RegistreProcessusMetierComponent } from './views/admin/registre-processus-metier/registre-processus-metier.component';
import { CharteIncidentMoneticComponent } from './views/pilote/Incident/charte-incident-monetic/charte-incident-monetic.component';
import { CharteIncidentMoneticAngComponent } from './views/pilote/Incident/charte-incident-monetic-ang/charte-incident-monetic-ang.component';
import { CharteIncidentMoneticAngFrComponent } from './views/pilote/Incident/charte-incident-monetic-ang-fr/charte-incident-monetic-ang-fr.component';
import { CharteIncident3bAngComponent } from './views/pilote/Incident/charte-incident3b-ang/charte-incident3b-ang.component';
import { RegistreOperationComponent } from './views/pilote/operation/registre-operation/registre-operation.component';
import { AjouterOperationComponent } from './views/pilote/operation/ajouter-operation/ajouter-operation.component';
import { AjouterOperationFrAngComponent } from './views/pilote/operation/ajouter-operation-fr-ang/ajouter-operation-fr-ang.component';
import { CharteOperationFrAngComponent } from './views/pilote/operation/charte-operation-fr-ang/charte-operation-fr-ang.component';
import { CharteOperationFrComponent } from './views/pilote/operation/charte-operation-fr/charte-operation-fr.component';
import { CharteOperationAngComponent } from './views/pilote/operation/charte-operation-ang/charte-operation-ang.component';
import { RegistreChangementPlanifierComponent } from './views/pilote/changementplanifier/registre-changement-planifier/registre-changement-planifier.component';
import { CharteChangementFrComponent } from './views/pilote/changementplanifier/charte-changement-fr/charte-changement-fr.component';
import { CharteChangementFrAngComponent } from './views/pilote/changementplanifier/charte-changement-fr-ang/charte-changement-fr-ang.component';
import { CharteChangementAngComponent } from './views/pilote/changementplanifier/charte-changement-ang/charte-changement-ang.component';
import { AjouterChangementAngFrComponent } from './views/pilote/changementplanifier/ajouter-changement-ang-fr/ajouter-changement-ang-fr.component';
import { AjouterChangementFrComponent } from './views/pilote/changementplanifier/ajouter-changement-fr/ajouter-changement-fr.component';
import { ResgistreApplicationRespoComponent } from './views/responsable/resgistre-application-respo/resgistre-application-respo.component';
import { ResgistreIncidentRespoComponent } from './views/responsable/resgistre-incident-respo/resgistre-incident-respo.component';
import { ResgistreOperationRespoComponent } from './views/responsable/resgistre-operation-respo/resgistre-operation-respo.component';
import { ResgistreChangementRespoComponent } from './views/responsable/resgistre-changement-respo/resgistre-changement-respo.component';
import { RegistreHealthCheckComponent } from './views/pilote/healthCheckPreprodProd/registre-health-check/registre-health-check.component';
import { AjoutHealthCheckComponent } from './views/pilote/healthCheckPreprodProd/ajout-health-check/ajout-health-check.component';
import { CharteHealthCheckComponent } from './views/pilote/healthCheckPreprodProd/charte-health-check/charte-health-check.component';
import { RegistrehealthCheckBwPerimetreComponent } from './views/pilote/healthCheckBwPerimetre/registrehealth-check-bw-perimetre/registrehealth-check-bw-perimetre.component';
import { AjoutHealthCheckBwPerimetreComponent } from './views/pilote/healthCheckBwPerimetre/ajout-health-check-bw-perimetre/ajout-health-check-bw-perimetre.component';
import { CharteHealthCheckBwPerimetreComponent } from './views/pilote/healthCheckBwPerimetre/charte-health-check-bw-perimetre/charte-health-check-bw-perimetre.component';
import { RegistrHealthBwPerimetreRespoComponent } from './views/responsable/registr-health-bw-perimetre-respo/registr-health-bw-perimetre-respo.component';
import { RegistrHealthCheckProdRespoComponent } from './views/responsable/registr-health-check-prod-respo/registr-health-check-prod-respo.component';
import { RegistrePointVersionComponent } from './views/pilote/pointVersion/registre-point-version/registre-point-version.component';
import { RegistrePointVersionRespoComponent } from './views/responsable/registre-point-version-respo/registre-point-version-respo.component';
import { AjoutPointVersionComponent } from './views/pilote/pointVersion/ajout-point-version/ajout-point-version.component';
import { ChartePointVersionComponent } from './views/pilote/pointVersion/charte-point-version/charte-point-version.component';
import { DashboardPiloteComponent } from './views/pilote/dashboard-pilote/dashboard-pilote.component';
import { DashboardRespoComponent } from './views/responsable/dashboard-respo/dashboard-respo.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ExpiredTokenInterceptor } from './controller/service/expiredTokenInterceptor';
import { ExpireTokenComponent } from './redirectlogin/expire-token/expire-token.component';

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
    ErrorPageComponent,
    ForbiddenComponent,
    RegistreUserComponent,
    RegistreApplicationComponent,
    AjouterApplicationComponent,
    RegistreApplicationOfPiloteComponent,
    CharteIncident3BfrAngComponent,
    RegistreIncidentPiloteComponent,
    AjouterIncidentPiloteComponent,
    AjouterIncidentPiloteAngFrComponent,
    CharteIncident3bfrComponent,
    RegistrePerimetreComponent,
    RegistreProcessusMetierComponent,
    CharteIncidentMoneticComponent,
    CharteIncidentMoneticAngComponent,
    CharteIncidentMoneticAngFrComponent,
    CharteIncident3bAngComponent,
    RegistreOperationComponent,
    AjouterOperationComponent,
    AjouterOperationFrAngComponent,
    CharteOperationFrAngComponent,
    CharteOperationFrComponent,
    CharteOperationAngComponent,
    RegistreChangementPlanifierComponent,
    CharteChangementFrComponent,
    CharteChangementFrAngComponent,
    CharteChangementAngComponent,
    AjouterChangementAngFrComponent,
    AjouterChangementFrComponent,
    ResgistreApplicationRespoComponent,
    ResgistreIncidentRespoComponent,
    ResgistreOperationRespoComponent,
    ResgistreChangementRespoComponent,
    RegistreHealthCheckComponent,
    AjoutHealthCheckComponent,
    CharteHealthCheckComponent,
    RegistrehealthCheckBwPerimetreComponent,
    AjoutHealthCheckBwPerimetreComponent,
    CharteHealthCheckBwPerimetreComponent,
    RegistrHealthBwPerimetreRespoComponent,
    RegistrHealthCheckProdRespoComponent,
    RegistrePointVersionComponent,
    RegistrePointVersionRespoComponent,
    AjoutPointVersionComponent,
    ChartePointVersionComponent,
    DashboardPiloteComponent,
    DashboardRespoComponent,
    DashboardComponent,
    ChangePasswordComponent,
    ExpireTokenComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    BrowserAnimationsModule,
    AccordionModule,
    AutoCompleteModule,
    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    CascadeSelectModule,
    CheckboxModule,
    ChipsModule,
    ChipModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ColorPickerModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    GalleriaModule,
    ImageModule,
    InplaceModule,
    InputNumberModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    KnobModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,
    ScrollPanelModule,
    ScrollTopModule,
    SelectButtonModule,
    SidebarModule,
    SkeletonModule,
    SlideMenuModule,
    SliderModule,
    SplitButtonModule,
    SplitterModule,
    StepsModule,
    TagModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TerminalModule,
    TieredMenuModule,
    TimelineModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeSelectModule,
    TreeTableModule,
    VirtualScrollerModule,
    StyleClassModule
  ],
  providers: [ConfirmationService,MessageService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ExpiredTokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
