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
import { ConfirmDialogComponent } from './utils/confirm-dialog/confirm-dialog.component';
import { WorkViewComponent } from './content/work/work-view.component';
import { WorkToolbarComponent } from './content/work/work-toolbar/work-toolbar.component';
import { AddWorkSheetComponent } from './content/work/add-work-sheet/add-work-sheet.component';
import {RawWorkComponent} from './content/work/raw-work/raw-work.component';

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
    AddWorkSheetComponent],
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
    RawWorkComponent]
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
