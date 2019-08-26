import {Component, OnInit} from '@angular/core';
import {KeyCloakService} from '../../utils/key-cloak-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private keyCloak: KeyCloakService) {
  }

  ngOnInit() {
  }

  logout() {
    this.keyCloak.logout();
  }

}
