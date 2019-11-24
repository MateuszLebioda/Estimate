import {Component, Input, OnInit} from '@angular/core';
import {Material} from '../../../model/material';


@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: ['./raw-material.component.scss']
})
export class RawMaterialComponent implements OnInit {

  constructor() {
  }

  @Input() material: Material;

  ngOnInit() {
  }

}
