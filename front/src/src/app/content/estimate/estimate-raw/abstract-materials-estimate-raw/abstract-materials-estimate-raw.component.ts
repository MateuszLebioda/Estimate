import {Component, Input, OnInit} from '@angular/core';
import {AbstractEstimateMaterial} from '../../../../model/abstract-estimate-material';

@Component({
  selector: 'app-abstracts-materials-estimate-raw',
  templateUrl: './abstract-materials-estimate-raw.component.html',
  styleUrls: ['./abstract-materials-estimate-raw.component.scss']
})
export class AbstractMaterialsEstimateRawComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  abstractEstimateMaterials: Array<AbstractEstimateMaterial>;

  constructor() { }

  ngOnInit() {

  }

}
