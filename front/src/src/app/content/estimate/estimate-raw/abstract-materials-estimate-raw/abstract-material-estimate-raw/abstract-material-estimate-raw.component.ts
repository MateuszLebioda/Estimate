import {Component, Input, OnInit} from '@angular/core';
import {AbstractEstimateMaterial} from "../../../../../model/abstract-estimate-material";

@Component({
  selector: 'app-abstract-material-estimate-raw',
  templateUrl: './abstract-material-estimate-raw.component.html',
  styleUrls: ['./abstract-material-estimate-raw.component.scss']
})
export class AbstractMaterialEstimateRawComponent implements OnInit {

  @Input()
  materialEstimate: AbstractEstimateMaterial;

  constructor() { }

  ngOnInit() {
  }

}
