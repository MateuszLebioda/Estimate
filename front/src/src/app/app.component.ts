import { Component, OnInit } from '@angular/core';
import {KeyCloakService} from './utils/key-cloak-service';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private keycloakService: KeyCloakService) {
  }

  ngOnInit() {
  }

}
