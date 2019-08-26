import {KeycloakService} from 'keycloak-angular';
import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root',
})

export class KeyCloakService {

  keycloakService: KeycloakService;

  constructor(keycloakService: KeycloakService) {
    this.keycloakService = keycloakService;
  }

  getToken(): string {
    return this.keycloakService.getKeycloakInstance().token;
  }

  logout() {
    this.keycloakService.logout();
  }


}
