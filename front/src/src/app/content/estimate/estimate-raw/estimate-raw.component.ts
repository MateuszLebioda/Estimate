import {Component, Input, OnInit} from '@angular/core';
import {Estimate} from '../../../model/estimate';
import {materialTitle, workTitle} from "../../../utils/static";
import {Client} from '../../../model/client';

@Component({
  selector: 'app-estimate-raw',
  templateUrl: './estimate-raw.component.html',
  styleUrls: ['./estimate-raw.component.scss']
})
export class EstimateRawComponent implements OnInit {

  @Input()
  estimate: Estimate;

  opened = false;
  workTitle = workTitle;
  materialsTitle = materialTitle;

  constructor() {
  }

  ngOnInit() {
    console.log(this.estimate);
  }

  nameStyle() {
    return {
      width: this.estimate.client === null ? 'calc(100% - 55px)' : 'calc(70% - 85px)',
    };
  }

  expand() {
    this.opened = !this.opened;
  }

  isClient() {
    return this.estimate.client;
  }
}
