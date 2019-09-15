import {Component, Input, OnInit} from '@angular/core';
import {Client} from '../../../model/client';

@Component({
  selector: 'app-raw-client',
  templateUrl: './raw-client.component.html',
  styleUrls: ['./raw-client.component.scss']
})
export class RawClientComponent implements OnInit {

  constructor() { }

  @Input() client: Client;

  ngOnInit() {
  }

}
