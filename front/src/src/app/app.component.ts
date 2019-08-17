import { Component, OnInit } from '@angular/core';
import {KeyCloakService} from "./utils/key-cloak-service";

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name: string;
  keycloakServices: KeyCloakService;

  constructor(keycloakService :KeyCloakService) {
    this.keycloakServices = keycloakService;
    this.name = this.keycloakServices.getFirstName() + ' ' + this.keycloakServices.getLastName();
    console.log(this.keycloakServices.getLastName())
  }



  ngOnInit() {
  }

}
