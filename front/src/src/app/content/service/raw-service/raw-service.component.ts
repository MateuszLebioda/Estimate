import {Component, Input, OnInit} from '@angular/core';
import {ServiceTemplate} from '../../../model/template/service-template';

@Component({
  selector: 'app-raw-service',
  templateUrl: './raw-service.component.html',
  styleUrls: ['./raw-service.component.scss']
})
export class RawServiceComponent implements OnInit {

  @Input() serviceTemplate: ServiceTemplate;

  @Input() isHidden: false;

  constructor() { }

  ngOnInit() {
  }

}
