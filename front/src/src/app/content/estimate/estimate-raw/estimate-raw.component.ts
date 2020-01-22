import {Component, Input, OnInit} from '@angular/core';
import {Estimate} from '../../../model/estimate';

@Component({
  selector: 'app-estimate-raw',
  templateUrl: './estimate-raw.component.html',
  styleUrls: ['./estimate-raw.component.scss']
})
export class EstimateRawComponent implements OnInit {

  @Input()
  estimate: Estimate;

  constructor() {
  }

  ngOnInit() {
  }

  nameStyle() {
    return {
      width: this.estimate.client === null ? '100%' : 'calc(70% - 10px)',
    };
  }
}
