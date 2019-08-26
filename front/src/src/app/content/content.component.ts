import { Component, OnInit } from '@angular/core';
import {KeyCloakService} from '../utils/key-cloak-service';



@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private keyCloak: KeyCloakService) {
  }

  ngOnInit() {
  }

}
