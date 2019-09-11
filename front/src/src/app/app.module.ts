import {NgModule} from '@angular/core';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {ContentComponent} from './content/content.component';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { MenuComponent } from './content/menu/menu.component';
import {MaterialModule} from './MaterialModule';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import { AddClientComponent } from './content/clients/add-client/add-client.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
  entryComponents: [AppComponent, AddClientComponent],
  declarations: [AppComponent, ContentComponent, MenuComponent, routingComponents, AddClientComponent]
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
