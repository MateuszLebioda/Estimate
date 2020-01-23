import {NgModule} from '@angular/core';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {ContentComponent} from './content/content.component';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {MenuComponent} from './content/menu/menu.component';
import {MaterialModule} from './MaterialModule';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import {ClientSheetComponent} from './content/clients/sheet-client/client-sheet.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RawClientComponent} from './content/clients/raw-client/raw-client.component';
import {DialogClientComponent} from './content/clients/dialog-client/dialog-client.component';
import {UnitViewsComponent} from './content/units/units-view.component';
import {UnitToolbarViewComponent} from './content/units/unit-toolbar-view/unit-toolbar-view.component';
import {UnitSheetComponentComponent} from './content/units/unit-sheet-component/unit-sheet-component.component';
import {UnitContentComponent} from './content/units/unit-content/unit-content.component';
import {UnitListComponent} from './content/units/unit-list/unit-list.component';
import {MaterialToolbarComponent} from './content/material/material-toolbar/material-toolbar.component';
import {AddMaterialSheetComponent} from './content/material/add-material-sheet/add-material-sheet.component';
import {RawMaterialComponent} from './content/material/raw-material/raw-material.component';
import {SimpleComponentDialogComponent} from './utils/simple-component-dialog/simple-component-dialog.component';
import {ConfirmDialogComponent} from './utils/confirm-dialog/confirm-dialog.component';
import {WorkViewComponent} from './content/work/work-view.component';
import {WorkToolbarComponent} from './content/work/work-toolbar/work-toolbar.component';
import {AddWorkSheetComponent} from './content/work/add-work-sheet/add-work-sheet.component';
import {RawWorkComponent} from './content/work/raw-work/raw-work.component';
import {JobTemplatesViewComponent} from './content/job-templates/job-templates-view.component';
import {JobTemplateToolbarComponent} from './content/job-templates/job-template-toolbar/job-template-toolbar.component';
import {AddJobTemplateSheetComponent} from './content/job-templates/add-job-template-sheet/add-job-template-sheet.component';
// tslint:disable-next-line:max-line-length
import {AddAbstractMaterialDialogComponent} from './utils/add-abstract-material-dialog/add-abstract-material-dialog.component';
import { JobTemplateRawComponent } from './content/job-templates/job-template-raw/job-template-raw.component';
// tslint:disable-next-line:max-line-length
import { JobTemplateAbstractMaterialRawComponent } from './content/job-templates/job-template-abstract-material-raw/job-template-abstract-material-raw.component';
import { EstimateToolBarComponent } from './content/estimate/estimate-tool-bar/estimate-tool-bar.component';
import { AddNewEstimateSheetComponent } from './content/estimate/add-new-estimate-sheet/add-new-estimate-sheet.component';
import { AddJobTemplateDialogComponentComponent } from './utils/add-job-template-dialog-component/add-job-template-dialog-component.component';
import { JobTemplateEstimateFormViewComponent } from './content/estimate/add-new-estimate-sheet/job-template-estimate-form-view/job-template-estimate-form-view.component';
import { MaterialFormViewComponentComponent } from './content/estimate/add-new-estimate-sheet/job-template-estimate-form-view/material-form-view-component/material-form-view-component.component';
import { MaterialFormEditableComponentComponent } from './content/estimate/add-new-estimate-sheet/job-template-estimate-form-view/material-form-editable-component/material-form-editable-component.component';
import { EstimateRawComponent } from './content/estimate/estimate-raw/estimate-raw.component';
import { JobTemplatesEstimateRawComponent } from './content/estimate/estimate-raw/job-templates-estimate-raw/job-templates-estimate-raw.component';
import { AbstractMaterialsEstimateRawComponent } from './content/estimate/estimate-raw/abstract-materials-estimate-raw/abstract-materials-estimate-raw.component';
import {AbstractMaterialEstimateRawComponent} from "./content/estimate/estimate-raw/abstract-materials-estimate-raw/abstract-material-estimate-raw/abstract-material-estimate-raw.component";
import { JobTemplateEstimateRawComponent } from './content/estimate/estimate-raw/job-templates-estimate-raw/job-template-estimate-raw/job-template-estimate-raw.component';

const keycloakService = new KeycloakService();


@NgModule({
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService
    }, CookieService
  ],
  entryComponents: [AppComponent,
    ClientSheetComponent,
    DialogClientComponent,
    UnitSheetComponentComponent,
    AddMaterialSheetComponent,
    ConfirmDialogComponent,
    SimpleComponentDialogComponent,
    AddWorkSheetComponent,
    AddJobTemplateSheetComponent,
    AddAbstractMaterialDialogComponent,
    AddNewEstimateSheetComponent,
    AddJobTemplateDialogComponentComponent],
  declarations: [AppComponent,
    ContentComponent,
    MenuComponent,
    routingComponents,
    ClientSheetComponent,
    RawClientComponent,
    DialogClientComponent,
    UnitViewsComponent,
    UnitToolbarViewComponent,
    UnitSheetComponentComponent,
    UnitContentComponent,
    UnitListComponent,
    MaterialToolbarComponent,
    AddMaterialSheetComponent,
    RawMaterialComponent,
    SimpleComponentDialogComponent,
    ConfirmDialogComponent,
    WorkViewComponent,
    WorkToolbarComponent,
    AddWorkSheetComponent,
    RawWorkComponent,
    JobTemplatesViewComponent,
    JobTemplateToolbarComponent,
    AddJobTemplateSheetComponent,
    AddAbstractMaterialDialogComponent,
    JobTemplateRawComponent,
    JobTemplateAbstractMaterialRawComponent,
    EstimateToolBarComponent,
    AddNewEstimateSheetComponent,
    AddJobTemplateDialogComponentComponent,
    JobTemplateEstimateFormViewComponent,
    MaterialFormViewComponentComponent,
    MaterialFormEditableComponentComponent,
    EstimateRawComponent,
    JobTemplatesEstimateRawComponent,
    AbstractMaterialEstimateRawComponent,
    AbstractMaterialsEstimateRawComponent,
    JobTemplateEstimateRawComponent]
})

export class AppModule {

  ngDoBootstrap(app) {
    keycloakService
      .init({
        config: {
          url: 'http://localhost:8180/auth',
          realm: 'Estimate',
          clientId: 'estimate-user'
        },
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false
        }
      })
      .then(() => {
        console.log('[ngDoBootstrap] bootstrap app');
        app.bootstrap(AppComponent);
      })
      .catch(error => console.error('[ngDoBootstrap] init Keycloak failed', error));
  }
}
