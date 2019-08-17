import {KeycloakService} from "keycloak-angular";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root',
})

export class KeyCloakService {

  keycloakService :KeycloakService;

  constructor(keycloakService :KeycloakService) {
    this.keycloakService = keycloakService;
  }

  getUserId(): string{
    return this.keycloakService.getKeycloakInstance().idTokenParsed.sub
  }

  logout(){
    this.keycloakService.logout();
  }


}
