import { NgModule } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import {AppComponent} from "./app.component";
import { BrowserModule } from '@angular/platform-browser';
import { ContentComponent } from './content/content.component';
import {KeyCloakService} from "./utils/key-cloak-service";

const keycloakService = new KeycloakService();

@NgModule({
  imports: [KeycloakAngularModule,BrowserModule],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService
    }
  ],
  entryComponents: [AppComponent],
  declarations: [AppComponent, ContentComponent]
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
