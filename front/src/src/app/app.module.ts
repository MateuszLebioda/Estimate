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
import { UnitViewsComponent } from './content/units/units-view.component';
import { UnitToolbarViewComponent } from './content/units/unit-toolbar-view/unit-toolbar-view.component';
import { UnitSheetComponentComponent } from './content/units/unit-sheet-component/unit-sheet-component.component';
import { UnitContentComponent } from './content/units/unit-content/unit-content.component';
import { UnitListComponent } from './content/units/unit-list/unit-list.component';

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
    DialogClientComponent],
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
    UnitListComponent]
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
