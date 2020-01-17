import {Component, Input, OnInit} from '@angular/core';
import {MaterialTemplate} from '../../../model/template/material-template';


@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: ['./raw-material.component.scss']
})
export class RawMaterialComponent implements OnInit {

  constructor() {
  }

  @Input() material: MaterialTemplate;

  ngOnInit() {
  }

}
